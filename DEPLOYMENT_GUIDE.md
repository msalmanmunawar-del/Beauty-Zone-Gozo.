# Hostinger Node.js GitHub Deployment Guide

This guide details how to deploy this React + Express application as a **Node.js Web Application** directly from GitHub to Hostinger.

Unlike static websites, a Node.js application runs a persistent Express server that handles compression, security headers, smart static caching, and seamless Single-Page Application (SPA) fallback routing.

---

## Why this Structure is Fully Compatible with Hostinger

1. **Explicit Entry Point**: `package.json` specifies `"main": "server.js"`, which Hostinger reads to know how to start the app.
2. **Start Script**: The standard `"start": "node server.js"` script boots the production-ready Express server.
3. **Automatic Frontend Compilation**: The `"postinstall": "npm run build"` script ensures that when Hostinger runs `npm install` during deployment, the Vite + React frontend is automatically built into the `dist/` directory on the server. No manual builds are needed!
4. **Environment Port Binding**: The server dynamically listens to `process.env.PORT`, which is required for Hostinger to map your domain traffic to the correct container port.

---

## Step-by-Step Deployment Guide

### Step 1: Push your Code to GitHub
Ensure all your files are pushed to a public or private GitHub repository (e.g., `main` branch).
```bash
git add .
git commit -m "Configure production Express server and automatic Node.js build"
git push origin main
```

### Step 2: Configure Node.js Application in Hostinger hPanel

1. Log in to your **Hostinger hPanel**.
2. Navigate to **Websites** -> click **Manage** next to your domain.
3. Search for or select **Node.js** in the left sidebar menu (usually under **Advanced** or **Hosting**).
4. Click **Create Application** (or manage your existing Node.js app).
5. Configure the following application settings:
   * **Node.js Version**: Select **20.x** (or greater).
   * **Application Directory**: Choose the root directory where your GitHub repository is cloned (e.g., `public_html/` or a custom subfolder).
   * **Application Domain**: Select your domain.
   * **Startup File**: Enter `server.js`.
   * **Environment Variables**: Add any custom variables if required (your app runs perfectly out-of-the-box using the defaults).

### Step 3: Link your GitHub Repository to Hostinger

1. In your Hostinger panel, go to the **Git** section.
2. Enter your GitHub Repository URL (SSH or HTTPS).
3. Set the branch name to `main` (or your preferred deployment branch).
4. Click **Create** or **Connect**.
5. Once connected, click **Deploy** (or enable **Automatic Deployment** using the Webhook URL provided by Hostinger on your GitHub repository settings under Webhooks).

### Step 4: Install Dependencies & Build
1. In your Hostinger Node.js app dashboard, click **Run npm install** (or let Hostinger run it automatically).
2. **That's it!** The `npm install` command triggers our configured `"postinstall": "npm run build"` script, compiling your Vite frontend automatically.
3. Once completed, click **Start/Restart Application** in the Hostinger panel.
4. Your high-performance, fully secure React + Express website is now live!

---

## Features Enabled on Hostinger Production Server

* **SPA Fallback Routing**: Ensures page refreshes work perfectly on client-side routes (e.g., `/services`, `/faq`).
* **Performance Compression**: All static text assets (HTML, JS, CSS) are compressed on-the-fly via gzip.
* **Smart Browser Caching**: Static assets in `assets/` are cached for 1 year (`immutable`), while HTML files are delivered live to guarantee immediate updates.
* **Helmet Security**: Configured to secure the application without blocking React components or assets from loading.
