# Single Source of Truth Definition

## Purpose
This document defines the single source of truth for shared UI components across all pages in the recruit-clean site. The goal is to ensure visual and structural consistency across all pages.

## Source of Truth
**Directory:** `/recruit-clean/`  
**Final Delivery Site:** `https://recruit-clean.vercel.app/`  
**Test Site (for comparison):** `https://sogo-kappa.vercel.app/`

The **recruit-clean** directory represents the FINAL design state to be delivered. This is our single source of truth.

**Status:** ✅ **STANDARDIZED** - All pages now match the test site specifications and are consistent with each other.

## Shared Components to Standardize

### 1. Header Component
The header appears on all pages and must be consistent. It includes:
- Logo
- "採用サイト" text
- Navigation menu items
- Entry button

**Current Status:** Variations found in header styling

### 2. Hamburger Menu (Mobile Navigation)
The hamburger menu appears on mobile/tablet views (typically below 1100px breakpoint).

**Current Status:** Needs verification

### 3. Entry Button
The Entry button appears in the header on all pages.

**Current Status:** Variations found in positioning and styling

### 4. Footer Component
The footer appears on all pages.

**Current Status:** Needs verification

### 5. Join Us Banner (if applicable)
Any "Join Us" or recruitment banner that appears across pages.

**Current Status:** Needs verification

## Identified Variations (Preliminary Analysis)

Based on initial examination, the following variations have been found:

### Header Padding
- **index.html**: `padding: 5px 0 !important;`
- **company.html**: `padding: 0 !important;`
- **business.html**: `padding: 5px 0 !important;`
- **fukuri.html**: `padding: 0 !important;`
- **service.html**: `padding: 0 !important;`

### Nav Alignment
- **index.html**: `.nav { align-items: center !important; }`
- **company.html**: `.nav { align-items: stretch !important; }`
- **business.html**: `.nav { align-items: center !important; }`
- **fukuri.html**: `.nav { align-items: stretch !important; }`
- **service.html**: `.nav { align-items: stretch !important; }`

### Entry Button Styling
- Variations in height, margin, and positioning adjustments

## Standardized Styles (Final State)

All pages now use the following consistent styles:

### Header
- **Padding**: `padding: 0 !important;` (no top/bottom padding)

### Navigation (.nav)
- **Display**: `display: flex;`
- **Alignment**: `align-items: center !important;`
- **Height**: `height: 100%;`
- **Min-height**: `min-height: 60px !important;`

### Navigation Items (.nav li)
- **Display**: `display: flex !important;`
- **Alignment**: `align-items: center !important;`
- **Height**: `height: 100%;`
- **Margin**: `margin-right: 30px;`

### Entry Button (.nav li:last-child)
- **Display**: `display: flex !important;`
- **Alignment**: `align-items: stretch !important;`
- **Height**: `height: 100% !important;`
- **Margin**: `margin-right: 0 !important;`

### Entry Rectangle (.entry-rectangle)
- **Display**: `display: flex !important;`
- **Alignment**: `align-items: center !important;`
- **Justify**: `justify-content: center !important;` (centers text and icon)
- **Height**: `height: 100% !important;`
- **Width**: `width: 100% !important;`
- **Min-height**: `min-height: 60px !important;`
- **Padding**: `padding: 0 20px !important;`

## Completion Status

1. ✅ **Define Source of Truth** - COMPLETED
2. ✅ **Identify All Variations** - COMPLETED
3. ✅ **Determine Correct Design** - Based on test site (sogo-kappa.vercel.app)
4. ✅ **Standardize All Pages** - COMPLETED (all 10 pages)
5. ✅ **Verify Consistency** - COMPLETED (all pages match)

## Pages to Standardize

- index.html
- company.html
- business.html
- service.html
- fukuri.html
- recruit.html
- interviewHS.html
- interviewNK.html
- interviewRY.html
- interviewYO.html

**Total: 10 HTML files**
