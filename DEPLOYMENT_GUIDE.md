# Hostinger CI/CD Deployment Guide (GitHub Actions)

This guide outlines how to set up automatic deployment for your React application to Hostinger using GitHub Actions. Once configured, every push to your `main` (or `master`) branch will automatically build and deploy your application.

---

## How Automatic Deployments Work

1. **Push Code**: You push code changes to your GitHub repository on the `main` or `master` branch.
2. **GitHub Actions Trigger**: GitHub automatically spins up a secure runner environment (Ubuntu).
3. **Build Stage**: The runner checks out your code, installs Node.js 20, installs dependencies with `npm ci`, and builds your production assets using `npm run build` to generate the `dist/` directory.
4. **Deploy Stage (Rsync over SSH)**: The runner uses standard, secure `rsync` over SSH to upload only the compiled `dist/` folder contents into your Hostinger target folder (e.g., `public_html/`). Any files on Hostinger that are not in the new build will be pruned automatically to ensure a clean, modern release.

---

## Step 1: Enable SSH Access in Hostinger

To allow GitHub Actions to securely copy files to your server, you must enable SSH access.

1. Log in to your **Hostinger hPanel**.
2. Go to **Websites** -> click **Manage** on your website.
3. In the left sidebar, search for or click on **Advanced** -> **SSH Access**.
4. Set the **SSH Status** to **Enabled**.
5. Note the following credentials displayed on the screen:
   * **SSH IP (Host)**
   * **SSH Username (User)**
   * **SSH Port** (usually `22`, but verify on your page)

---

## Step 2: Generate an SSH Key Pair

You need a secure key pair to allow GitHub Actions to authenticate with Hostinger without using a password.

### Option A: Generate locally (Recommended)
1. Open your terminal (macOS/Linux) or Git Bash (Windows) and run:
   ```bash
   ssh-keygen -t rsa -b 4096 -f id_rsa_hostinger -N ""
   ```
2. This creates two files:
   * `id_rsa_hostinger` (Private Key - keep this secret!)
   * `id_rsa_hostinger.pub` (Public Key)

### Option B: Generate in Hostinger hPanel
If Hostinger provides an option to generate or manage keys directly in the panel, you can use that.

### Add the Public Key to Hostinger
1. Open the public key file (`id_rsa_hostinger.pub`) and copy its entire text.
2. In your Hostinger hPanel, under **SSH Access**, look for the **SSH Keys** section.
3. Click **Add Key**, enter a name (e.g., "github-actions"), and paste the public key. Click **Add**.

---

## Step 3: Add GitHub Secrets to your Repository

To keep your server credentials secure, add them as repository secrets in GitHub.

1. Go to your repository on **GitHub**.
2. Click **Settings** (the gear icon on the top tab).
3. In the left sidebar, expand **Security** -> click **Secrets and variables** -> **Actions**.
4. Click **New repository secret** for each of the following:

| Secret Name | Value Example | Description |
| :--- | :--- | :--- |
| **`HOSTINGER_HOST`** | `185.224.138.54` | Your Hostinger SSH IP address |
| **`HOSTINGER_USER`** | `u123456789` | Your Hostinger SSH Username |
| **`HOSTINGER_PORT`** | `22` | Your Hostinger SSH Port (defaults to 22 if omitted) |
| **`HOSTINGER_SSH_KEY`** | `-----BEGIN RSA PRIVATE KEY----- ...` | The complete contents of your private key file (`id_rsa_hostinger`) |
| **`HOSTINGER_TARGET_DIR`** | `domains/yourdomain.com/public_html/` | *(Optional)* The path to your public folder. Defaults to `public_html/` |

---

## Step 4: Verify and Run!

You are now fully set up! 

1. Ensure your `.github/workflows/deploy.yml` file is added and committed to your repository.
2. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Configure GitHub Actions CI/CD for Hostinger"
   git push origin main
   ```
3. Navigate to the **Actions** tab in your GitHub repository to watch your live build and deployment pipeline succeed!
