/**
 * Compresses large assets in /public. Run: npm run optimize-images
 * JPEGs: max width 2400px, mozjpeg ~82 quality (in-place).
 * PNGs: max width 1280px → WebP ~82 quality; removes PNG after (update imports to .webp).
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

const JPEG_MAX_WIDTH = 2400;
const JPEG_QUALITY = 82;
const PNG_MAX_WIDTH = 1280;
const WEBP_QUALITY = 82;

async function optimizeJpeg(absPath) {
  const before = (await fs.stat(absPath)).size;
  const buf = await sharp(absPath)
    .rotate()
    .resize(JPEG_MAX_WIDTH, null, { withoutEnlargement: true, fit: 'inside' })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer();
  if (buf.length < before * 0.97) {
    await fs.writeFile(absPath, buf);
    console.log(`JPEG ${path.basename(absPath)}: ${(before / 1e6).toFixed(2)}MB → ${(buf.length / 1e6).toFixed(2)}MB`);
  } else {
    console.log(`JPEG ${path.basename(absPath)}: skipped (already small or no gain)`);
  }
}

async function pngToWebp(absPath) {
  const before = (await fs.stat(absPath)).size;
  const webpPath = absPath.replace(/\.png$/i, '.webp');
  await sharp(absPath)
    .rotate()
    .resize(PNG_MAX_WIDTH, null, { withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toFile(webpPath);
  const after = (await fs.stat(webpPath)).size;
  await fs.unlink(absPath);
  console.log(`PNG→WebP ${path.basename(webpPath)}: ${(before / 1e6).toFixed(2)}MB → ${(after / 1e6).toFixed(2)}MB`);
}

async function main() {
  const entries = await fs.readdir(publicDir, { withFileTypes: true });
  for (const ent of entries) {
    if (!ent.isFile()) continue;
    const name = ent.name;
    const abs = path.join(publicDir, name);
    const lower = name.toLowerCase();

    if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) {
      const st = await fs.stat(abs);
      if (st.size < 400_000) {
        console.log(`Skip ${name} (${(st.size / 1024).toFixed(0)}KB)`);
        continue;
      }
      await optimizeJpeg(abs);
      continue;
    }

    if (lower.endsWith('.png')) {
      await pngToWebp(abs);
    }
  }
  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
