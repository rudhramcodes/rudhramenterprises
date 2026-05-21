# Rudhram Enterprises Design System

## 1. Design Direction

The Rudhram website should feel like a premium corporate editorial experience: spacious, sharp, cinematic, and calm. It should carry the symbolic strength of the trishul mark without becoming religiously ornamental. The experience must feel rooted in culture and precision while still being modern and future-facing.

Design keywords:

- Awwwards-level
- Clean corporate
- Premium editorial
- Bronze on ivory
- Culture plus innovation
- Sharp geometry
- Quiet authority
- Cinematic motion

## 2. Brand Principles

### Inspiring

The interface should create emotional lift through scale, negative space, and strong language.

### Innovative

The interface should feel technically current through motion, responsive layouts, kinetic typography, and interactive storytelling.

### Impeccable

Every detail should feel resolved: spacing, alignment, hover states, typography, contrast, and scroll behavior.

## 3. Logo Usage

Primary logo:

- Use full wordmark in header, footer, and formal brand moments.
- Use mark-only symbol for favicon, loader, watermark, section anchors, and motion reveals.

Clear space:

- Maintain at least the width of the central vertical stroke around the logo.

Minimum sizes:

- Full logo: 128px wide.
- Mark only: 28px wide.
- Favicon: provided `fav-icon.png`.

Do:

- Use logo in `#B37839` on ivory, white, or deep ink.
- Give the mark room to breathe.
- Use the mark as a precise alignment object.

Do not:

- Add drop shadows to the logo.
- Put logo over busy imagery.
- Recolor the logo into generic gold gradients.
- Stretch, outline, bevel, or rotate the logo.

## 4. Color System

Brand color sampled from attached logo:

- Rudhram Bronze: `#B37839`

The palette should be built around bronze, warm neutrals, and deep ink. Avoid generic blue corporate palettes and avoid purple/pink AI gradients.

### Core Tokens

| Token | Hex | Usage |
|---|---:|---|
| `--color-bronze-600` | `#B37839` | Primary brand color, logo, key CTAs |
| `--color-bronze-700` | `#8F5F2E` | Hover state, active state |
| `--color-bronze-500` | `#C68A49` | Highlights, rule lines |
| `--color-bronze-200` | `#E8C99F` | Soft accents, icon backgrounds |
| `--color-bronze-100` | `#F5E7D4` | Subtle surfaces |
| `--color-ink-950` | `#11100E` | Primary text, dark backgrounds |
| `--color-ink-800` | `#2A2621` | Secondary dark text |
| `--color-stone-700` | `#615A51` | Body copy |
| `--color-stone-400` | `#A79D91` | Muted text, dividers |
| `--color-stone-150` | `#E8E2D8` | Borders |
| `--color-ivory-50` | `#F8F4ED` | Primary background |
| `--color-paper` | `#FFFDF8` | Cards, form fields |
| `--color-success` | `#2F6D4F` | Success states |
| `--color-error` | `#A33A2B` | Error states |

### Recommended Use

Light mode:

- Background: `#F8F4ED`
- Text: `#11100E`
- Muted text: `#615A51`
- Accent: `#B37839`
- Borders: `#E8E2D8`

Dark mode:

- Background: `#11100E`
- Text: `#FFFDF8`
- Muted text: `#C9BFB2`
- Accent: `#C68A49`
- Borders: `rgba(255,253,248,0.14)`

### Color Ratios

- Body text should use ink on ivory or paper.
- Bronze text on ivory is best for large text, labels, dividers, and icons.
- For small CTA text, use ivory text on bronze or ink text on bronze-100.

## 5. Typography

User-requested fonts:

- Display and headings: Golden Book.
- Body and interface: Geomanist.

Font note:

- Geomanist is loaded from jsDelivr: `https://cdn.jsdelivr.net/npm/geomanist@0.0.3/geomanist.css`.
- Goldenbook is loaded locally from `public/fonts/` using the available Light, Regular, and Bold OTF files.
- Available Goldenbook weights: 300 Light, 400 Regular, 700 Bold.

### Font Stack

```css
@import url("https://cdn.jsdelivr.net/npm/geomanist@0.0.3/geomanist.css");

@font-face {
  font-family: "Goldenbook";
  src: url("/fonts/Goldenbook Light.otf") format("opentype");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Goldenbook";
  src: url("/fonts/Goldenbook Regular.otf") format("opentype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Goldenbook";
  src: url("/fonts/Goldenbook Bold.otf") format("opentype");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

:root {
  --font-display: "Goldenbook", "Golden Book", Georgia, serif;
  --font-body: "geomanist", "Geomanist", "Inter", "Helvetica Neue", Arial, sans-serif;
}
```

### Type Scale

| Role | Desktop | Mobile | Weight | Line Height |
|---|---:|---:|---:|---:|
| Hero | 96-132px | 52-68px | 400 | 0.9-0.96 |
| H1 | 72-96px | 44-56px | 400 | 0.95 |
| H2 | 48-64px | 34-42px | 400 | 1.0 |
| H3 | 30-40px | 24-30px | 450 | 1.1 |
| Eyebrow | 11-13px | 11px | 600 | 1.2 |
| Body large | 20-24px | 18-20px | 350 | 1.5 |
| Body | 16-18px | 16px | 350 | 1.55 |
| Caption | 12-14px | 12px | 400 | 1.4 |

### Typography Rules

- Headlines should be elegant and spacious, with no negative letter spacing.
- Eyebrows can use uppercase Geomanist with 0.08em to 0.12em letter spacing.
- Body copy should remain highly readable and never smaller than 16px.
- Use Golden Book for manifesto moments, leadership names, and high-emotion statements.
- Use Geomanist for navigation, forms, buttons, captions, and longer body copy.

## 6. Spacing and Grid

### Grid

Desktop:

- 12-column grid.
- Max content width: 1440px.
- Outer margin: 48-72px.
- Gutter: 24px.

Tablet:

- 8-column grid.
- Outer margin: 32px.
- Gutter: 20px.

Mobile:

- 4-column grid.
- Outer margin: 20px.
- Gutter: 16px.

### Spacing Scale

| Token | Value |
|---|---:|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |
| `--space-6` | 32px |
| `--space-7` | 48px |
| `--space-8` | 64px |
| `--space-9` | 96px |
| `--space-10` | 128px |
| `--space-11` | 160px |

### Section Rhythm

- Hero: 92-100vh, with next section peeking.
- Standard section: 96-160px vertical padding.
- Dense section: 64-96px vertical padding.
- Footer: 80-120px vertical padding.

## 7. Layout System

### Hero Layout

- Full-width immersive editorial layout.
- Logo or trishul mark can sit as a vertical anchor.
- Headline should dominate, not sit inside a card.
- Use a subtle grid or bronze rule line to create structure.
- Keep at least 10% of the next section visible when possible.

### Manifesto Layout

- One large text column plus one supporting symbol/image.
- Use line breaks intentionally.
- Avoid paragraph walls.

### Pillar Layout

- Three responsive panels.
- Each panel contains word, short meaning, value, and interaction state.
- Border radius: 0-8px maximum.
- Bronze hairline borders, no heavy shadows.

### Ecosystem Layout

- Use a signature "Venture Constellation" layout for the seven Rudhram ventures.
- Desktop: Rudhram mark or wordmark sits as the central anchor while venture names arrange around it in a precise radial, orbital, or stepped editorial composition.
- Scroll transforms the constellation into a sequence of seven full-width venture chapters.
- Mobile: use stacked venture chapters with a sticky mini-index and smooth active-state changes.
- Each venture gets a strong name, one-line teaser, visual motif, motion cue, and CTA.
- Keep every venture visually distinct while using bronze, ink, ivory, and stone as the shared system.

### Venture System

Ventures:

- Panigrahna
- Aghhori
- House of Joggi
- Damrru
- Tandavs
- Kapaalik
- Kalyannam

Visual motifs:

- Panigrahna: ceremonial linework, paired forms, soft ivory light, graceful reveal.
- Aghhori: raw ink textures, sharp crops, high-contrast bronze strikes, fearless cuts.
- House of Joggi: crafted layout, textile-like rhythm, warm human spacing, editorial grids.
- Damrru: rhythmic waveforms, circular pulses, percussion-inspired sequencing.
- Tandavs: kinetic vertical movement, dramatic scale, choreographed section shifts.
- Kapaalik: mystic minimal geometry, dark surfaces, precise metallic details.
- Kalyannam: auspicious patterns, refined celebration energy, elegant layered transitions.

Venture chapter structure:

- Venture name in Golden Book.
- One-line teaser in Geomanist.
- Related pillar: Inspiring, Innovative, or Impeccable.
- Visual motif area with texture, image, or kinetic type.
- CTA: "Explore [Venture Name]" or "Enquire About [Venture Name]".

Venture navigation:

- Desktop can use a fixed side index with seven names.
- Active name uses bronze text and a drawn line indicator.
- Inactive names remain stone-muted.
- Mobile uses a horizontal sticky index with snap scrolling.

### Leadership Layout

- Editorial grid.
- Primary leadership can use larger cards.
- Secondary leadership can use compact text cards.
- Profile detail opens in a drawer or modal.

### Impact Layout

- Quiet, high-trust treatment.
- Use data statement for 3% commitment.
- Avoid overusing charity-style imagery.

## 8. Components

### Buttons

Primary:

- Bronze background.
- Ivory text.
- 1px bronze border.
- Hover: background shifts to `#8F5F2E`, arrow moves 4px.
- Press: translateY(1px).

Secondary:

- Transparent background.
- Ink text.
- Bronze border.
- Hover: bronze-100 fill.

Text CTA:

- Inline bronze underline.
- Underline animates left to right on hover.

### Navigation

Desktop:

- Transparent over hero or ivory surface after scroll.
- Logo left, nav center or right, CTA right.
- Active section indicated with a thin bronze line.

Mobile:

- Full-screen overlay.
- Large Golden Book nav labels.
- Bottom contact CTA.
- Close button must be obvious and keyboard accessible.

### Cards

- Use cards for repeated items only.
- Radius: 0-8px.
- Border: 1px solid stone-150.
- Background: paper or transparent.
- Hover: slight y movement, bronze border, internal reveal.

### Forms

- Fields should feel formal and quiet.
- Labels always visible.
- Inputs use paper background and bronze focus border.
- Error text in `#A33A2B`.
- Success state should include concise acknowledgement.

### Tabs

- Use tabs only if the full Venture Constellation is too heavy for a specific page.
- Active tab has bronze underline and ink text.
- Inactive tab uses muted stone.
- Transition content with opacity and 8-12px y movement.

### Modal and Drawer

- Use for leadership profiles.
- Background overlay: `rgba(17,16,14,0.48)`.
- Panel background: paper.
- Focus trap required.

## 9. Motion System

Motion should express alignment, reveal, and forward movement. It must be premium and purposeful, not busy.

### Timing Tokens

| Token | Value | Usage |
|---|---:|---|
| `--motion-fast` | 160ms | Hover, focus, icon movement |
| `--motion-base` | 240ms | Button and card states |
| `--motion-medium` | 420ms | Tabs, drawers, content reveal |
| `--motion-slow` | 720ms | Section reveals |
| `--motion-hero` | 1100ms | Hero logo or headline reveal |

### Easing Tokens

```css
:root {
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-premium: cubic-bezier(0.19, 1, 0.22, 1);
}
```

### Required Interactions

- Hero logo reveal: mark segments appear upward with slight mask reveal.
- Headline reveal: staggered line reveal with overflow hidden.
- Nav hover: bronze underline grows from current text start.
- Button hover: arrow or icon translates 4px, background changes in 180-240ms.
- Pillar card hover: title remains fixed, insight layer fades upward.
- Venture constellation: bronze connector lines draw from the Rudhram mark as each venture enters.
- Venture chapter transition: active venture scales from 0.98 to 1, opacity 0 to 1, y 28px to 0.
- Venture name hover: letters subtly spread by 0.02em maximum and bronze underline draws beneath the baseline.
- Venture motif hover: texture or image shifts by 2-4% using transform only.
- Leadership cards: portrait or initials slightly scale, role text sharpens.
- Form focus: bronze border and subtle background shift.
- Scroll reveal: opacity 0 to 1, y 24px to 0.

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 10. Visual Assets

Preferred assets:

- Real leadership portraits.
- Real office, production, event, community, or behind-the-scenes images.
- High-quality close-up textures: bronze, paper, stone, shadow, architecture.
- Abstract visuals may be used only when they are custom and brand-specific.

Avoid:

- Generic handshake stock images.
- Dark blurred corporate photos.
- Neon gradients.
- Decorative orb backgrounds.
- Random 3D shapes unrelated to the brand.

## 11. Iconography

Icon style:

- Thin geometric line icons.
- 1.5px stroke.
- Rounded joins acceptable, but keep forms sharp and disciplined.
- Bronze or ink only.

Use icons for:

- CTAs.
- Contact methods.
- Venture categories.
- Form states.
- Navigation utility actions.

Do not use emojis as icons.

## 12. Imagery and Art Direction

Image treatment:

- High contrast but not crushed.
- Warm highlights.
- Slight grain acceptable.
- Crop with clear subjects and generous negative space.

Overlay:

- Use ink overlays at 8-24% only when text needs contrast.
- Do not over-darken images.

Composition:

- Use strong verticals and center lines inspired by the trishul.
- Use bronze hairlines for precision.
- Let images align to the grid rather than floating randomly.

## 13. Page Transitions

Recommended:

- Fade and slight upward movement between routes.
- Keep transition under 700ms.
- Header remains stable.
- Avoid full-screen loaders after initial page load.

Initial loader:

- Mark-only reveal.
- 800-1200ms maximum.
- Use only if assets require loading.

## 14. Responsive Rules

Mobile:

- Hero headline max 3-5 lines.
- Pillar cards become stacked accordions.
- Venture tabs become segmented scroll or accordion.
- Header becomes compact with full-screen menu.
- Avoid hover-only functionality.

Tablet:

- Preserve editorial rhythm.
- Use 2-column grids where readable.

Desktop:

- Use large negative space.
- Add subtle motion and cursor-aware interactions only when useful.

Wide desktop:

- Keep max text measures controlled.
- Do not stretch paragraphs beyond 720px.

## 15. Accessibility Standards

- Minimum body text: 16px.
- Contrast minimum: 4.5:1 for normal text.
- Focus state: 2px bronze ring plus offset.
- Keyboard support for nav, tabs, accordions, drawers, and form.
- Alt text for meaningful images.
- Reduced motion support.
- No information conveyed by color alone.

## 16. CSS Token Starter

```css
:root {
  --color-bronze-600: #B37839;
  --color-bronze-700: #8F5F2E;
  --color-bronze-500: #C68A49;
  --color-bronze-200: #E8C99F;
  --color-bronze-100: #F5E7D4;
  --color-ink-950: #11100E;
  --color-ink-800: #2A2621;
  --color-stone-700: #615A51;
  --color-stone-400: #A79D91;
  --color-stone-150: #E8E2D8;
  --color-ivory-50: #F8F4ED;
  --color-paper: #FFFDF8;
  --color-success: #2F6D4F;
  --color-error: #A33A2B;

  --font-display: "Goldenbook", "Golden Book", Georgia, serif;
  --font-body: "geomanist", "Geomanist", "Inter", "Helvetica Neue", Arial, sans-serif;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-premium: cubic-bezier(0.19, 1, 0.22, 1);

  --motion-fast: 160ms;
  --motion-base: 240ms;
  --motion-medium: 420ms;
  --motion-slow: 720ms;
  --motion-hero: 1100ms;
}
```

## 17. Implementation Notes

- Use CSS variables as the single source of truth.
- Geomanist currently loads from jsDelivr.
- Goldenbook currently loads from local OTF files in `public/fonts/`.
- Use React components for reusable sections: `Hero`, `Pillars`, `EcosystemTabs`, `LeadershipGrid`, `ImpactStatement`, `ContactForm`.
- Use Intersection Observer for scroll reveals.
- Animate only `transform` and `opacity`.
- Keep layout stable by defining image aspect ratios.
- Test at 375px, 768px, 1024px, 1440px.

## 18. Quality Bar

Before launch, the site should pass:

- No starter-template content.
- No generic stock corporate feeling.
- No text overflow on mobile.
- No hover-only critical actions.
- No motion without reduced-motion fallback.
- No low contrast bronze body text.
- No nested card layouts.
- No overloaded sections.
- Lighthouse Accessibility 95+.
- Visual QA on mobile and desktop.
