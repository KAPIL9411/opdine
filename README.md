# opdine - Restaurant Operating System Homepage

Production homepage implementation featuring seamless poster-to-video hero loading architecture.

## Architecture Overview

The hero section implements a sophisticated loading pattern:

1. **Poster renders immediately** (high priority, eager loading)
2. **Video loads independently** in the background
3. **Poster remains visible** while video downloads
4. **Seamless fade transition** when video is ready
5. **No black flash** between poster and video
6. **Fallback support** - poster stays if video fails

## Key Features

- ✅ Zero-flash poster-to-video transition
- ✅ Stacked media layers (poster + video + gradient)
- ✅ Native HTML5 video (no player libraries)
- ✅ Mobile-optimized autoplay
- ✅ Responsive design (desktop → tablet → mobile)
- ✅ Performance-first loading strategy
- ✅ Accessibility compliant

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing the Loading Behavior

### Chrome DevTools Test

1. Open DevTools → Network tab
2. Enable "Disable cache"
3. Throttle to "Fast 3G"
4. Refresh the page

**Expected behavior:**
- Hero appears immediately with poster
- No white/black flash
- Video downloads in background
- Poster fades out when video is ready
- Video fades in and starts playing
- Video loops continuously

### Offline Test

1. Network tab → Offline mode
2. Refresh page
3. Poster should remain visible as complete hero background

## Project Structure

```
opdine/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/
│   └── Hero.tsx             # Hero section (client component)
├── public/
│   ├── images/
│   │   ├── opdine-logo.svg
│   │   └── opdine-hero-poster-start.jpg  # First frame poster
│   └── videos/
│       └── opdine-hero.webm              # 7-second loop video
└── ...config files

```

## Component Architecture

### Hero.tsx

```tsx
<section> ← Full viewport hero container
  <div> ← Media container (absolute positioning)
    <img /> ← Poster (opacity: 1 → 0)
    <video /> ← Video (opacity: 0 → 1)
    <div /> ← Gradient overlay
  </div>
  <header /> ← Navbar (z-index: 20)
  <main /> ← Hero content (z-index: 10)
  <div /> ← Scroll indicator
</section>
```

### Loading State Management

```tsx
const [videoReady, setVideoReady] = useState(false);

// Initially:
videoReady = false
poster opacity = 1
video opacity = 0

// When video.onCanPlay fires:
videoReady = true
poster opacity = 0 (200ms transition)
video opacity = 1 (400ms transition)
```

## Media Layer CSS

Both poster and video use identical positioning:

```css
position: absolute;
inset: 0;
width: 100%;
height: 100%;
object-fit: cover;
```

Transitions are handled via inline styles:
- Poster: `transition: opacity 200ms ease-out`
- Video: `transition: opacity 400ms ease-out`

## Video Specifications

- Format: WebM
- Duration: 7 seconds
- Resolution: 1280×720
- Audio: None (muted)
- Size: ~1 MB
- Codec: H.264

## Poster Specifications

- Format: JPEG (optimized)
- Size: <100 KB
- Content: Exact first frame of video
- Loading: eager, fetchpriority="high"

## Production CDN Setup

For production, replace the video source with Cloudinary CDN:

```tsx
<source 
  src="https://res.cloudinary.com/YOUR_CLOUD/video/upload/q_auto,f_auto/opdine-hero.webm" 
  type="video/webm" 
/>
```

The architecture remains identical - only the URL changes.

## Responsive Breakpoints

- **Desktop**: Full cinematic hero (100vh, min 700px)
- **Tablet**: Reduced typography, same video
- **Mobile**: 
  - min-height: 720px
  - Stacked buttons
  - Hamburger menu
  - Video crops intelligently (object-fit: cover)

## Browser Support

- Chrome/Edge: Full support
- Safari: Full support (playsInline ensures mobile autoplay)
- Firefox: Full support
- Mobile browsers: Full support with playsInline attribute

## Performance Optimization

1. **Critical rendering path:**
   - HTML → CSS → Poster → Video
   
2. **Poster loading:**
   - `loading="eager"`
   - `fetchpriority="high"`
   - `decoding="async"`

3. **Video loading:**
   - `preload="auto"`
   - Loads independently
   - Non-blocking

4. **No JavaScript dependencies for video playback:**
   - Native HTML5 video
   - CSS transitions only
   - Minimal React state

## Accessibility

- Video: `aria-hidden="true"` (decorative)
- Poster: `alt=""` + `aria-hidden="true"` (decorative)
- All buttons: Keyboard accessible
- Navigation: Keyboard accessible
- No reliance on hover states
- Semantic HTML structure

## Customization

### Update Copy

Edit `components/Hero.tsx`:
- Eyebrow text
- Headline
- Description
- Button labels

### Update Styling

Modify inline styles and Tailwind classes in `Hero.tsx`.

### Add Logo

Replace `/public/images/opdine-logo.svg` with your actual logo file.

### Update Video

Replace `/public/videos/opdine-hero.webm` with new video (ensure poster is the exact first frame).

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This is a standard Next.js app and can be deployed to:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting

Ensure your CDN/hosting serves:
- WebM video with proper MIME type
- Optimized images
- Gzip/Brotli compression

## Notes

- The video must be muted for autoplay to work
- playsInline is required for mobile autoplay
- The poster is never removed from the DOM
- Both layers remain mounted for instant fallback
- CSS handles all transitions (no JS animation)

## License

Proprietary - opdine
