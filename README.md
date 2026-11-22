# Shopify Image Gallery Section (Dawn-Compatible)

A self-contained Shopify OS 2.0 image gallery section built for **Dawn** (tested against Dawn 16.1.1). Supports 1 to 50 images via Shopify's standard media picker, two responsive layout modes, Shopify focal points, lazy loading, and an accessible lightbox.

## Features

- **Standard Shopify Media Picker**: Add 1 to 50 images via section blocks, with drag-and-drop reordering in the Theme Editor.
- **Two Layout Modes**:
  - **Uniform Grid**: Configurable desktop columns (`2-6`), mobile columns (`1-2`), optional maximum rows (`0` = show all), gap spacing, and tile aspect ratio (`Square`, `Portrait`, `Landscape`, `Wide`, or `Adapt to image`).
  - **Tiled Mosaic**: Pure CSS Grid (`grid-auto-flow: dense`) where each image can span `1x1` (Standard), `2x1` (Wide), `1x2` (Tall), or `2x2` (Featured) to create complete tiled compositions without JavaScript.
- **Shopify Focal Point Support**: Uses `image_tag` with `object-fit: cover` and no CSS `object-position` override, preserving focal points configured in Shopify Admin / Theme Editor.
- **Dawn Styling & Typography**: Inherits Dawn's `color_scheme`, `page-width`, `global-media-settings` (border radius, border, shadow), heading sizes, section padding, and scroll-reveal animations.
- **Responsive & Lazy Loaded**: Tailored `widths` and `sizes` attributes with `loading="lazy"` (plus an optional first-row eager load toggle).
- **Accessible Lightbox & Captions (WCAG 2.1 AA)**:
  - Native `<dialog>` lightbox with Escape, backdrop click, Left/Right arrow navigation, focus restoration, and an `aria-live="polite"` status region.
  - High-contrast inset `:focus-visible` outlines on tiles and lightbox controls.
  - Optional captions (`Below image` or `Subtle bottom overlay` with contrast-safe gradient).

## Installation

Copy the following files into your Shopify Dawn theme:

- `sections/image-gallery.liquid`
- `assets/section-image-gallery.css`
- `assets/section-image-gallery.js`

Then add the **Image gallery** section to any page or template via the Shopify Theme Editor.

## License

MIT — see [LICENSE](LICENSE).
