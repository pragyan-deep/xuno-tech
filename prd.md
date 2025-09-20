
# Product Requirements Document (PRD)

**Project:** One-Page Technology Website  
**Owner:** [Your Company / Team]  
**Version:** 1.0  
**Date:** [Today’s Date]

---

## 1. Purpose
The purpose of this project is to build a single-page, scrolling, responsive website for a technology company. The site should communicate services, showcase portfolio, highlight technology expertise and industries served, and provide a way for visitors to contact the company.

---

## 2. Goals
- Present company offerings in a modern, matte-themed design.  
- Provide a smooth and professional user experience with animations.  
- Support light/dark mode toggle for accessibility and user preference.  
- Capture leads via a Contact Us form, storing submissions in Google Sheets via Google Apps Script integration.  
- Deploy on Vercel free plan with Next.js and TailwindCSS.  

---

## 3. Non-Goals
- No blog or CMS integration.  
- No user authentication or dashboards.  
- No e-commerce or payment features.  
- No multi-language support in this version.  

---

## 4. Scope

### Features  

#### General  
- Built with Next.js + TailwindCSS.  
- Responsive (desktop, tablet, mobile).  
- Sticky navigation bar with smooth scrolling links.  
- Dark/Light theme toggler in navbar.  
- Fade-in animations for sections when scrolled into view.  

#### Sections  
1. **Hero / About Us** – Headline, subtext, CTA.  
2. **Services** – Grouped by categories: Development, Cloud, Security, Emerging Tech (no Blockchain/Game Dev), Digital Growth, QA & Testing, Support.  
3. **Portfolio** – Grid of project cards with hover zoom effect.  
4. **Technology Tools** – Grid of technologies (React, Next.js, Node.js, Python, PostgreSQL, Docker, Kubernetes, AWS, Azure, GCP).  
5. **Industries Served** – Grid of industries (Healthcare, EdTech, FinTech, E-commerce, Real Estate, Logistics, Entertainment).  
6. **Contact Us** – Form (name, email, message) → Next.js API → Apps Script → Google Sheet.  

---

## 5. Technical Requirements
- Framework: Next.js (latest stable).  
- Styling: TailwindCSS.  
- Animations: Framer Motion or Intersection Observer + Tailwind transitions.  
- Hosting: Vercel (Free Plan).  
- Data Storage: Google Sheets (via Apps Script).  
- Environment Variables: `APPS_SCRIPT_URL` (Google Apps Script Web App endpoint).  

---

## 6. Success Criteria
- Website deployed on Vercel.  
- Sections scroll smoothly with fade-in animations.  
- Theme toggle works across the site.  
- Contact form submissions appear in Google Sheet.  
- No visual/layout issues in responsive breakpoints.  

---

## 7. Risks & Assumptions

### Risks
- Google Apps Script endpoint exposure.  
- Free plan limits on Vercel functions.  

### Assumptions
- Static assets (logos, icons, images) will be provided.  

---

## 8. Milestones
1. Setup & Scaffolding – Next.js + Tailwind setup.  
2. Core Layout – Navbar, smooth scrolling, theme toggler.  
3. Sections – Implement About Us, Services, Portfolio, Tech Tools, Industries, Contact.  
4. Animations & Styling – Fade-in, hover, matte theme.  
5. Google Sheets Integration – API route + Apps Script.  
6. Testing & Deployment – Responsive checks + Vercel deploy.  
