# Hero Loading Architecture

## The Problem

Traditional video backgrounds suffer from a critical UX issue:

```
Page Load → Black Screen → Video Appears
            ^^^^^^^^^^^
            BAD UX
```

Users see a blank/black hero section while the video downloads, creating a poor first impression.

## The Solution: Stacked Media Layers

We use a dual-layer architecture inspired by how professional sites handle this:

```
┌─────────────────────────────────┐
│                                 │
│         HERO CONTENT            │  ← z-index: 10
│      (text, buttons, nav)       │
│                                 │
└─────────────────────────────────┘
          ↓ sits on top of
┌─────────────────────────────────┐
│      GRADIENT OVERLAY           │  ← rgba overlay
└─────────────────────────────────┘
          ↓ sits on top of
┌─────────────────────────────────┐
│                                 │
│    VIDEO (opacity: 0 → 1)       │  ← position: absolute
│                                 │
└─────────────────────────────────┘
          ↓ sits on top of
┌─────────────────────────────────┐
│                                 │
│   POSTER (opacity: 1 → 0)       │  ← position: absolute
│                                 │
└─────────────────────────────────┘
```

## Key Principles

### 1. Identical Positioning

Both poster and video use EXACTLY the same CSS:

```css
position: absolute;
inset: 0;
width: 100%;
height: 100%;
object-fit: cover;
```

This ensures pixel-perfect alignment.

### 2. Stacking Order (z-axis)

```
Poster:   z-index: auto (base layer)
Video:    z-index: auto (above poster)
Gradient: z-index: auto (above video)
Content:  z-index: 10
Navbar:   z-index: 20
```

### 3. Opacity-Based Transition

We use CSS opacity transitions, NOT:
- ❌ display: none/block
- ❌ visibility: hidden/visible
- ❌ conditional rendering
- ❌ removing elements from DOM

Why? Because opacity transitions are:
- Smooth (GPU accelerated)
- Predictable
- Don't cause layout shifts
- Don't unmount/remount elements

### 4. Independent State Management

```tsx
const [videoReady, setVideoReady] = useState(false);

// Initial state:
videoReady = false
↓
Poster: opacity = 1
Video:  opacity = 0

// Video fires onCanPlay event:
setVideoReady(true)
↓
Poster: opacity = 0  (200ms transition)
Video:  opacity = 1  (400ms transition)
```

The video opacity transition is intentionally longer (400ms vs 200ms) to ensure the new content is fully visible before the old content disappears.

## Timeline Breakdown

### Frame-by-Frame Sequence

```
T=0ms
├─ Browser parses HTML
├─ CSS loaded
└─ Poster image request initiated
    (fetchpriority="high", loading="eager")

T=100-500ms
├─ Poster renders on screen
├─ User sees complete hero immediately
└─ Video begins downloading in background
    (preload="auto", non-blocking)

T=1000-4000ms (varies by network)
├─ Video continues downloading
├─ Poster remains visible
└─ No visual change yet

T=~3000ms (when video ready)
├─ Video fires onCanPlay event
├─ React updates state: videoReady = true
├─ CSS transitions trigger:
│   ├─ Poster: transition opacity 1 → 0 (200ms)
│   └─ Video:  transition opacity 0 → 1 (400ms)
│
T=~3200ms (mid-transition)
├─ Both poster and video partially visible
├─ Smooth crossfade in progress
└─ No black screen at any point

T=~3400ms (transition complete)
├─ Poster: opacity = 0 (but still in DOM)
├─ Video: opacity = 1 and playing
└─ Video.play() has already started

T=~10000ms (video ends)
├─ Video loops back to start
└─ Seamless loop (no flash)

T=Forever
└─ Video continues looping
```

## Critical Implementation Details

### 1. Video Must Be Above Poster

```tsx
// WRONG ORDER:
<video /> ← renders first (lower z-index)
<img />   ← renders second (higher z-index)

// CORRECT ORDER:
<img />   ← renders first (lower z-index)
<video /> ← renders second (higher z-index)
```

The video must be visually above the poster so the opacity transition reveals the video by making it more opaque, not by making the poster transparent.

### 2. Exact First Frame Match

The poster MUST be the exact first frame of the video. If not:

```
Poster shows frame A
  ↓ fade transition ↓
Video starts at frame A

✅ Seamless (no visible content change)
```

vs.

```
Poster shows frame A
  ↓ fade transition ↓
Video starts at frame B

❌ Visible "jump" in composition
```

### 3. Keep Both Layers Mounted

```tsx
// ❌ WRONG (conditional rendering)
{videoReady ? <video /> : <img />}

// ✅ CORRECT (both always rendered)
<img style={{ opacity: videoReady ? 0 : 1 }} />
<video style={{ opacity: videoReady ? 1 : 0 }} />
```

Why?
- Unmounting the poster causes a flash
- Mounting the video late delays rendering
- Both should exist from page load

### 4. CSS Transitions Handle Timing

```tsx
// Poster
transition: opacity 200ms ease-out

// Video  
transition: opacity 400ms ease-out
```

The video fades in slower than the poster fades out, creating a smooth overlap period where both are partially visible.

### 5. Native Video Events

```tsx
<video onCanPlay={() => setVideoReady(true)}>
```

We use the native `onCanPlay` event, which fires when:
- Video has downloaded enough to play
- Metadata is loaded
- First frame is ready to display

This is more reliable than:
- `onLoadedData` (may not have enough buffered)
- `onLoadStart` (too early)
- Arbitrary timeouts (unpredictable)

## Fallback Behavior

If video fails to load:

```
1. Video onCanPlay never fires
2. videoReady remains false
3. Poster opacity stays at 1
4. Video opacity stays at 0
5. Hero looks complete with just poster
```

No error states needed. The poster IS the fallback.

## Performance Strategy

### Priority Loading

```
1. HTML     (critical path)
2. CSS      (critical path)
3. Poster   (high priority, eager loading)
4. Video    (preload auto, but non-blocking)
```

### Why This Works

The poster is optimized to be:
- Small file size (< 100 KB)
- Eager loaded
- High fetch priority
- Decoded async

This ensures the hero appears "instantly" even on slow connections.

The video:
- Loads in parallel
- Doesn't block page render
- Can start playing before fully downloaded (progressive)
- Is invisible until ready (no broken states)

## Mobile Considerations

### iOS Safari Requirements

```tsx
<video
  muted          // Required for autoplay
  playsInline    // Required to play inline (not fullscreen)
  autoplay
/>
```

Without these attributes, iOS will:
- Show a play button overlay
- Open video in fullscreen
- Not autoplay

### Android Chrome

Generally more permissive, but `muted` is still required for autoplay.

### Object-Fit: Cover

```css
object-fit: cover;
```

Ensures video fills the hero on all screen sizes by:
- Maintaining aspect ratio
- Cropping excess (not stretching)
- Centering the crop

## Accessibility

### Decorative Media

Both poster and video are decorative background elements:

```tsx
<img 
  alt=""              // Empty alt (not omitted)
  aria-hidden="true"  // Hidden from screen readers
/>

<video aria-hidden="true">
```

### Why aria-hidden?

Screen reader users should focus on:
- Page content (headline, description)
- Interactive elements (buttons, links)
- Navigation

The video doesn't convey critical information and would be distracting if announced.

### Keyboard Navigation

All interactive elements remain keyboard accessible:
- Tab to navigate links/buttons
- Enter/Space to activate
- No reliance on hover states

## Browser Compatibility

### Supported Browsers

- ✅ Chrome/Edge (Chromium)
- ✅ Safari (Desktop + iOS)
- ✅ Firefox
- ✅ Samsung Internet
- ✅ Opera

### Video Format Fallback

```tsx
<video>
  <source src="video.webm" type="video/webm" />
  <source src="video.mp4" type="video/mp4" />
</video>
```

For production, include both formats:
- WebM: Better compression, modern browsers
- MP4: Universal fallback

## State Machine

```
┌─────────────┐
│   INITIAL   │
│             │
│ poster: 1   │
│ video: 0    │
└──────┬──────┘
       │
       │ video.onCanPlay fires
       │
       ↓
┌─────────────┐
│ TRANSITION  │
│             │
│ poster: 1→0 │
│ video: 0→1  │
└──────┬──────┘
       │
       │ 400ms later
       │
       ↓
┌─────────────┐
│   PLAYING   │
│             │
│ poster: 0   │
│ video: 1    │
└──────┬──────┘
       │
       │ loops forever
       │
       └─────┐
             │
             ↓
        (continues)
```

## Common Pitfalls to Avoid

### ❌ Don't: Remove poster on video ready

```tsx
// WRONG
{!videoReady && <img src="poster.jpg" />}
<video />
```

This causes a flash when the poster unmounts.

### ❌ Don't: Use display: none

```tsx
// WRONG
<img style={{ display: videoReady ? 'none' : 'block' }} />
```

This causes a flash and prevents smooth transitions.

### ❌ Don't: Wait for entire video to download

```tsx
// WRONG
<video preload="metadata" />
<video preload="none" />
```

Use `preload="auto"` so the video can start playing as soon as possible.

### ❌ Don't: Use JavaScript animation libraries

```tsx
// WRONG (unnecessary)
gsap.to(posterRef.current, { opacity: 0 })
```

CSS transitions are simpler, faster, and GPU-accelerated.

### ❌ Don't: Ignore mobile autoplay requirements

```tsx
// WRONG (won't autoplay on iOS)
<video autoplay />

// CORRECT
<video autoplay muted playsInline />
```

## Debugging Tips

### View transition in slow motion

```tsx
<img 
  style={{ 
    opacity: videoReady ? 0 : 1,
    transition: 'opacity 2000ms ease-out' // 10x slower
  }} 
/>
```

### Force video ready state

```tsx
const [videoReady, setVideoReady] = useState(true);
// Forces video visible immediately
```

### Check layer stacking

Use DevTools 3D layer view:
- Chrome: DevTools → Layers
- Firefox: DevTools → Inspector → Layout

### Monitor video events

```tsx
<video
  onLoadStart={() => console.log('Load start')}
  onLoadedMetadata={() => console.log('Metadata loaded')}
  onLoadedData={() => console.log('Data loaded')}
  onCanPlay={() => console.log('Can play')}
  onPlay={() => console.log('Playing')}
/>
```

## Production Optimizations

### 1. Use CDN for video

```tsx
<source src="https://cdn.opdine.com/hero.webm" />
```

### 2. Optimize poster image

```bash
# Using ImageMagick
convert hero-frame.jpg -quality 85 -strip hero-poster.jpg

# Using cwebp (for WebP)
cwebp -q 85 hero-frame.jpg -o hero-poster.webp
```

### 3. Compress video

```bash
# Using ffmpeg
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -crf 23 \
  -preset slow \
  -vf scale=1280:720 \
  -an \
  output.mp4
```

### 4. Enable Cloudinary optimizations

```
https://res.cloudinary.com/.../f_auto,q_auto/hero.webm
```

- `f_auto`: Automatic format selection
- `q_auto`: Automatic quality optimization

## Summary

This architecture achieves:

✅ Zero-flash poster-to-video transition
✅ Instant perceived loading
✅ Graceful fallback if video fails
✅ Mobile-friendly autoplay
✅ Performant (CSS transitions only)
✅ Accessible (decorative media pattern)
✅ Cross-browser compatible
✅ Production-ready

The key insight: **treat the video as a progressive enhancement to the poster**, not a replacement for it.
