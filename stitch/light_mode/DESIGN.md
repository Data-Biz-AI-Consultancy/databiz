---
name: Executive Editorial
colors:
  surface: '#faf9f8'
  surface-dim: '#dadad9'
  surface-bright: '#faf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f2'
  surface-container: '#eeeeed'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e3e2e1'
  on-surface: '#1a1c1c'
  on-surface-variant: '#3f4948'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f0ef'
  outline: '#6f7979'
  outline-variant: '#bec9c8'
  surface-tint: '#096969'
  primary: '#004c4c'
  on-primary: '#ffffff'
  primary-container: '#006666'
  on-primary-container: '#93e1e0'
  inverse-primary: '#86d4d3'
  secondary: '#645d54'
  on-secondary: '#ffffff'
  secondary-container: '#e9ded2'
  on-secondary-container: '#696258'
  tertiary: '#3b4646'
  on-tertiary: '#ffffff'
  tertiary-container: '#535d5d'
  on-tertiary-container: '#cbd6d6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a2f0ef'
  primary-fixed-dim: '#86d4d3'
  on-primary-fixed: '#002020'
  on-primary-fixed-variant: '#004f4f'
  secondary-fixed: '#ece1d5'
  secondary-fixed-dim: '#cfc5b9'
  on-secondary-fixed: '#201b13'
  on-secondary-fixed-variant: '#4c463d'
  tertiary-fixed: '#dae5e5'
  tertiary-fixed-dim: '#bec9c9'
  on-tertiary-fixed: '#131d1e'
  on-tertiary-fixed-variant: '#3e4949'
  background: '#faf9f8'
  on-background: '#1a1c1c'
  surface-variant: '#e3e2e1'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
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
  label-md:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  container-max-width: 1280px
---

## Brand & Style

This design system is built for high-stakes data environments where clarity is synonymous with authority. The brand personality is poised, intellectual, and decisive, catering to an executive audience that values information density without cognitive clutter. 

The design style is **Minimalism with an Editorial edge**. It prioritizes high-quality typography and generous whitespace to create a sense of calm and focus. By stripping away unnecessary ornamentation, the system allows the data to command the stage. The emotional response should be one of quiet confidence—professional restraint that feels premium rather than sterile.

## Colors

The palette is anchored by a deep, authoritative teal that serves as the primary signal for action and importance. This is grounded by a warm, off-white surface that reduces eye strain compared to pure white and adds a sophisticated, paper-like quality to the interface.

- **Primary (#006666):** Used for key brand moments, primary actions, and critical data highlights.
- **Secondary (#A89F94):** A muted taupe for subtle borders, secondary text, and architectural lines.
- **Tertiary (#D9E4E4):** A soft teal wash for background accents and large surface areas.
- **Neutral (#FAF9F8):** The foundational surface color, providing a warm, premium backdrop.

## Typography

The typography uses **Outfit** across all levels to maintain a cohesive, modern geometric feel while ensuring high legibility. 

The hierarchy is strictly enforced. Display sizes use tighter letter spacing and heavier weights to mimic high-end editorial layouts. Body text is prioritized for readability with comfortable line heights. Small labels and metadata utilize increased letter spacing and uppercase styling to provide a clear visual distinction from narrative content.

## Layout & Spacing

This design system employs a **Fixed Grid** model for desktop to maintain the "editorial" feel, centering content within a 1280px container to ensure lines of text do not become excessively long.

- **Desktop:** 12-column grid with 24px gutters and 64px side margins.
- **Tablet:** 8-column grid with 24px gutters and 40px side margins.
- **Mobile:** 4-column fluid grid with 16px gutters and 20px side margins.

The spacing rhythm follows an 8px base unit. Generous "breathing room" is mandatory; avoid crowding elements. Use padding to create logical groupings rather than relying solely on lines or borders.

## Elevation & Depth

Depth is achieved through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows. This maintains a flat, sophisticated profile consistent with modern editorial design.

- **Base Level:** The #FAF9F8 neutral surface.
- **Mid Level:** Elements like cards or navigation bars use a pure white (#FFFFFF) background to subtly lift from the base, paired with a 1px border in #A89F94 at 20% opacity.
- **High Level:** Hover states or active modals may use a very soft, highly diffused ambient shadow (0px 12px 32px rgba(0, 0, 0, 0.04)) to indicate interactivity.

## Shapes

The shape language is **Soft**. A subtle 4px (0.25rem) radius is applied to standard components like buttons and input fields. This provides a touch of approachability without sacrificing the professional, architectural feel of the interface. Larger containers like cards may use the 8px (0.5rem) radius to define clear boundaries.

## Components

### Buttons
- **Primary:** Solid #006666 background with white text. High-contrast, no shadow.
- **Secondary:** Transparent background with a 1px border in #006666 and teal text.
- **Tertiary:** Text-only with an underline on hover, used for low-priority actions.

### Input Fields
Inputs use a white background with a subtle #A89F94 border. Focus states transition the border to the primary teal and add a 2px inset ring.

### Cards
Cards are the primary data containers. They should have no shadow, a pure white background, and a 1px border in a very light neutral. Headers within cards should use `label-sm` for categorization.

### Chips & Tags
Used for data categorization. These should be rectangular with the 4px radius, using a light tint of the primary color (Tertiary #D9E4E4) and deep teal text.

### Data Tables
Tables are central to the experience. Use "invisible" borders (only horizontal separators) to keep the layout clean. Headers must be `label-sm` (uppercase) to differentiate from data rows.