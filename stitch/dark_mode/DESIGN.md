---
name: Data Command
colors:
  surface: '#0d1515'
  surface-dim: '#0d1515'
  surface-bright: '#323b3b'
  surface-container-lowest: '#081010'
  surface-container-low: '#151d1d'
  surface-container: '#192121'
  surface-container-high: '#232b2b'
  surface-container-highest: '#2e3636'
  on-surface: '#dce4e4'
  on-surface-variant: '#bbcac6'
  inverse-surface: '#dce4e4'
  inverse-on-surface: '#2a3232'
  outline: '#859490'
  outline-variant: '#3c4947'
  surface-tint: '#4fdbc8'
  primary: '#4fdbc8'
  on-primary: '#003731'
  primary-container: '#14b8a6'
  on-primary-container: '#00423b'
  inverse-primary: '#006b5f'
  secondary: '#44e2cd'
  on-secondary: '#003731'
  secondary-container: '#03c6b2'
  on-secondary-container: '#004d44'
  tertiary: '#ffb2b7'
  on-tertiary: '#67001b'
  tertiary-container: '#ff7b88'
  on-tertiary-container: '#7a0022'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#71f8e4'
  primary-fixed-dim: '#4fdbc8'
  on-primary-fixed: '#00201c'
  on-primary-fixed-variant: '#005048'
  secondary-fixed: '#62fae3'
  secondary-fixed-dim: '#3cddc7'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005047'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b7'
  on-tertiary-fixed: '#40000d'
  on-tertiary-fixed-variant: '#92002a'
  background: '#0d1515'
  on-background: '#dce4e4'
  surface-variant: '#2e3636'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Outfit
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 24px
  gutter: 16px
---

## Brand & Style

This design system is engineered for high-density data environments where clarity, speed, and precision are paramount. The "Modern Data Command" aesthetic leverages a dark-mode-first approach to reduce visual fatigue during extended monitoring and analysis.

The brand personality is **technical, authoritative, and premium**. It draws from **Modernism** for its functional clarity and **Glassmorphism** for its sense of depth and hierarchy. The interface should feel like a sophisticated cockpit: high-contrast information layers floating over a deep, stable void. Every element is designed to minimize cognitive load while highlighting critical data signals through vibrant teal accents.

## Colors

The palette is built on a foundation of **Deep Charcoal (#0F1717)** to provide a rich, non-fatiguing backdrop. 

- **Primary (Vibrant Teal):** Used for actionable items, active states, and success indicators. It provides high luminance against the dark background.
- **Secondary (Mint):** Used for supporting accents and hover states to provide a subtle shift in interactive elements.
- **Tertiary (Rose):** Reserved exclusively for alerts, errors, and critical data points that require immediate attention.
- **Neutrals:** Systematic shades of slate and charcoal define surface tiers. Surface colors use a slightly higher luminosity than the background to create a sense of elevation.

## Typography

**Outfit** is the primary typeface, chosen for its geometric precision and modern readability. It provides a clean, professional appearance that scales effectively from large dashboards to dense property panels.

To reinforce the technical nature of the system, **JetBrains Mono** is utilized for metadata, labels, and raw data values. This ensures that numerical data is perfectly aligned and easily scannable. 

- Use **display-lg** for high-level metric summaries.
- Use **label-caps** for section headers and table column titles to create a clear structural distinction.
- Maintain a high contrast ratio (minimum 7:1) for all body text against the dark backgrounds.

## Layout & Spacing

The layout utilizes a **12-column fluid grid** for desktop, transitioning to a **4-column grid** for mobile. A strict **4px baseline grid** governs all vertical rhythm and internal component padding.

- **Margins:** 24px on desktop; 16px on mobile.
- **Gutters:** 16px fixed to maintain tight data density.
- **Density:** The system prioritizes "Compact" density to maximize information display. Avoid excessive whitespace in data-rich areas; instead, use structural borders and tonal shifts to separate content.

## Elevation & Depth

Depth is achieved through **Glassmorphism** and **Tonal Layering** rather than traditional heavy shadows.

- **Layer 0 (Background):** #0F1717.
- **Layer 1 (Cards/Containers):** #1E2929 with a 1px border (#2D3A3A).
- **Layer 2 (Overlays/Modals):** Semi-transparent background (alpha 80%) with a `backdrop-filter: blur(12px)`. These elements should have a subtle top-down gradient and a slightly brighter border (#3D4A4A) to simulate light catching the edge of the "glass."
- **Interactive Depth:** When an element is hovered, it should increase in luminosity rather than casting a larger shadow. This reinforces the "illuminated cockpit" feel.

## Shapes

The shape language is **Soft** but disciplined. 

- **Primary Radius (4px):** Applied to buttons, input fields, and small UI components to maintain a crisp, technical look.
- **Large Radius (8px):** Applied to cards and main content containers.
- **Interactive Elements:** Use a consistent 4px radius. Avoid pill shapes unless used for status chips to ensure they are visually distinct from functional buttons.

## Components

### Buttons
- **Primary:** Solid #14B8A6 with #0F1717 text. High impact.
- **Secondary:** Transparent background with 1px #2D3A3A border. On hover, background fills to 10% Teal opacity.
- **Ghost:** No border or background. Use for secondary actions in dense toolbars.

### Input Fields
- **Default:** #141C1C background with a 1px #2D3A3A border.
- **Focus:** Border changes to #14B8A6 with a subtle outer glow (0px 0px 8px rgba(20, 184, 166, 0.3)).
- **Typography:** Use `body-sm` for input text and `label-caps` for field labels.

### Cards & Containers
- Utilize the Layer 1 specification. 
- Headers within cards should have a subtle bottom border (#2D3A3A) to separate navigation from content.

### Status Chips
- Use the `data-mono` typography.
- Statuses (Success, Warning, Error) should use a desaturated background (20% opacity) of the respective color with a fully saturated 1px border and text.

### Data Tables
- Row hover state: #232E2E.
- Striping is not required; use 1px horizontal dividers (#1E2929) to maintain a clean vertical flow.