# Style Tag Reduction Opportunities

## High Priority - 100% Identical Duplicates

### 1. Interview Pages - Table of Contents Grid (4 pages)
**Files:** `interviewHS.html`, `interviewNK.html`, `interviewRY.html`, `interviewYO.html`
**Lines:** ~50-60 lines per file
**Status:** 100% identical across all 4 pages
**Action:** Move to `css/interview-common.css` or `common.css` with `.interview-page` class selector

**Styles to centralize:**
- `.table-of-contents-grid` base styles (width: 1200px)
- Responsive breakpoints (1400px, 1200px, 1024px, 768px)
- Grid layout adjustments for mobile

---

### 2. Interview Pages - Anchor Link Scroll Margins (4 pages)
**Files:** `interviewHS.html`, `interviewNK.html`, `interviewRY.html`, `interviewYO.html`
**Lines:** ~40-50 lines per file
**Status:** 100% identical across all 4 pages
**Action:** Move to `css/interview-common.css`

**Styles to centralize:**
- `#section-1` through `#section-5` scroll-margin-top
- Mobile responsive adjustments
- `.section-1-mobile-title` and `.section-3-mobile-title` scroll-margin

---

### 3. Interview Pages - Profile Card Styles (4 pages)
**Files:** `interviewHS.html`, `interviewNK.html`, `interviewRY.html`, `interviewYO.html`
**Lines:** ~70-80 lines per file
**Status:** 100% identical across all 4 pages
**Action:** Move to `css/interview-common.css`

**Styles to centralize:**
- `.profile-card` desktop base styles
- `.profile-card ul` and `.profile-card ul li` styles
- Responsive breakpoints (1200px, 1150px, 900px)

---

### 4. Interview Pages - Pankuzu Clickable Styles (4 pages)
**Files:** `interviewHS.html`, `interviewNK.html`, `interviewRY.html`, `interviewYO.html`
**Lines:** ~30-40 lines per file
**Status:** 100% identical across all 4 pages
**Action:** Move to `css/interview-common.css`

**Styles to centralize:**
- `.pankuzu` position and z-index
- `.pankuzu span` and `.pankuzu span a` clickable styles
- Mobile hover/color overrides

---

### 5. Interview Pages + Index - Breadcrumb Legacy Styles (5 pages)
**Files:** `index.html`, `interviewHS.html`, `interviewNK.html`, `interviewRY.html`, `interviewYO.html`
**Lines:** ~20-25 lines per file
**Status:** 100% identical across all 5 pages
**Action:** Move to `css/common.css` (already partially there, but inline overrides exist)

**Styles to centralize:**
- `body.breadcrumb-legacy .pankuzu` width, margin, padding
- Mobile responsive overrides (750px breakpoint)

---

## Medium Priority - Highly Similar Patterns

### 6. Center Carousel Base Styles (Multiple pages)
**Files:** `service.html`, `company.html` (and possibly others)
**Lines:** ~120-150 lines per file
**Status:** Very similar, with minor page-specific differences
**Action:** Extract base styles to `common.css`, keep page-specific overrides inline

**Styles to centralize:**
- `.center-carousel-section` base layout
- `.center-carousel-bg` background styles
- `.center-carousel-inner` container styles
- `.center-carousel-head`, `.center-carousel-title-bg`, `.center-carousel-title-text`
- `.center-carousel-frame`, `.center-carousel-track`, `.center-carousel-item`
- `.center-card` base styles
- `.center-carousel-btn` base styles (prev/next)

**Keep page-specific:**
- Responsive breakpoint adjustments
- Page-specific image URLs
- Unique spacing/margin overrides

---

### 7. Title Border Styles (Multiple pages)
**Files:** `service.html`, `company.html`, `fukuri.html` (and possibly others)
**Lines:** ~15-20 lines per file
**Status:** Very similar, with minor variations (width: auto vs width: 300px)
**Action:** Extract base styles to `common.css`, keep page-specific width overrides

**Styles to centralize:**
- `.title-border` text-align: center
- `.title-border .title` base styles (height, font, margin, display)
- Common responsive adjustments

**Keep page-specific:**
- Width variations (auto vs 300px)
- Page-specific responsive overrides

---

## Low Priority - Cleanup Opportunities

### 8. Empty Style Tags
**Files:** `business.html`, `index.html`
**Status:** Empty `<style></style>` tags with no content
**Action:** Remove completely

---

### 9. Hamburger Menu Styles (Multiple pages)
**Files:** All pages appear to have hamburger menu styles
**Status:** Need to verify if identical or have variations
**Action:** If identical, move to `common.css` (may already be there)

---

## Estimated Impact

### High Priority Items:
- **Interview TOC Grid:** ~200 lines removed (50 lines × 4 pages)
- **Interview Anchor Links:** ~160 lines removed (40 lines × 4 pages)
- **Interview Profile Cards:** ~280 lines removed (70 lines × 4 pages)
- **Interview Pankuzu Clickable:** ~120 lines removed (30 lines × 4 pages)
- **Breadcrumb Legacy:** ~100 lines removed (20 lines × 5 pages)

**Total High Priority:** ~860 lines of duplicate CSS removed

### Medium Priority Items:
- **Center Carousel:** ~200-300 lines could be centralized (with overrides kept)
- **Title Border:** ~40-60 lines could be centralized (with overrides kept)

**Total Medium Priority:** ~240-360 lines could be centralized

### Low Priority Items:
- **Empty Tags:** 2-4 empty style tags removed

---

## Implementation Strategy

1. **Create `css/interview-common.css`** (if not exists) for interview-specific shared styles
2. **Start with High Priority items** - these are 100% identical and safe to centralize
3. **Verify visually** after each centralization step
4. **Keep page-specific overrides** in inline styles when needed
5. **Remove empty style tags** as cleanup

---

## Notes

- All centralization should preserve visual appearance
- Use `!important` sparingly and only when necessary to override existing styles
- Maintain cascade order: base CSS → common.css → interview-common.css → page-specific overrides
- Test on both desktop and mobile after each change
