# Quick Responsive Design Reference

## Breakpoint Cheat Sheet

```css
/* Small Mobile (Phone 360-480px) */
@media (max-width: 480px) { }

/* Mobile (Phone 480-768px) */
@media (max-width: 768px) { }

/* Tablet (iPad 768-1024px) */
@media (max-width: 1024px) { }

/* Desktop (1024-1280px) */
@media (max-width: 1280px) { }

/* Large Desktop (1280px+) */
/* No media query needed - default styles */
```

---

## CSS Grid Patterns

### Blog Page Grid
```css
/* Desktop: 4 columns */
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

/* Tablet: 2-3 columns */
grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));

/* Mobile: 1 column */
grid-template-columns: 1fr;
```

### Two-Column Layout
```css
/* Desktop: Two columns */
grid-template-columns: 1fr 1fr;

/* Mobile: Single column */
grid-template-columns: 1fr;
```

### Sidebar Layout
```css
/* Desktop: Sidebar + Content */
grid-template-columns: 200px 1fr;
gap: 30px;

/* Mobile: Content then Sidebar */
grid-template-columns: 1fr;
gap: 20px;
```

---

## Typography Scaling

### Blog Page Headings
```css
/* Desktop */
.blog-hero h1 { font-size: 2.8rem; }
.blog-title { font-size: 1.15rem; }

/* Tablet */
.blog-hero h1 { font-size: 2rem; }
.blog-title { font-size: 1.1rem; }

/* Mobile */
.blog-hero h1 { font-size: 1.5rem; }
.blog-title { font-size: 1rem; }
```

### BlogPost Headings
```css
/* Desktop */
.blog-post h1 { font-size: 2.5rem; }
.blog-post-content h2 { font-size: 2rem; }
.blog-post-content h3 { font-size: 1.5rem; }

/* Mobile */
.blog-post h1 { font-size: 1.4rem; }
.blog-post-content h2 { font-size: 1.1rem; }
.blog-post-content h3 { font-size: 1rem; }
```

---

## Spacing Rules

### Desktop Spacing
```css
padding: 30px;
gap: 30px;
margin-bottom: 25px;
```

### Tablet Spacing
```css
padding: 20px;
gap: 20px;
margin-bottom: 20px;
```

### Mobile Spacing
```css
padding: 15px;
gap: 15px;
margin-bottom: 15px;

/* Small mobile */
padding: 10px;
gap: 10px;
margin-bottom: 10px;
```

---

## Common Responsive Patterns

### Pattern 1: Sidebar Toggle
```css
/* Desktop: Fixed sidebar */
.wrapper { grid-template-columns: 200px 1fr; }
.sidebar { position: sticky; top: 20px; }

/* Mobile: Sidebar stacks below */
@media (max-width: 768px) {
  .wrapper { grid-template-columns: 1fr; }
  .sidebar { position: relative; top: 0; }
}
```

### Pattern 2: Grid Resize
```css
/* Desktop: 4 columns */
.grid { grid-template-columns: repeat(4, 1fr); }

/* Tablet: 2 columns */
@media (max-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Mobile: 1 column */
@media (max-width: 480px) {
  .grid { grid-template-columns: 1fr; }
}
```

### Pattern 3: Flex Stack
```css
/* Desktop: Row */
.buttons { display: flex; flex-direction: row; gap: 10px; }

/* Mobile: Column */
@media (max-width: 768px) {
  .buttons { flex-direction: column; gap: 8px; }
  .button { width: 100%; }
}
```

---

## Mobile-First Font Sizes

```css
/* Start with mobile size */
body { font-size: 14px; }
h1 { font-size: 1.5rem; }
h2 { font-size: 1.2rem; }
p { font-size: 0.9rem; }

/* Increase on tablet */
@media (min-width: 768px) {
  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
  p { font-size: 1rem; }
}

/* Larger on desktop */
@media (min-width: 1024px) {
  h1 { font-size: 2.5rem; }
  h2 { font-size: 1.8rem; }
  p { font-size: 1.05rem; }
}
```

---

## Button/Input Sizing

### Desktop
```css
button {
  padding: 12px 24px;
  font-size: 1rem;
  min-height: auto;
}
```

### Mobile
```css
@media (max-width: 768px) {
  button {
    padding: 10px 16px;
    font-size: 0.9rem;
    min-height: 44px; /* Touch target */
  }
}
```

---

## Image Responsiveness

```css
/* Make images responsive */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* For fixed aspect ratio */
.featured-image {
  width: 100%;
  height: 300px; /* Desktop */
  object-fit: cover;
}

@media (max-width: 768px) {
  .featured-image {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .featured-image {
    height: 180px;
  }
}
```

---

## Flexbox Responsive

```css
/* Desktop: Horizontal */
.flex-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
}

.flex-item {
  flex: 1;
  min-width: 200px;
}

/* Mobile: Vertical */
@media (max-width: 768px) {
  .flex-container {
    flex-direction: column;
    gap: 15px;
  }

  .flex-item {
    flex: 1 1 100%;
    min-width: 0;
  }
}
```

---

## Common Issues & Fixes

### Issue: Text Too Small on Mobile
```css
/* Fix: Increase base font size */
@media (max-width: 480px) {
  body { font-size: 14px; }
  h1 { font-size: 1.3rem; }
  p { font-size: 0.9rem; }
}
```

### Issue: Horizontal Scrolling
```css
/* Fix: Ensure full width */
body { max-width: 100%; overflow-x: hidden; }

.container {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
}
```

### Issue: Buttons Hard to Click
```css
/* Fix: Increase touch target */
button {
  min-height: 44px;
  min-width: 44px;
  padding: 10px 12px;
}
```

### Issue: TOC Overlapping Content
```css
/* Fix: Adjust z-index */
.toc-sidebar {
  position: sticky;
  z-index: 100;
  max-width: 100%;
}

@media (max-width: 768px) {
  .toc-sidebar {
    position: relative;
    max-height: 300px;
    overflow-y: auto;
  }
}
```

---

## Performance Tips

1. **Minimize Media Queries**
   - Use consistent breakpoints (480px, 768px, 1024px)
   - Avoid unnecessary nesting

2. **Use CSS Grid Smart**
   ```css
   /* Good: Auto-responsive */
   grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
   
   /* Avoid: Fixed columns */
   grid-template-columns: repeat(4, 1fr);
   ```

3. **Limit Font Size Changes**
   - Don't change fonts at every breakpoint
   - Use scaling ratios (1.2x, 1.5x, 2x)

4. **Optimize Images**
   - Use appropriate image sizes
   - Consider srcset for responsive images

---

## Testing Checklist

- [ ] Works at 320px (very small phone)
- [ ] Works at 480px (small phone)
- [ ] Works at 768px (tablet)
- [ ] Works at 1024px (large tablet)
- [ ] Works at 1280px+ (desktop)
- [ ] No horizontal scrolling at any size
- [ ] Touch targets minimum 44x44px on mobile
- [ ] Text readable at all sizes
- [ ] Images scale properly
- [ ] Forms usable on mobile

---

## Files to Update When Adding Features

```
New Page/Component Checklist:
├── Create new .tsx file in /src/pages/
├── Create corresponding .css file
├── Add media queries (480px, 768px, 1024px, 1280px)
├── Test on mobile first
├── Test on tablet
├── Test on desktop
└── Add to responsive design documentation
```

---

## Useful Resources

### Browser DevTools
- Press **F12** to open DevTools
- Click **Device Toggle** (Ctrl+Shift+M)
- Test at common breakpoints

### Common Device Sizes
- iPhone SE: 375px
- iPhone 12/13: 390px
- Samsung S21: 360px
- iPad: 768px
- iPad Pro: 1024px
- Desktop: 1920px+

---

## Quick Copy-Paste Snippets

### Basic Responsive Grid
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); gap: 15px; }
}

@media (max-width: 480px) {
  .grid { grid-template-columns: 1fr; gap: 10px; }
}
```

### Responsive Container
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .container { padding: 0 15px; }
}

@media (max-width: 480px) {
  .container { padding: 0 10px; }
}
```

### Responsive Typography
```css
body { font-size: 14px; }
h1 { font-size: 2rem; }
h2 { font-size: 1.5rem; }
p { font-size: 1rem; }

@media (max-width: 768px) {
  h1 { font-size: 1.5rem; }
  h2 { font-size: 1.2rem; }
  p { font-size: 0.95rem; }
}

@media (max-width: 480px) {
  h1 { font-size: 1.2rem; }
  h2 { font-size: 1rem; }
  p { font-size: 0.9rem; }
}
```

---

## Summary

✅ **Your site is now fully responsive!**

- 4 breakpoints covered (480px, 768px, 1024px, 1280px)
- All major components optimized for mobile
- CSS properly organized and documented
- Ready for production deployment

🎉 **No more worrying about mobile users!**

