# Assets Usage Guide

## 📁 Available Assets in Your Project

### Current Assets Location: `src/assets/`

#### Images Used in Pages

**UI/UX Design Page:**
- No external image imports currently (uses emojis for illustrations)
- Can add custom images to `src/assets/`

**WordPress Development Page:**
```
✅ wordpress-website-development.png     (Hero image)
✅ custom-wordpress-development.svg      (Custom dev section)
✅ plugin-development.svg                (Plugin section)
✅ API-Development.svg                   (API section)
✅ wordpress-maintainence.svg            (Maintenance section)
✅ faqs-blue-2.png                       (FAQ section)
```

---

## 🎨 Custom Image Integration

### How to Add New Images

1. **Save your images** to `src/assets/` folder
2. **Import in component**:
   ```tsx
   import MyImage from '../../assets/my-image.png';
   ```
3. **Use in JSX**:
   ```tsx
   <img src={MyImage} alt="Description" />
   ```

### Recommended Image Sizes

| Section | Dimension | Format | Notes |
|---------|-----------|--------|-------|
| Hero | 600x400px | PNG/JPG | High quality, compressed |
| Service Cards | 300x200px | SVG/PNG | Icons or illustrations |
| Timeline | 150x150px | PNG/SVG | Square icons |
| Testimonial Avatar | 50x50px | PNG | Circular |
| FAQ Image | 400x300px | PNG/JPG | Left side illustration |
| Tech Icons | 40x40px | SVG | Color: #22c55e |

---

## 🖼️ Creating Custom Graphics

### Green Theme Color References

```css
Primary Green: #22c55e   (RGB: 34, 197, 94)
Dark Green: #16a34a      (RGB: 22, 163, 74)
Light Green: #dcfce7     (RGB: 220, 252, 231)
Very Light: #f0fdf4      (RGB: 240, 253, 244)
```

### Tools for Creating Graphics

1. **Figma** (Free tier available)
   - Design components
   - Export as SVG/PNG
   - Use green colors from palette

2. **Canva** (Pro recommended)
   - Quick templates
   - Green theme templates
   - Export ready

3. **Illustrator/XD** (Professional)
   - Full design control
   - Vector graphics
   - SVG export

### SVG Optimization

For SVG files, ensure they're optimized:
```bash
# Using SVGO (command line)
svgo input.svg --output optimized.svg

# Or use online tool: https://jakearchibald.github.io/svgo-web/
```

---

## 📸 Recommended Image Categories

### For UI/UX Page

1. **Hero Illustration**
   - Show design process/creativity
   - Include design tools or wireframes
   - Suggested: Illustration of designer working

2. **Service Icons**
   - User Research: 👥 or magnifying glass
   - Wireframing: 📐 or grid
   - Prototyping: 🎬 or mockup
   - Information Architecture: 🗂️ or hierarchy
   - Usability Testing: ✅ or checklist

3. **Testimonial Images**
   - Client logos or initials in circles
   - Green background with white text

### For WordPress Page

1. **Hero Image** (Already using)
   - WordPress dashboard screenshot
   - Website mockup

2. **Content Images**
   - WordPress editor interface
   - Theme customization screens
   - Plugin showcase

3. **Tech Stack Icons**
   - Already imported from React Icons
   - Consistent styling with CSS

---

## 🚀 Implementation Examples

### Example 1: Add Hero Image to UI/UX Page

```tsx
// 1. Import at top of UIUXDesign.tsx
import UIUXHeroImg from '../../assets/uiux-hero-illustration.svg';

// 2. Update hero section
<div className="hero-illustration">
  <img src={UIUXHeroImg} alt="UI/UX Design Process" />
</div>

// 3. Update CSS for better sizing
.hero-illustration img {
  max-width: 100%;
  height: auto;
  border-radius: 20px;
}
```

### Example 2: Add Service Card Images

```tsx
// Import images
import userResearchImg from '../../assets/user-research.svg';
import wireframeImg from '../../assets/wireframing.svg';

// Use in services array
const services = [
  {
    title: 'User Research',
    image: userResearchImg,
    description: '...'
  },
  {
    title: 'Wireframing',
    image: wireframeImg,
    description: '...'
  },
];

// Render
{services.map((service) => (
  <div className="service-block-large">
    <img src={service.image} alt={service.title} />
    <h3>{service.title}</h3>
    <p>{service.description}</p>
  </div>
))}
```

### Example 3: Add Custom Testimonial Avatars

```tsx
import client1Logo from '../../assets/client1-logo.png';
import client2Logo from '../../assets/client2-logo.png';

const testimonials = [
  {
    text: 'Quote text...',
    name: 'Client Name',
    company: 'Company',
    avatar: client1Logo
  },
];

// In JSX
{testimonials.map((testimonial) => (
  <img src={testimonial.avatar} alt={testimonial.name} />
))}
```

---

## 📤 Exporting Images for Web

### PNG Optimization
```
1. Use https://tinypng.com
2. Save as PNG (24-bit or 8-bit if possible)
3. Target: < 100KB per image
```

### JPG Optimization
```
1. Export at 80% quality
2. Target: < 50KB for hero images
3. Use progressive JPEG for faster loading
```

### SVG Optimization
```
1. Clean SVG code (remove metadata)
2. Target: < 20KB for icons
3. Use SVGO tool for automatic optimization
```

---

## 🎯 Current Asset List

```
src/assets/
├── AMAN.png                              ✅
├── API-Development.svg                   ✅ (Used)
├── Asset-119.svg                         ✅
├── Asset-120-1.svg                       ✅
├── Asset-123.svg                         ✅
├── custom-wordpress-development.svg      ✅ (Used)
├── faqs-blue-2.png                       ✅ (Used)
├── Frame-1.svg                           ✅
├── Frame.svg                             ✅
├── image.png                             ✅
├── newleftsidecolorchange.svg            ✅
├── newrightsidecolorchange.svg           ✅
├── plugin-development.svg                ✅ (Used)
├── react.svg                             ✅
├── theme-development-1.svg               ✅
├── wordpress-maintainence.svg            ✅ (Used)
├── wordpress-website-development.png     ✅ (Used)
├── wow1.svg through wow5.svg             ✅
├── Client-Track/                         📁 (Folder)
└── Seo/                                  📁 (Folder)
```

---

## 🎨 Design System Integration

### Using Assets Consistently

1. **Color Override**
   ```css
   /* For PNG images with blue, add overlay */
   .image-overlay {
     filter: hue-rotate(180deg) saturate(1.2);
   }
   ```

2. **Dark/Light Mode**
   ```css
   @media (prefers-color-scheme: dark) {
     img {
       opacity: 0.9;
    }
   }
   ```

3. **Loading States**
   ```tsx
   <img 
     src={image} 
     alt="description"
     loading="lazy"
   />
   ```

---

## 📱 Responsive Image Handling

### CSS for Responsive Images
```css
.responsive-image {
  width: 100%;
  height: auto;
  max-width: 600px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.1);
}

@media (max-width: 768px) {
  .responsive-image {
    max-width: 100%;
  }
}
```

### Picture Element for Multiple Formats
```tsx
<picture>
  <source 
    media="(min-width: 1200px)" 
    srcSet={largeImg}
  />
  <source 
    media="(min-width: 768px)" 
    srcSet={mediumImg}
  />
  <img src={smallImg} alt="Responsive" />
</picture>
```

---

## ✅ Best Practices

1. **Always add alt text** for accessibility
2. **Use semantic image names** (e.g., `user-research.svg`)
3. **Compress images** before committing
4. **Keep aspect ratios** consistent
5. **Use SVG for icons** (scalable, smaller)
6. **Use JPG for photos** (smaller file size)
7. **Use PNG for graphics** (lossless quality)
8. **Lazy load** images below the fold

---

## 🚨 Common Issues & Solutions

### Image Not Showing
```
❌ Problem: src={require('./image.png')}
✅ Solution: import Image from './image.png'; <img src={Image} />
```

### Image Distorted
```
❌ Problem: height: 100px; width: auto;
✅ Solution: max-width: 100%; height: auto;
```

### SVG Color Not Changing
```
❌ Problem: color: green;
✅ Solution: filter: invert(1); or fill attribute
```

### Performance Issues
```
✅ Use Next.js Image component
✅ Lazy load images
✅ Use appropriate formats
✅ Compress before upload
```

---

## 📞 Support Resources

- **Figma**: figma.com
- **Canva**: canva.com
- **TinyPNG**: tinypng.com
- **SVGO**: jakearchibald.github.io/svgo-web/
- **React Image Loading**: react-icons.github.io/react-icons/

---

**Last Updated**: December 16, 2025
**Status**: ✅ Ready for Implementation
