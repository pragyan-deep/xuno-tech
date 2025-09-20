# Deployment Guide - Xuno Tech Website

Complete guide for deploying the Xuno Tech website to Vercel with production configuration.

## 🚀 Quick Deployment (Recommended)

### Step 1: Repository Setup
1. **Fork or Clone** this repository to your GitHub account
2. **Ensure all code is committed** and pushed to your repository

### Step 2: Vercel Account Setup
1. Visit [vercel.com](https://vercel.com) and sign up/login
2. Connect your **GitHub account** to Vercel
3. Click **"New Project"** from the Vercel dashboard

### Step 3: Import Project
1. **Import** your forked repository
2. **Configure Project Settings**:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

### Step 4: Environment Variables
Add these **required environment variables** in Vercel dashboard:

```env
NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
NODE_ENV=production
```

**Important**: Replace `your-project-name` with your actual Vercel project name.

### Step 5: Deploy
1. Click **"Deploy"** 
2. Wait for build completion (typically 2-3 minutes)
3. Your website will be live at `https://your-project-name.vercel.app`

## ⚙️ Advanced Configuration

### Custom Domain Setup
1. Go to **Project Settings** > **Domains**
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

### Google Sheets Integration
**Required for contact form functionality:**

1. **Create Google Sheet**:
   - Create a new Google Sheet
   - Add columns: Name, Email, Message, Timestamp

2. **Create Apps Script**:
   - Follow the detailed guide in `docs/google-sheets-integration.md`
   - Deploy as web app with public access

3. **Configure Environment Variable**:
   - Add the Apps Script URL to `APPS_SCRIPT_URL` in Vercel

### Performance Optimization
The `vercel.json` configuration includes:
- **Security Headers**: XSS protection, content type options
- **Function Timeout**: 10 seconds for contact API
- **Redirects**: Home page redirect handling

### Monitoring & Analytics
Optional monitoring setup:
```env
VERCEL_ANALYTICS_ID=your_analytics_id  # Vercel Analytics
SENTRY_DSN=your_sentry_dsn             # Error tracking
```

## 🔧 Build & Deployment Process

### Automatic Deployments
- **Production**: Pushes to `main` branch trigger production deployments
- **Preview**: Pull requests create preview deployments
- **Branches**: Other branches can be configured for preview deployments

### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from local machine
vercel

# Deploy to production
vercel --prod
```

## 📊 Post-Deployment Checklist

### ✅ Functionality Testing
- [ ] **Homepage** loads correctly
- [ ] **Navigation** works smoothly 
- [ ] **Theme toggle** functions properly
- [ ] **Scroll animations** trigger correctly
- [ ] **Contact form** submits successfully
- [ ] **All sections** display properly
- [ ] **Responsive design** works on mobile/tablet

### ✅ Performance Testing
- [ ] **Lighthouse audit** scores 90+ in all categories
- [ ] **Page load time** under 3 seconds
- [ ] **Images** load and display correctly
- [ ] **Fonts** render without flash
- [ ] **Animations** perform smoothly

### ✅ SEO & Metadata
- [ ] **Meta titles** display in browser tabs
- [ ] **Meta descriptions** appear in search results preview
- [ ] **Open Graph** images show correctly when shared
- [ ] **Favicon** displays in browser
- [ ] **Structured data** validates

## 🛠️ Troubleshooting

### Common Issues

**Build Errors**
```bash
# Check for TypeScript errors
npm run type-check

# Check for linting issues  
npm run lint

# Test build locally
npm run build
```

**Environment Variables Not Working**
- Ensure variables are set in Vercel dashboard
- Check variable names match exactly
- Restart deployment after adding variables

**Contact Form Not Working**
- Verify `APPS_SCRIPT_URL` is correct
- Test Google Apps Script independently
- Check browser network tab for API errors

**Theme Toggle Issues**
- Clear browser cache and local storage
- Check for JavaScript errors in console
- Verify CSS variables are loading

### Performance Issues
- **Large Bundle Size**: Check for unused dependencies
- **Slow Loading**: Optimize images and fonts
- **Animation Lag**: Test on slower devices

## 🔄 Updates & Maintenance

### Updating Content
1. **Edit content** in respective component files
2. **Commit changes** to repository
3. **Push to main branch** for automatic deployment

### Updating Dependencies
```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Test thoroughly before deployment
npm run build && npm run type-check
```

### Monitoring
- **Vercel Dashboard**: Monitor deployments and performance
- **Analytics**: Track user engagement and performance
- **Error Logging**: Monitor for runtime errors

## 📞 Support

### Deployment Issues
1. Check **Vercel deployment logs** in dashboard
2. Verify **environment variables** are correctly set
3. Test **build locally** before deployment

### Contact Form Issues
1. Follow **Google Sheets integration guide**
2. Test **Apps Script** independently
3. Check **network requests** in browser dev tools

### Performance Issues
1. Run **Lighthouse audit** 
2. Check **bundle size** analysis
3. Optimize **images and assets**

---

For additional support, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Google Apps Script Documentation](https://developers.google.com/apps-script) 