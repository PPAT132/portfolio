# 🚀 Portfolio Deployment Guide

## 📋 **Complete Deployment Steps**

### ✅ **What We're Doing:**

This guide explains how to deploy your portfolio website online so people can access it at your domain.

---

### 🛠️ **Step 1: Backend Deployment to Railway**

**Purpose**: Deploy your email server so contact forms work
**Duration**: 5 minutes

1. **Visit**: https://railway.app
2. **Register/Login**: Use your GitHub account
3. **Create New Project**: Click "Deploy from GitHub repo"
4. **Select Repository**: Choose your portfolio repository
5. **Select Folder**: Choose `portfolio/backend` folder
6. **Deploy**: Railway automatically detects package.json and starts building

**Result**: You get: `https://portfolio-backend-production.up.railway.app`

---

### 🌐 **Step 2: Frontend Deployment to Netlify**

**Purpose**: Deploy your website so visitors can see it
**Duration**: 5 minutes

1. **Visit**: https://netlify.com
2. **Register/Login**: Use your GitHub account
3. **New Site**: Click "Add new site" → "Import an existing project"
4. **Connect GitHub**: Select your portfolio repository
5. **Configure Build**:
   - Build command: `npm run build --prefix portfolio/website`
   - Publish directory: `portfolio/website/dist`
   - Advanced → Environment variables
6. **Deploy**: Netlify automatically builds and deploys

**Result**: You get: `https://amazing-portfolio-123.netlify.app`

---

### ⚙️ **Step 3: Connect Frontend and Backend**

**Purpose**: Make the contact form work with your railway server

1. In Netlify dashboard:
   - Go to Site Settings → Environment Variables
   - Add New Variable:
     - Key: `VITE_API_URL`
     - Value: Your Railway URL (from Step 1)
2. Redeploy: Trigger a new deployment

**Result**: Contact form now sends emails to your Gmail

---

### 🌍 **Step 4: Custom Domain Setup**

**Purpose**: Get a professional domain like `patrickma.com`

1. **Purchase Domain**:

   - Visit [Namecheap](https://namecheap.com) or [GoDaddy](https://godaddy.com)
   - Search for your desired domain
   - Purchase ($10-15/year)

2. **Configure in Netlify**:
   - Settings → Domain Management → Add Custom Domain
   - Enter your domain
   - Follow DNS instructions

**Result**: Your site is live at `yourdomain.com`

---

## 🔄 **How to Update Your Site**

### 📝 **Frontend Updates:**

```bash
# 1. Make changes locally
npm run dev

# 2. Test everything works
npm run build

# 3. Push to GitHub
git add .
git commit -m "Added new feature"
git push origin main

# 4. Netlify automatically redeploys! ✨
```

### 🔧 **Backend Updates:**

```bash
# 1. Make changes locally
node server.js

# 2. Push to GitHub
git add .
git commit -m "Fixed email bug"
git push origin main

# 3. Railway automatically redeploys! ✨
```

---

## 🎯 **Final Checklist**

Before you're done, verify:

- [ ] Railway dashboard shows "Deployed" status
- [ ] Netlify dashboard shows "Deployed" status
- [ ] Visit your Netlify URL - website loads
- [ ] Try the contact form - email is sent
- [ ] Domain resolves to your site (takes 1-24 hours)
- [ ] HTTPS is enabled (automatic)

---

## 🆘 **If Something Goes Wrong**

**Contact form not working?**

- Check VITE_API_URL is set correctly in Netlify
- Check Railway has EMAIL_USER and EMAIL_PASS set
- Check browser console for errors

**Domain not working?**

- DNS changes can take up to 24 hours
- Check domain registrar DNS settings

**Site not loading?**

- Check Railway and Netlify deployment status
- Make sure environment variables are set
