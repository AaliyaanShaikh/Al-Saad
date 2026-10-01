/**
 * Converts every .jpg / .jpeg / .png under public/ to .webp (deletes originals),
 * then updates source files to match. Run: node scripts/convert-all-to-webp.mjs
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

/** @type {Map<string, string>} */
const urlMap = new Map();

function posixRel(abs) {
  return path.relative(publicDir, abs).split(path.sep).join('/');
}

function addUrlPair(relFrom, relTo) {
  const plainFrom = '/' + relFrom;
  const plainTo = '/' + relTo;
  if (plainFrom !== plainTo) urlMap.set(plainFrom, plainTo);

  const encFrom = '/' + relFrom.split('/').map(encodeURIComponent).join('/');
  const encTo = '/' + relTo.split('/').map(encodeURIComponent).join('/');
  if (encFrom !== plainFrom && encFrom !== encTo) urlMap.set(encFrom, encTo);
}

async function walkPublic(dir, fn) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    const abs = path.join(dir, ent.name);
    if (ent.isDirectory()) await walkPublic(abs, fn);
    else await fn(abs);
  }
}

async function convertOne(absPath) {
  const lower = absPath.toLowerCase();
  if (!/\.(jpe?g|png)$/.test(lower)) return;

  const rel = posixRel(absPath);
  const outAbs = absPath.replace(/\.(jpe?g|png)$/i, '.webp');
  const relOut = posixRel(outAbs);

  await sharp(absPath)
    .rotate()
    .resize(2400, 2400, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(outAbs);

  await fs.unlink(absPath);
  addUrlPair(rel, relOut);
  console.log(`${rel} → ${relOut}`);
}

const EXCLUDE_TOP = new Set(['node_modules', 'dist', '.git', 'public']);
const SRC_EXT = new Set(['.ts', '.tsx', '.mts', '.js', '.mjs', '.css']);

async function patchCode(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const ent of entries) {
    if (EXCLUDE_TOP.has(ent.name)) continue;
    const abs = path.join(dir, ent.name);
    if (ent.isDirectory()) await patchCode(abs);
    else if (SRC_EXT.has(path.extname(ent.name))) {
      let content = await fs.readFile(abs, 'utf8');
      let next = content;
      for (const [from, to] of sortedPairs) {
        if (next.includes(from)) next = next.split(from).join(to);
      }
      if (next !== content) {
        await fs.writeFile(abs, next, 'utf8');
        console.log('patched', path.relative(root, abs));
      }
    }
  }
}

let sortedPairs = [];

async function main() {
  await walkPublic(publicDir, convertOne);

  sortedPairs = [...urlMap.entries()].sort((a, b) => b[0].length - a[0].length);
  console.log('\nPatching source files…');
  await patchCode(root);
  console.log('Done. URLs updated:', urlMap.size);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
