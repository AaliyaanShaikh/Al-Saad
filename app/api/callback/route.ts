import { NextRequest, NextResponse } from 'next/server';

function getScriptUrl() {
  return (
    process.env.GOOGLE_SCRIPT_URL ||
    process.env.VITE_GOOGLE_SCRIPT_URL ||
    ''
  ).trim();
}

export async function GET() {
  const url = getScriptUrl();
  return NextResponse.json({ ok: true, hasGoogleScriptUrl: !!url });
}

export async function POST(req: NextRequest) {
  const url = getScriptUrl();
  if (!url) {
    return NextResponse.json(
      {
        error: 'GOOGLE_SCRIPT_URL not set',
        hint: 'Add GOOGLE_SCRIPT_URL in Vercel → Settings → Environment Variables',
      },
      { status: 500 }
    );
  }

  try {
    const bodyStr = await req.text();
    const forward = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: bodyStr || '{}',
    });
    const text = await forward.text();

    if (forward.ok) {
      return new NextResponse(text, {
        status: forward.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return NextResponse.json(
      {
        error: 'Google Script returned an error',
        status: forward.status,
        detail: text.slice(0, 500),
      },
      { status: forward.status }
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { error: 'Callback API error', detail: message },
      { status: 500 }
    );
  }
}
