# SevaSetu – National E-Governance Portal
### YUVA Intern Week 3 Front-End Web Development Project

A modern, responsive, and accessible Indian E-Governance citizen portal built using pure **HTML5, CSS3, and Vanilla JavaScript**.

---

## 📁 Project Structure

```
SevaSetu/
├── index.html                   # Home Page (Hero, Stats, Search, Featured Services & Schemes)
├── services.html                # All 8 Services Directory with Category Filters
├── schemes.html                 # 6 Central Flagship Schemes with Details Drawer
├── about.html                   # Mission, Vision, 4 Core Pillars, Citizen Flow
├── contact.html                 # Helpdesk, Interactive Grievance Form & FAQs
├── css/
│   └── style.css                # Pure CSS3 Design System & Responsive Tokens
├── js/
│   └── script.js                # Pure Vanilla JS Engine (Hamburger, Modals, Validation, Search, Toast)
├── assets/
│   └── images/
│       ├── logo.svg             # SevaSetu Tricolor Emblem Vector Logo
│       └── hero-illustration.svg# E-Governance Portal Vector Art
├── YUVA_Intern_Week3_Report.md  # Comprehensive YUVA Intern 14-Section Submission Report
└── README.md                    # Project Guide & How-to-Run
```

---

## 🌟 Interactive Components Implemented

1. **Interactive Component 1 – Hamburger Navigation**:
   - Mobile-responsive navigation drawer.
   - Smooth slide-in/out transition with backdrop overlay blur.
   - Auto-closes on navigation link click, backdrop click, or `Escape` key press.

2. **Interactive Component 2 – Service Application Modal**:
   - Opens on "Apply Now" with pre-selected service.
   - Client-side validation: Full Name (min 3 chars), valid email regex, exact 10-digit Indian mobile number (`^[6-9]\d{9}$`), service selection, and declaration checkbox.
   - Generates unique Application ID (`SS-2026-XXXXX`).
   - Displays animated success state + floating Toast notification.
   - Closes via Close button (X), Cancel, backdrop click, or `Escape` key.

3. **Interactive Component 3 – Dynamic Search & Category Filter**:
   - Real-time search across service names, scheme titles, descriptions, and ministries.
   - Filter chips for Identity, Revenue Certificates, Welfare, and Education.
   - Live result count indicator.
   - Custom zero-state fallback: **"No services or schemes found."** with instant Reset button.

---

## 🚀 How to Run Locally

### Option 1: Double-Click (Any Browser)
Simply double click `index.html` in your file explorer to open it in Chrome, Edge, Firefox, or Safari.

### Option 2: Using VS Code Live Server
1. Open the `SevaSetu` folder in **VS Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click on `index.html` and select **"Open with Live Server"**.
4. The site will run at `http://127.0.0.1:5500/index.html`.

### Option 3: Using Python Local Server
Open your terminal in the `SevaSetu` folder and run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

### Option 4: Using Node.js
```bash
npx serve .
```

---

## 📸 Recommended Screenshots for YUVA Intern Report

1. **Home Page Hero & Stats Section**: Demonstrates the overall Indian E-Governance design, tricolor branding, and statistics bar.
2. **Dynamic Search & Category Filter in Action**: Show typing a search query (e.g. "Kisan" or "Aadhaar") and category filtering.
3. **Empty Search State**: Show the "No services or schemes found." zero-state banner.
4. **Service Application Modal with Validation**: Show the error state (red highlights) when empty or invalid phone is entered.
5. **Application Success State**: Show the green checkmark card with generated Application ID (`SS-2026-XXXXX`) and Toast notification.
6. **Government Schemes "Learn More" Modal**: Demonstrates detailed benefits, eligibility, and required documents.
7. **Mobile View & Hamburger Navigation**: Capture responsive mobile view (375px/414px) with the slide-out navigation menu open.
8. **Contact & FAQ Accordion**: Demonstrates the grievance form and interactive expandable FAQs.

---
*Built with ❤️ for Digital India & YUVA Internship.*
