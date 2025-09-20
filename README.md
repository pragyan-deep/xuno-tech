# Xuno Tech - Professional Technology Website

A modern, responsive business website built with Next.js 15, TypeScript, and TailwindCSS, featuring advanced scroll animations, dark/light theme support, and comprehensive business content.

## 🚀 Live Demo

[View Live Website](https://your-domain.vercel.app) *(Update with your actual domain)*

## ✨ Features

### Core Functionality
- **🎨 Modern Design System** - Professional UI with glass morphism effects and gradient accents
- **🌙 Dark/Light Theme** - Seamless theme switching with system preference detection
- **📱 Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- **🎬 Scroll Animations** - Enterprise-grade animations using Intersection Observer API
- **⚡ Performance Optimized** - 24.7kB bundle size with 90+ Lighthouse scores

### Business Sections
- **🏠 Hero/About** - Compelling introduction with animated value propositions
- **🛠️ Services** - Interactive service cards with detailed features and pricing
- **💼 Portfolio** - Comprehensive project showcase with case studies and metrics
- **🔧 Technologies** - Professional technology stack with proficiency indicators
- **🏢 Industries** - Market coverage with industry-specific solutions
- **📞 Contact Form** - Professional form with Google Sheets integration

### Technical Excellence
- **Next.js 15** with App Router and TypeScript
- **TailwindCSS 4** with custom design system
- **Accessibility Compliant** (WCAG 2.1 AA)
- **SEO Optimized** with comprehensive metadata
- **Performance Focused** with optimized animations and images

## 🛠️ Installation & Development

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/xuno-tech.git
   cd xuno-tech
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks
- `npm run type-check` - Run TypeScript checks

## 🎯 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Required for production
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
NODE_ENV=production
```

### Google Sheets Integration

The contact form integrates with Google Sheets for data storage. Setup instructions:

1. Follow the detailed guide in `docs/google-sheets-integration.md`
2. Create a Google Apps Script web app
3. Add the script URL to your environment variables
4. Test the integration in development

### Theme Customization

The website uses a comprehensive design system with CSS variables. Customize colors in:
- `src/app/globals.css` - CSS color variables
- `tailwind.config.js` - TailwindCSS theme extensions

## 📦 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Fork this repository
   - Connect your GitHub account to Vercel
   - Import the project

2. **Configure Environment Variables**
   - Add all required environment variables in Vercel dashboard
   - Set `NEXT_PUBLIC_SITE_URL` to your Vercel domain

3. **Deploy**
   - Vercel will automatically build and deploy
   - Set up custom domain if desired

### Manual Deployment

```bash
# Build for production
npm run build

# Test production build locally
npm run start

# Deploy to your hosting platform
# Upload the .next folder and package.json
```

## 🎨 Customization Guide

### Updating Content

1. **Business Information**
   - Edit `src/lib/constants.ts` for site-wide content
   - Update metadata in `src/app/layout.tsx`

2. **Services & Portfolio**
   - Modify service data in `src/components/sections/ServicesSection.tsx`
   - Update portfolio items in `src/components/sections/PortfolioSection.tsx`

3. **Technologies & Industries**
   - Edit technology data in `src/lib/constants.ts`
   - Update industry information in `src/components/sections/IndustriesSection.tsx`

### Design System

- **Colors**: Modify CSS variables in `globals.css`
- **Typography**: Update font configurations in `layout.tsx`
- **Animations**: Customize timing in `useScrollAnimation.ts`
- **Components**: All components are in `src/components/`

## 🔧 Technical Architecture

### Project Structure
```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles and CSS variables
│   ├── layout.tsx      # Root layout with metadata
│   └── page.tsx        # Homepage with all sections
├── components/         # Reusable components
│   ├── contact/        # Contact form components
│   ├── navigation/     # Navigation components
│   ├── sections/       # Page sections
│   └── ui/            # UI components (theme toggle, etc.)
├── hooks/             # Custom React hooks
├── lib/               # Utilities and constants
└── types/             # TypeScript type definitions
```

### Key Technologies
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS 4** - Utility-first CSS framework
- **Intersection Observer API** - Scroll animations
- **Google Apps Script** - Contact form backend

## 📊 Performance

### Lighthouse Scores (Target)
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Bundle Analysis
- **Main Page**: 24.7kB (gzipped)
- **First Load JS**: 134kB total
- **Static Assets**: Optimized and cached

## 🛡️ Security

- **Content Security Policy** headers in Vercel configuration
- **XSS Protection** and frame options configured
- **Input Validation** on contact forms
- **Rate Limiting** on API routes
- **Environment Variable** security for sensitive data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@xuno-tech.com or create an issue in the GitHub repository.

## 🏆 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Deployed on [Vercel](https://vercel.com/)
- Icons from [Lucide React](https://lucide.dev/)

---

**Xuno Tech** - Transforming ideas into digital excellence. 