/**
 * Vercel serverless: forwards callback form to Google Sheets.
 * In Vercel: Settings → Environment Variables → add GOOGLE_SCRIPT_URL (your Web App URL).
 * GET /api/callback returns { ok, hasGoogleScriptUrl } for debugging.
 */

/** Read raw request body as string (when req.body not set or stream not consumed). */
function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function sendJson(res, status, data) {
  res.status(status).setHeader('Content-Type', 'application/json').end(JSON.stringify(data));
}

export default async function handler(req, res) {
  try {
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {
      const url = (process.env.GOOGLE_SCRIPT_URL || process.env.VITE_GOOGLE_SCRIPT_URL || '').trim();
      sendJson(res, 200, { ok: true, hasGoogleScriptUrl: !!url });
      return;
    }

    if (req.method !== 'POST') {
      sendJson(res, 405, { error: 'Method not allowed' });
      return;
    }

    const url = (process.env.GOOGLE_SCRIPT_URL || process.env.VITE_GOOGLE_SCRIPT_URL || '').trim();
    if (!url) {
      sendJson(res, 500, {
        error: 'GOOGLE_SCRIPT_URL not set',
        hint: 'Add GOOGLE_SCRIPT_URL in Vercel → Settings → Environment Variables',
      });
      return;
    }

    // Build body string to forward: Vercel may give req.body as object or we read raw stream
    let bodyStr = null;
    if (req.body != null) {
      if (typeof req.body === 'string') bodyStr = req.body;
      else if (typeof req.body === 'object') bodyStr = JSON.stringify(req.body);
    }
    if (!bodyStr && typeof req.on === 'function') {
      try {
        bodyStr = await readRawBody(req);
      } catch {
        bodyStr = '{}';
      }
    }
    if (!bodyStr) bodyStr = '{}';

    const forward = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: bodyStr,
    });
    const text = await forward.text();

    if (forward.ok) {
      res.status(forward.status).setHeader('Content-Type', 'application/json').end(text);
      return;
    }

    sendJson(res, forward.status, {
      error: 'Google Script returned an error',
      status: forward.status,
      detail: text.slice(0, 500),
    });
  } catch (e) {
    sendJson(res, 500, {
      error: 'Callback API error',
      detail: e.message || String(e),
    });
  }
};
