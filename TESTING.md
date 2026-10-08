# Testing Guide: Seamless Poster-to-Video Hero

## Critical Test: Loading Behavior

This is the PRIMARY acceptance test for the implementation.

### Test 1: Fast 3G Network Simulation

**Purpose:** Verify seamless poster-to-video transition under slow network conditions

**Steps:**

1. Open Chrome DevTools (F12)
2. Navigate to **Network** tab
3. Check **"Disable cache"**
4. Set throttling to **"Fast 3G"**
5. Refresh the page (Ctrl+Shift+R)

**Expected Behavior:**

```
TIME     | VISUAL STATE                 | OPACITY
---------|------------------------------|----------------
0ms      | Poster visible               | poster: 1, video: 0
         | (hero appears immediately)   |
         |                              |
~2-3s    | Poster still visible         | poster: 1, video: 0
         | (video downloading)          |
         |                              |
~3-4s    | VIDEO READY EVENT FIRES      |
         | Transition begins            |
         |                              |
~3.2s    | Both visible (crossfade)     | poster: 0.5, video: 0.5
         |                              |
~3.6s    | Video fully visible          | poster: 0, video: 1
         | Video playing                |
         |                              |
Forever  | Video loops                  | poster: 0, video: 1
```

**Success Criteria:**

✅ Poster renders within 50ms of page load
✅ No white/black screen at any point
✅ No flicker or flash during transition
✅ Video starts exactly when opacity reaches 1
✅ Poster fades out smoothly (not instant removal)
✅ Video loops seamlessly

**Failure Indicators:**

❌ Black screen before poster
❌ White flash between poster and video
❌ Video visible before it's ready to play
❌ Poster disappears instantly (display: none)
❌ Jerky or stuttered transition
❌ Video doesn't loop

### Test 2: Offline Mode (Fallback Behavior)

**Purpose:** Verify graceful degradation when video fails

**Steps:**

1. Open Chrome DevTools
2. Navigate to **Network** tab
3. Set to **"Offline"**
4. Refresh the page

**Expected Behavior:**

- Poster renders immediately
- Hero looks complete and professional
- No broken video icon
- No loading spinner
- No error message
- No black rectangle

**Success Criteria:**

✅ Poster remains visible indefinitely
✅ Hero section looks intentional, not broken
✅ All text and buttons still visible
✅ No visual indication of failure

### Test 3: Fast Network

**Purpose:** Verify behavior when video loads instantly

**Steps:**

1. Clear browser cache
2. DevTools Network → No throttling
3. Refresh page

**Expected Behavior:**

- Poster still appears first (briefly)
- Video ready within ~200-500ms
- Smooth transition still occurs
- No instant snap from poster to video

**Success Criteria:**

✅ Poster renders first (even briefly)
✅ Transition is smooth, not instant
✅ No black flash
✅ Video autoplays immediately after transition

## Visual Inspection Tests

### Test 4: First Frame Matching

**Purpose:** Verify poster is exact first frame of video

**Steps:**

1. Load page
2. Watch the poster-to-video transition carefully
3. Look for any "jump" or content shift

**Expected Behavior:**

- Transition should look like a simple fade
- No visible change in composition
- No movement of food elements
- Frame should appear identical

**Success Criteria:**

✅ No visible "jump" in video content
✅ Seamless fade effect
✅ Identical visual composition

### Test 5: Z-Index Layering

**Purpose:** Verify correct stacking order

**Steps:**

1. Open DevTools → Elements
2. Inspect hero section
3. Check layer order

**Expected Layer Stack (bottom to top):**

```
1. <img> Poster (position: absolute, inset: 0)
2. <video> Video (position: absolute, inset: 0)
3. <div> Gradient overlay
4. <main> Hero content (z-index: 10)
5. <header> Navbar (z-index: 20)
```

**Success Criteria:**

✅ Video is above poster
✅ Both occupy identical position
✅ Gradient above video
✅ Content above gradient
✅ Navbar above everything

### Test 6: Mobile Responsive

**Purpose:** Verify mobile behavior

**Steps:**

1. DevTools → Toggle device toolbar
2. Select iPhone 12 Pro / Pixel 5
3. Refresh page

**Expected Behavior:**

- Hero height: min 720px
- Video autoplays (playsInline attribute)
- Object-fit: cover crops intelligently
- Hamburger menu visible
- Desktop nav hidden
- Buttons stack vertically if needed
- Text remains readable

**Success Criteria:**

✅ Video autoplays on mobile
✅ No manual play button
✅ Poster-to-video transition works identically
✅ Touch-friendly button sizes
✅ Readable typography

## Technical Validation Tests

### Test 7: DOM Inspection

**Purpose:** Verify both layers remain mounted

**Steps:**

1. Load page and wait for video to play
2. DevTools → Elements
3. Find poster `<img>` element
4. Check computed styles

**Expected State After Video Plays:**

```html
<img 
  src="/images/opdine-hero-poster-start.jpg"
  style="opacity: 0"  ← Still in DOM, just invisible
  class="..."
/>
```

**Success Criteria:**

✅ Poster element still exists in DOM
✅ `display` is NOT set to `none`
✅ `opacity` is `0`
✅ Element not removed/unmounted

### Test 8: Video Attributes

**Purpose:** Verify correct video configuration

**Steps:**

1. DevTools → Elements
2. Find `<video>` element
3. Check attributes

**Expected Attributes:**

```html
<video
  autoplay          ← Required
  muted            ← Required for autoplay
  loop             ← Required for continuous play
  playsinline      ← Required for mobile
  preload="auto"   ← Preferred
  aria-hidden="true"
/>
```

**Success Criteria:**

✅ All attributes present
✅ No `controls` attribute
✅ aria-hidden set

### Test 9: Console Errors

**Purpose:** Verify no JavaScript errors

**Steps:**

1. Open DevTools → Console
2. Clear console
3. Refresh page
4. Watch video transition

**Expected:**

- No errors
- No warnings (except possibly npm audit)
- Clean console

**Success Criteria:**

✅ Zero JavaScript errors
✅ No 404s for assets
✅ Video loads successfully
✅ No CORS errors

## Performance Tests

### Test 10: Loading Timeline

**Purpose:** Measure critical loading metrics

**Steps:**

1. DevTools → Network tab
2. Clear cache
3. Throttle to Fast 3G
4. Record timeline
5. Refresh page

**Expected Timeline:**

```
0-50ms:     HTML document loads
50-100ms:   CSS loads
100-200ms:  Poster image starts loading
200-500ms:  Poster visible on screen  ← CRITICAL
1-3s:       Video downloading
3-5s:       Video ready event fires
3.5s:       Transition complete
```

**Success Criteria:**

✅ Poster visible within 500ms
✅ Video doesn't block initial render
✅ Hero appears "instant" to user

### Test 11: Poster File Size

**Purpose:** Verify poster is optimized

**Steps:**

1. DevTools → Network tab
2. Find opdine-hero-poster-start.jpg
3. Check size

**Expected:**

- Size: < 100 KB (preferably < 80 KB)
- Format: JPEG or WebP
- Dimensions: Appropriate for hero size

**Success Criteria:**

✅ File size under 100 KB
✅ Quality still looks good
✅ No pixelation visible

### Test 12: Video File Size

**Purpose:** Verify video is optimized

**Steps:**

1. DevTools → Network tab
2. Find opdine-hero.webm
3. Check size and timing

**Expected:**

- Size: ~1 MB (acceptable for 7-second video)
- Format: WebM or MP4
- Progressive download (plays before complete)

**Success Criteria:**

✅ Video size reasonable (~1 MB)
✅ Video can start playing before fully downloaded
✅ Compression quality acceptable

## Cross-Browser Tests

### Test 13: Safari (Desktop & Mobile)

**Critical for iOS devices**

**Steps:**

1. Open in Safari
2. Test autoplay behavior
3. Verify no extra UI

**Known Safari Requirements:**

- `muted` attribute required
- `playsInline` required for mobile
- Autoplay policies may differ

**Success Criteria:**

✅ Video autoplays in Safari
✅ No "tap to play" overlay
✅ Muted by default

### Test 14: Firefox

**Steps:**

1. Open in Firefox
2. Test transition behavior
3. Check console for warnings

**Success Criteria:**

✅ Identical behavior to Chrome
✅ Video autoplays
✅ Smooth transition

## User Experience Tests

### Test 15: Perceived Performance

**Purpose:** Subjective loading experience

**Steps:**

1. Clear cache
2. Load page
3. Note first impression

**Expected User Experience:**

- Hero appears "instantly"
- No visible loading state
- Feels premium and polished
- Transition feels intentional, not accidental

### Test 16: Visual Polish

**Purpose:** Overall aesthetic quality

**Checklist:**

✅ Typography feels premium
✅ Buttons look professional
✅ Spacing feels balanced
✅ Gradient doesn't obscure video too much
✅ Text remains readable over video
✅ Scroll indicator subtle but visible
✅ Logo clearly visible

## Regression Tests

### Test 17: Multiple Page Loads

**Purpose:** Verify consistent behavior

**Steps:**

1. Load page 5 times
2. Vary network conditions
3. Try different browsers

**Expected:**

- Identical behavior every time
- No random failures
- Consistent timing

### Test 18: Browser Back/Forward

**Purpose:** Verify behavior with bfcache

**Steps:**

1. Load page
2. Navigate away
3. Use browser back button
4. Observe video state

**Expected:**

- Video may already be playing (cached)
- Or transition happens again (cache cleared)
- Either is acceptable

## Debug Tests

### Test 19: Force Poster Visibility

**Purpose:** Debug poster loading

**Steps:**

1. DevTools → Elements
2. Find video element
3. Set `display: none` on video
4. Verify poster remains visible

**Success Criteria:**

✅ Hero still looks complete with just poster

### Test 20: Force Video Visibility

**Purpose:** Debug video loading

**Steps:**

1. DevTools → Elements
2. Find poster img
3. Set `display: none` on poster
4. Observe video behavior

**Expected:**

- Black/empty space initially
- Video appears when ready
- This confirms layering is correct

## Summary Checklist

**Core Functionality:**
- [ ] Poster renders immediately (< 500ms)
- [ ] Video loads independently
- [ ] Smooth crossfade transition
- [ ] No black flash at any point
- [ ] Video autoplays when ready
- [ ] Video loops continuously
- [ ] Fallback works (poster stays if video fails)

**Technical Requirements:**
- [ ] Both layers remain mounted
- [ ] Correct z-index stacking
- [ ] Proper video attributes
- [ ] No JavaScript errors
- [ ] Optimized file sizes
- [ ] Mobile responsive

**Cross-Browser:**
- [ ] Works in Chrome
- [ ] Works in Safari
- [ ] Works in Firefox
- [ ] Works on iOS Safari
- [ ] Works on Android Chrome

**Performance:**
- [ ] Fast 3G test passes
- [ ] Offline test passes
- [ ] Perceived instant loading
- [ ] No layout shift

## Reporting Issues

If any test fails, document:

1. **Which test failed**
2. **Browser and version**
3. **Network conditions**
4. **Screenshot or video of issue**
5. **Console errors (if any)**
6. **Expected vs actual behavior**

## Pass Criteria

**The implementation PASSES if:**

✅ All Core Functionality tests pass
✅ No black flash under any condition
✅ Works on Chrome, Safari, Firefox
✅ Mobile autoplay works
✅ Fast 3G test shows seamless transition

**The implementation FAILS if:**

❌ Black flash occurs between poster and video
❌ Video doesn't autoplay
❌ Poster removed before video ready
❌ Mobile doesn't work
❌ JavaScript errors in console
