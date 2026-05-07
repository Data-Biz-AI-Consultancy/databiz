# Data Biz: Vibe Coding Instructions

This document defines the "vibe" for Data Biz. Use these instructions when generating code, design, or content to ensure consistency with the brand's senior, operator-led positioning.

## 1. Brand Soul

The core identity, positioning, and tone of voice are defined in [SOUL.md](SOUL.md). Always refer to this for the brand's persona.

## 2. Visual Design System

The visual "vibe" and design system are defined in [DESIGN.md](DESIGN.md). Always refer to that document for color palettes, typography, and layout principles.

## 3. Coding Principles

- **Tech Stack Preference:** Vanilla HTML, CSS (Vanilla or Tailwind), and Javascript. Keep it lightweight and fast.
- **Structure:** Semantic HTML5 (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **CSS Strategy:** 
    - Use CSS Variables for the color palette and spacing.
    - Prioritize custom classes that reflect the "vibe" (e.g., `.vibe-card`, `.vibe-btn-primary`).
- **Responsive:** Mobile-first design is non-negotiable.
- **Components:**
    - **Header:** Sticky, minimal logo, clear "Book Call" CTA.
    - **Cards:** Premium look, subtle borders, no heavy shadows.
    - **Buttons:** Sharp corners or very slight rounding (4px-8px). No pill shapes unless specified.

## 4. Content Repurposing Logic

When coding interfaces that display content (like the "Insights" section):
- **Summarization:** Extract the "spine" of the essay. Use the "Problem → Framework → Story → CTA" structure.
- **Hooks:** Use "Brutal Truths" from the strategy (e.g., "Executive dashboards are P1, not P0").
- **Funnel Integration:** Every content piece must have a clear path to the "Discovery Call" or "Substack Subscription."

## 5. Analytics & Conversion

- **Primary Goal:** Discovery Call bookings (Calendly).
- **Secondary Goal:** Substack subscriptions / Lead magnet downloads.
- **Events:** Wire up CTA clicks and scroll depth to track interest.

---

*Usage: Provide this file to any AI coding assistant to set the "system vibe" before starting a task.*
