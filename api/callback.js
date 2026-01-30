/**
 * Vercel serverless: forwards callback form to Google Sheets.
 * Set GOOGLE_SCRIPT_URL or VITE_GOOGLE_SCRIPT_URL in Vercel project env.
 */
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const url = process.env.GOOGLE_SCRIPT_URL || process.env.VITE_GOOGLE_SCRIPT_URL;
  if (!url) {
    res.status(500).json({ error: 'GOOGLE_SCRIPT_URL not configured' });
    return;
  }
  try {
    const forward = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body || {}),
    });
    const text = await forward.text();
    res.status(forward.status).setHeader('Content-Type', 'application/json').send(text);
  } catch (e) {
    res.status(502).json({ error: e.message || 'Failed to forward' });
  }
};
