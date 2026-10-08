# Production Deployment Guide

## Pre-Deployment Checklist

### 1. Asset Optimization

#### Poster Image

- [ ] Verify poster is exact first frame of video
- [ ] Optimize for web (target: < 100 KB)
- [ ] Use WebP or optimized JPEG
- [ ] Test quality at actual display size

```bash
# Using ImageMagick
magick convert opdine-hero-poster-start.jpg \
  -quality 85 \
  -strip \
  -resize 1920x1080^ \
  -gravity center \
  -extent 1920x1080 \
  opdine-hero-poster-optimized.jpg

# Using cwebp for WebP
cwebp -q 85 opdine-hero-poster-start.jpg -o opdine-hero-poster.webp
```

#### Video File

- [ ] Duration: 7 seconds (confirmed)
- [ ] Remove audio track (muted video)
- [ ] Optimize compression
- [ ] Create multiple formats (WebM + MP4)
- [ ] Target: ~1 MB file size

```bash
# Create WebM version
ffmpeg -i opdine-hero-source.mp4 \
  -c:v libvpx-vp9 \
  -crf 30 \
  -b:v 0 \
  -vf scale=1280:720 \
  -an \
  -t 7 \
  opdine-hero.webm

# Create MP4 fallback
ffmpeg -i opdine-hero-source.mp4 \
  -c:v libx264 \
  -crf 23 \
  -preset slow \
  -vf scale=1280:720 \
  -an \
  -t 7 \
  -movflags +faststart \
  opdine-hero.mp4
```

**Important:** Use `-movflags +faststart` for MP4 to enable progressive playback.

### 2. CDN Configuration

#### Option A: Cloudinary

**Upload Assets:**

```bash
# Install Cloudinary CLI
npm install -g cloudinary-cli

# Upload video
cloudinary upload opdine-hero.webm \
  --resource_type video \
  --public_id opdine-hero

# Upload poster
cloudinary upload opdine-hero-poster.jpg \
  --public_id opdine-hero-poster
```

**Update Hero.tsx:**

```tsx
<img
  src="https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/f_auto,q_auto/opdine-hero-poster.jpg"
  // ...
/>

<video>
  <source 
    src="https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/f_auto,q_auto/opdine-hero.webm" 
    type="video/webm" 
  />
  <source 
    src="https://res.cloudinary.com/YOUR_CLOUD_NAME/video/upload/f_auto,q_auto/opdine-hero.mp4" 
    type="video/mp4" 
  />
</video>
```

**Cloudinary Optimizations:**

- `f_auto`: Auto format selection
- `q_auto`: Auto quality optimization
- `w_1920,c_fill`: Responsive sizing
- `fl_lossy`: Enable lossy compression

#### Option B: AWS S3 + CloudFront

**1. Upload to S3:**

```bash
aws s3 cp opdine-hero.webm s3://opdine-assets/videos/ \
  --content-type video/webm \
  --cache-control "public, max-age=31536000"

aws s3 cp opdine-hero-poster.jpg s3://opdine-assets/images/ \
  --content-type image/jpeg \
  --cache-control "public, max-age=31536000"
```

**2. Configure CloudFront:**

- Enable compression (Gzip/Brotli)
- Set cache policy: 1 year for assets
- Enable HTTP/2
- Enable TLS 1.3

**3. Update URLs:**

```tsx
src="https://d123456.cloudfront.net/videos/opdine-hero.webm"
src="https://d123456.cloudfront.net/images/opdine-hero-poster.jpg"
```

#### Option C: Vercel (Built-in CDN)

If deploying to Vercel, static assets in `/public` are automatically served via CDN.

No additional configuration needed.

### 3. Environment Configuration

Create `.env.production`:

```bash
NEXT_PUBLIC_CDN_URL=https://cdn.opdine.com
NEXT_PUBLIC_VIDEO_URL=https://cdn.opdine.com/videos/opdine-hero.webm
NEXT_PUBLIC_POSTER_URL=https://cdn.opdine.com/images/opdine-hero-poster.jpg
```

Update Hero.tsx:

```tsx
const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL || '/videos/opdine-hero.webm';
const posterUrl = process.env.NEXT_PUBLIC_POSTER_URL || '/images/opdine-hero-poster.jpg';
```

### 4. Logo Asset

Replace the placeholder logo:

- [ ] Add actual opdine logo to `/public/images/`
- [ ] Verify SVG or PNG format
- [ ] Optimize file size
- [ ] Test visibility over video

## Deployment Platforms

### Option 1: Vercel (Recommended)

**Why Vercel:**
- Built for Next.js
- Automatic CDN
- Zero config deployments
- Free SSL
- Excellent performance

**Deploy Steps:**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Or use GitHub integration:**

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure build settings:
   - Framework: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`
4. Add environment variables
5. Deploy

**Custom Domain:**

```bash
vercel domains add opdine.com
vercel domains add www.opdine.com
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

**netlify.toml:**

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Option 3: AWS Amplify

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

### Option 4: Self-Hosted (Docker)

**Dockerfile:**

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
```

**Build and run:**

```bash
docker build -t opdine-homepage .
docker run -p 3000:3000 opdine-homepage
```

## Post-Deployment Verification

### 1. Smoke Tests

Visit production URL and verify:

- [ ] Page loads within 2 seconds
- [ ] Poster appears immediately
- [ ] Video transitions smoothly
- [ ] No console errors
- [ ] Video loops correctly
- [ ] Mobile works (iOS Safari, Android Chrome)
- [ ] All links functional
- [ ] Buttons clickable

### 2. Performance Testing

**Lighthouse Audit:**

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://opdine.com \
  --view \
  --output html \
  --output-path ./lighthouse-report.html
```

**Target Scores:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 90

**Critical Metrics:**
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3.5s

### 3. Cross-Browser Testing

Test on:
- [ ] Chrome (Desktop + Mobile)
- [ ] Safari (Desktop + iOS)
- [ ] Firefox
- [ ] Edge
- [ ] Samsung Internet

Use BrowserStack or similar for comprehensive testing.

### 4. Network Condition Testing

**Chrome DevTools:**
- Fast 3G
- Slow 3G
- Offline

**Expected Behavior:**
- Fast 3G: Smooth transition within 3-5s
- Slow 3G: Poster visible immediately, transition within 10-15s
- Offline: Poster remains visible

### 5. Real User Monitoring

**Set up monitoring:**

```tsx
// Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Or use Google Analytics:**

```tsx
// Add to app/layout.tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

## Performance Optimization

### 1. Enable Compression

**Next.js (next.config.mjs):**

```js
const nextConfig = {
  compress: true,
};
```

Already enabled by default.

### 2. Image Optimization

If using Next.js Image component:

```tsx
import Image from 'next/image';

<Image
  src="/images/opdine-hero-poster.jpg"
  alt=""
  fill
  priority
  quality={85}
  style={{ objectFit: 'cover' }}
/>
```

### 3. Preload Critical Assets

Add to `app/layout.tsx`:

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/opdine-hero-poster.jpg"
          fetchPriority="high"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 4. Enable HTTP/2

Ensure your hosting platform supports HTTP/2:
- ✅ Vercel: Enabled by default
- ✅ Netlify: Enabled by default
- ✅ CloudFront: Configure in distribution settings
- ⚠️ Self-hosted: Configure Nginx/Apache

### 5. Set Cache Headers

**For CDN assets:**

```
Cache-Control: public, max-age=31536000, immutable
```

**For HTML:**

```
Cache-Control: public, max-age=0, must-revalidate
```

## Security Checklist

- [ ] HTTPS enabled (SSL certificate)
- [ ] CSP headers configured
- [ ] No sensitive data in client code
- [ ] Environment variables properly set
- [ ] Rate limiting enabled
- [ ] CORS configured if using external APIs

**Content Security Policy (CSP):**

Add to `next.config.mjs`:

```js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "media-src 'self' https:",
              "font-src 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};
```

## Monitoring & Alerts

### Set Up Error Tracking

**Option 1: Sentry**

```bash
npm install @sentry/nextjs
```

```js
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

**Option 2: LogRocket**

```bash
npm install logrocket
```

### Set Up Uptime Monitoring

Use services like:
- UptimeRobot
- Pingdom
- StatusCake

Configure alerts for:
- Site down (> 1 minute)
- Response time > 5 seconds
- SSL certificate expiration

## Rollback Plan

### Git-Based Rollback (Vercel/Netlify)

Both platforms keep deployment history:

```bash
# Vercel
vercel rollback

# Netlify
netlify rollback
```

### Manual Rollback

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force origin main
```

## Maintenance

### Regular Tasks

**Weekly:**
- [ ] Check uptime metrics
- [ ] Review error logs
- [ ] Monitor page load times

**Monthly:**
- [ ] Run Lighthouse audit
- [ ] Review CDN bandwidth usage
- [ ] Check for dependency updates
- [ ] Test on latest browser versions

**Quarterly:**
- [ ] Security audit
- [ ] Performance optimization review
- [ ] Asset optimization review

## Troubleshooting

### Issue: Video doesn't autoplay on mobile

**Solution:**
- Verify `muted` attribute present
- Verify `playsInline` attribute present
- Check browser console for errors

### Issue: Poster doesn't load

**Solution:**
- Check CDN URL is correct
- Verify CORS headers if using external CDN
- Check network tab for 404s

### Issue: Black flash during transition

**Solution:**
- Verify both poster and video use `position: absolute`
- Confirm video is above poster in DOM order
- Check opacity transitions are CSS-based

### Issue: High CDN bandwidth costs

**Solution:**
- Enable CDN compression
- Reduce video file size
- Implement adaptive streaming
- Add cache headers

## Cost Estimates

### Vercel (Hobby - Free)
- Bandwidth: 100 GB/month
- Builds: Unlimited
- Suitable for: Development, small sites

### Vercel (Pro - $20/month)
- Bandwidth: 1 TB/month
- Suitable for: Production sites

### Cloudinary (Free)
- Storage: 25 GB
- Bandwidth: 25 GB/month
- Transformations: 25,000/month

### AWS Estimate (Medium Traffic)
- S3 storage: ~$0.50/month
- CloudFront: ~$10/month (100 GB)
- Total: ~$10-15/month

## Launch Checklist

**Pre-Launch:**
- [ ] All assets optimized
- [ ] CDN configured
- [ ] DNS configured
- [ ] SSL certificate active
- [ ] Environment variables set
- [ ] Error tracking enabled
- [ ] Analytics configured
- [ ] Tested on all target browsers
- [ ] Tested on mobile devices
- [ ] Performance audit passed
- [ ] Accessibility audit passed

**Launch:**
- [ ] Deploy to production
- [ ] Verify homepage loads
- [ ] Run smoke tests
- [ ] Monitor error logs
- [ ] Check uptime monitor

**Post-Launch:**
- [ ] Monitor analytics for first 24 hours
- [ ] Review error reports
- [ ] Check CDN bandwidth usage
- [ ] Gather user feedback

## Support Contacts

**Platform Support:**
- Vercel: https://vercel.com/support
- Netlify: https://www.netlify.com/support/
- Cloudinary: https://support.cloudinary.com/

**Community:**
- Next.js Discord: https://nextjs.org/discord
- Stack Overflow: Tag `next.js`

---

## Quick Reference Commands

```bash
# Build for production
npm run build

# Test production build locally
npm run build && npm start

# Deploy to Vercel
vercel --prod

# Run Lighthouse audit
lighthouse https://opdine.com --view

# Check bundle size
npm run build -- --analyze

# Update dependencies
npm update
npm audit fix
```

---

**Last Updated:** October 8, 2026  
**Version:** 1.0.0  
**Maintainer:** opdine Team
