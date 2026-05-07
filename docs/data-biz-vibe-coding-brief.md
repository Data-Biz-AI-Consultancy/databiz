# Data Biz vibe-coding brief

## Objective

Build a one-page POC website for **Data Biz**, a data and AI consultancy brand that sits between thought leadership and consulting conversion.

The website should feel credible enough for executive buyers, data leaders, and senior ICs, while staying light enough to build quickly and iterate.

## Build goal

The goal is not to ship a full agency site. The goal is to test:
- Positioning clarity.
- Offer attractiveness.
- Conversion path to discovery calls.
- Whether Data Biz can evolve from media brand into consultancy brand.

## User perception goal

Within a few seconds, a visitor should think:
- This is senior.
- This is practical.
- This person understands real operating pain.
- This is not generic AI fluff.
- I could talk to this person about my problem.

## Audience

### Primary
- Executives: CEO, COO, CFO, CDO.
- Heads of Data, VP Data, analytics leaders.

### Secondary
- Senior analytics engineers, BI leads, data scientists, and product/ops data ICs moving toward leadership.

## Site type

- Informational landing page.
- One page only.
- No CMS.
- No blog engine.
- No overbuilt interactions.

## Desired brand feel

- Editorial.
- Swiss-informed.
- Minimal.
- Sharp.
- Premium.
- Warm neutral.
- Trustworthy.
- Slightly opinionated.

## Explicitly avoid

- Purple gradient AI startup look.
- Futuristic neon motifs.
- Over-animated landing page patterns.
- Generic agency clichés.
- Centered-everything SaaS template.
- Loud “growth hacker” styling.

## Visual direction

### Color
- Warm off-white or soft beige background.
- Deep charcoal text.
- One restrained teal accent.
- Subtle border and surface layering.

### Typography
- Premium editorial heading font.
- Clean sans-serif body font.
- Strong hierarchy.
- Left alignment by default.

### Layout
- Clean grid.
- Some asymmetry in hero or section rhythm.
- Large margins.
- Calm spacing.
- Cards that feel premium, not template-ish.

### Motion
- Minimal.
- Soft fades or reveals only.
- Hover states should feel crisp and intentional.
- No dramatic parallax or gimmicks.

## Core sections

1. Sticky header.
2. Hero.
3. Pain strip.
4. Offers.
5. Credibility.
6. Insights.
7. Final CTA.
8. Footer.

## Sticky header requirements

- Simple brand mark or wordmark for Data Biz.
- Nav links scroll to sections.
- Right-side primary CTA button.
- Dark mode toggle optional but useful.

## Hero requirements

Must contain:
- Strong value proposition.
- Clear target audience.
- Two CTAs max.
- One proof line.

Recommended structure:
- Eyebrow.
- Bold headline.
- Supporting paragraph.
- CTA row.
- Light social proof / credibility note.

## Pain strip requirements

This section should quickly show that the consultancy understands real problems.

Possible lines:
- Too many dashboards, not enough decisions.
- Everything is P0, so nothing is.
- Your AI roadmap is ahead of your operating model.
- Leadership wants leverage, not another tooling pitch.

## Offers section requirements

Need exactly three offer cards for the POC.

Each card should include:
- Offer name.
- Short problem-led summary.
- 3–4 bullet outcomes.
- CTA.

Offers:
1. KPI Tree & Metrics Alignment Workshop.
2. P0 Prioritization Sprint.
3. Data & AI Leadership Advisory.

## Credibility section requirements

Should not rely on fake testimonials.

Use instead:
- Short founder/operator bio.
- Experience themes.
- Business context handled.
- Company references only if comfortable.
- Public thought leadership references.

## Insights section requirements

Show 3 featured content cards from Data Biz.

Each card should have:
- Title.
- One-line angle.
- Link label.

Suggested pieces:
- KPI Trees.
- Stop Calling Everything P0.
- Dashboarding SOP.

## Final CTA requirements

The site should end with one sharp commercial prompt.

Preferred CTA:
- Book a discovery call.

Supporting line should sound direct, not salesy.

## Conversion design

### Primary conversion
- Discovery call click.

### Secondary conversions
- Contact click.
- Substack click.
- Scroll past offers.
- Insight card click.

## Analytics events to wire

- click_header_cta
- click_hero_primary_cta
- click_hero_secondary_cta
- click_offer_1_cta
- click_offer_2_cta
- click_offer_3_cta
- click_substack_link
- click_linkedin_link
- view_calendly
- submit_contact
- scroll_50
- scroll_75
- scroll_100

## Copy style

The tone should be:
- Blunt.
- Practical.
- Senior.
- Calm.
- Peer-to-peer.

Avoid words like:
- empower
- unlock
- revolutionize
- journey
- cutting-edge
- seamless
- world-class
- innovative solutions

## UX principles

- One main action per section.
- Fast scanability.
- Obvious hierarchy.
- Short paragraphs.
- No clutter.
- Mobile-first.
- CTA should stay easy to find.

## Content constraints

- Avoid long essay-style blocks.
- Keep body copy tight.
- Let whitespace do the work.
- Make every section easy to rewrite later.

## Suggested tech approach

- Static HTML file.
- Embedded CSS and small JS or separated minimal files.
- Use clean semantic HTML.
- Use responsive layout with CSS grid/flex.
- Add light animation only if it improves perceived polish.

## Deliverable expectation

The first coded version should already be presentable enough to share privately with trusted peers for feedback.

It does not need backend logic.
It does need:
- Real copy.
- Real section structure.
- Real CTA destinations as placeholders if necessary.
- A design direction that feels deliberate.

## Nice-to-have extras

- Theme toggle.
- Small inline SVG logo.
- Highlighted quote or principle line.
- Sticky CTA on mobile.
- Lightweight comparison table for offers.

## Final test

Before considering the POC done, a reviewer should be able to answer yes to these:
- Do I understand what Data Biz does quickly?
- Does this feel senior and credible?
- Do the offers sound tangible?
- Is the CTA obvious?
- Would an executive or data leader take this seriously?
