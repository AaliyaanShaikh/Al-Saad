# Fix Callback Form on Vercel – Step-by-Step Guide

Follow these steps in order. After each step, you can test the form on your live Vercel URL.

---

## Step 1: Get a successful deployment

1. Go to **[vercel.com](https://vercel.com)** and sign in.
2. Open your **Al-Saad** project (or whatever your project is named).
3. Click **Deployments** in the top menu.
4. Find the **latest deployment** with a **green checkmark** (Ready).
5. If there is **no** successful deployment:
   - Click the **⋯** on the latest deployment → **Redeploy**.
   - Or push a new commit to your connected Git repo so Vercel builds again.
6. Once a deployment is **Ready**, click it and copy the **URL** (e.g. `https://al-saad-xxx.vercel.app`).  
   **This is your live site URL.** Use it for the rest of the steps.

---

## Step 2: Add the environment variable on Vercel

1. In your Vercel project, go to **Settings** (top menu).
2. In the left sidebar, click **Environment Variables**.
3. Under **Key**, type exactly: **`GOOGLE_SCRIPT_URL`**
4. Under **Value**, paste your **full Google Web App URL** (the one from your `.env` file).  
   It looks like: `https://script.google.com/macros/s/AbC123.../exec`  
   - No spaces before or after.  
   - No quotes.
5. Under **Environment**, select **Production** (and **Preview** if you use preview deployments).
6. Click **Save**.

---

## Step 3: Redeploy so the env var is used

1. Go to **Deployments**.
2. Click the **⋯** on the **latest deployment**.
3. Click **Redeploy**.
4. Wait until the new deployment shows **Ready** (green checkmark).

Environment variables are only applied on **new** deployments, so this step is required after adding or changing them.

---

## Step 4: Check that the API can see the env var

1. In the browser, open: **`https://YOUR-VERCEL-URL.vercel.app/api/callback`**  
   Replace `YOUR-VERCEL-URL` with your real URL from Step 1 (e.g. `al-saad`). **No extra dot after `.app`** — use `al-saad.vercel.app` not `al-saad.vercel.app.`
2. You should see JSON, for example:
   ```json
   { "ok": true, "hasGoogleScriptUrl": true }
   ```
3. If you see **`"hasGoogleScriptUrl": false`**:
   - Go back to **Step 2** and confirm **GOOGLE_SCRIPT_URL** is set correctly (no typo, full URL).
   - Then do **Step 3** again (Redeploy).

---

## Step 5: Test the callback form on the live site

1. Open your **live site**: `https://YOUR-VERCEL-URL.vercel.app`
2. Open the **Request a Call** (or Callback) form.
3. Fill it out and submit.
4. You should see **“Thank you”** and a new row in your Google Sheet (in the **Callback Form** tab).

---

## If it still fails

- **500 error when submitting:**  
  - Confirm **Step 4** shows `hasGoogleScriptUrl: true`.  
  - In Vercel, go to **Deployments** → your deployment → **Functions** → **api/callback** and check **Logs** for the exact error.

- **404 when opening the site or /api/callback:**  
  - Use the URL from the **latest Ready deployment** in **Deployments**.  
  - Do not use an old or preview URL unless you intend to.

- **Form works on localhost but not on Vercel:**  
  - Localhost uses `.env`; Vercel uses **Settings → Environment Variables**.  
  - They must match: same **GOOGLE_SCRIPT_URL** value on Vercel as in your `.env`.

---

## Quick checklist

- [ ] Latest deployment is **Ready** (green checkmark).
- [ ] **GOOGLE_SCRIPT_URL** is set under **Settings → Environment Variables** (exact name, full URL).
- [ ] You **Redeployed** after adding/changing the env var.
- [ ] `/api/callback` in the browser shows `"hasGoogleScriptUrl": true`.
- [ ] You’re testing on the **live** deployment URL, not an old or wrong link.
