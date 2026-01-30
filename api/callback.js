/**
 * Vercel serverless: forwards callback form to Google Sheets.
 * In Vercel: Settings → Environment Variables → add GOOGLE_SCRIPT_URL (your Web App URL).
 */

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const url = (process.env.GOOGLE_SCRIPT_URL || process.env.VITE_GOOGLE_SCRIPT_URL || '').trim();
  if (!url) {
    res.status(500).json({
      error: 'GOOGLE_SCRIPT_URL not set',
      hint: 'Add GOOGLE_SCRIPT_URL in Vercel → Settings → Environment Variables',
    });
    return;
  }
  let body = req.body;
  if (body == null || typeof body !== 'object') {
    try {
      body = await readBody(req);
    } catch {
      body = {};
    }
  }
  try {
    const forward = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const text = await forward.text();
    res.status(forward.status).send(text);
  } catch (e) {
    res.status(502).json({
      error: 'Failed to forward to Google',
      detail: e.message,
    });
  }
};
