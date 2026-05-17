# Deploying to Vercel

Your app will be live on the internet in about 5 minutes.

---

## Step 1 — Push to GitHub

If you haven't already, initialize a git repo and push:

```bash
# Inside your project folder
git init
git add .
git commit -m "feat: initial release — smart UX sentiment engine"
```

Create a new repository on github.com (click + → New repository), then connect and push:

```bash
git remote add origin https://github.com/yourusername/ux-sentiment-engine.git
git branch -M main
git push -u origin main
```

> ⚠️ Before pushing, verify `.gitignore` contains `.env.local` so your API key never goes to GitHub.

---

## Step 2 — Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
2. Click **"Add New Project"**
3. Find `ux-sentiment-engine` in your repository list and click **Import**

---

## Step 3 — Configure the project

Vercel auto-detects Vite. You'll see these settings — leave them exactly as is:

| Setting | Value |
|---------|-------|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

---

## Step 4 — Add your environment variable

This is the critical step. Before clicking Deploy:

1. Expand **"Environment Variables"**
2. Add this variable:

| Name | Value |
|------|-------|
| `VITE_ANTHROPIC_API_KEY` | `your_key_here` |

3. Make sure **Production**, **Preview**, and **Development** are all checked

> Without this, the app deploys but the AI features fall back to mock data.

---

## Step 5 — Deploy

Click **Deploy**. Vercel builds and deploys in about 60 seconds.

You'll get a live URL like:
```
https://ux-sentiment-engine.vercel.app
```

---

## Step 6 — Verify it works

Open the live URL and test:

- [ ] Dark sidebar loads
- [ ] Checkout form renders all 3 steps
- [ ] Rage clicking triggers the AI panel
- [ ] Panel shows Claude's question (not the fallback)
- [ ] Analytics dashboard loads with charts
- [ ] Generate Insights returns real Claude recommendations

---

## Redeploying after changes

Every time you push to GitHub, Vercel automatically redeploys:

```bash
git add .
git commit -m "your message"
git push
```

Vercel picks it up within seconds.

---

## Updating your API key

If you need to change the API key:

1. Go to your project on vercel.com
2. Settings → Environment Variables
3. Edit `VITE_ANTHROPIC_API_KEY`
4. Go to Deployments → click the three dots on the latest deploy → Redeploy

---

## Custom domain (optional)

1. In your Vercel project go to **Settings → Domains**
2. Add your domain (e.g. `sentimentux.com`)
3. Vercel gives you DNS records to add at your registrar
4. SSL is automatic and free

---

## Troubleshooting

**White page after deploy**
Open browser console on the live URL. Usually a missing import or a Windows path casing issue that only surfaces in production. Check the Vercel build logs under Deployments → your deploy → Build Logs.

**AI features not working on live site**
Check that `VITE_ANTHROPIC_API_KEY` is set in Vercel environment variables and that you redeployed after adding it.

**Build fails**
Run `npm run build` locally first — if it fails locally it will fail on Vercel too. Fix the error locally, push, and Vercel will pick it up.
