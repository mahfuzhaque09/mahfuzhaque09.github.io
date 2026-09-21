# Md. Mahfuz Haque — Academic & Geospatial Portfolio

[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-brightgreen?logo=github)](https://pages.github.com/)
[![Built with HTML5/CSS3/JS](https://img.shields.io/badge/Stack-Vanilla%20HTML5%20%7C%20CSS3%20%7C%20JS-blue)](https://developer.mozilla.org/)
[![ORCID](https://img.shields.io/badge/ORCID-0009--0005--6419--5163-A6CE39?logo=orcid&logoColor=white)](https://orcid.org/0009-0005-6419-5163)
[![ResearchGate](https://img.shields.io/badge/ResearchGate-Md--Haque--416-00CCBB?logo=researchgate&logoColor=white)](https://www.researchgate.net/profile/Md-Haque-416?ev=prf_overview)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)]()

A sleek, modern personal academic and research portfolio website for **Md. Mahfuz Haque** (Urban & Regional Planner, Geospatial Data Scientist, and Machine Learning Researcher).

Built with semantic HTML5, modern CSS design tokens (with dark/light theme toggle, glassmorphism, responsive grid), and vanilla JavaScript (interactive spatial constellation canvas background, dynamic publication filtering, 20-certificate interactive modal gallery, 25-figure spatial analytics slideshow, career timeline tabs, APA citation copier, and animated counters).

---

## 🚀 Step-by-Step Guide to Host on GitHub Pages

This website is engineered for **zero-friction, static GitHub Pages hosting**. There is no build step or node package manager required (`npm run build` is not needed); GitHub Pages serves the site directly out of the box!

### Step 1: Create a GitHub Repository

1. Log in to your account at [GitHub.com](https://github.com/).
2. Click the **`+`** icon in the upper-right corner and select **New repository**.
3. Choose your repository name:
   - **Method A (Personal Domain URL - Recommended)**:  
     Name the repository `<your-username>.github.io` (for example: `mahfuzhaque.github.io`).  
     *Your site will be hosted directly at `https://<your-username>.github.io/`.*
   - **Method B (Project Repository)**:  
     Name the repository `portfolio` (or any name you prefer).  
     *Your site will be hosted at `https://<your-username>.github.io/portfolio/`.*
4. Set Visibility to **Public**.
5. Do **NOT** check "Add a README file" or "Add .gitignore" (these are already configured in this folder).
6. Click **Create repository**.

---

### Step 2: Push Your Code from Your Computer

Open **PowerShell** or **Terminal** inside this project folder (`moin portfolio`) and run the following commands:

```bash
# 1. Initialize git repository (if not already done)
git init

# 2. Stage all files
git add .

# 3. Create your initial commit
git commit -m "Initial commit: Academic & Geospatial Portfolio"

# 4. Set default branch to main
git branch -M main

# 5. Link your local project to your GitHub repository
# (Replace <your-username> and <repo-name> with your actual GitHub username and repository name)
git remote add origin https://github.com/<your-username>/<repo-name>.git

# 6. Push code to GitHub
git push -u origin main
```

---

### Step 3: Enable GitHub Pages

- **If you chose Method A (`<your-username>.github.io`)**:  
  GitHub Pages is activated automatically upon your first push! Your website will be live in 1–2 minutes.

- **If you chose Method B (Project Repository)**:  
  1. Open your repository on [GitHub](https://github.com/).
  2. Click **Settings** (tab along the top navigation).
  3. In the left sidebar, under the *Code and automation* section, click **Pages**.
  4. Under **Build and deployment** → **Source**, ensure **Deploy from a branch** is selected.
  5. Under **Branch**, select `main` and keep the folder as `/ (root)`.
  6. Click **Save**.
  7. Wait 60–90 seconds. Refresh the page, and GitHub will display your live site link:  
     `Your site is live at https://<your-username>.github.io/<repo-name>/`

---

## 📂 Project Structure

```text
moin portfolio/
├── .gitignore                          # Ignores OS metadata, python caches, and logs
├── .nojekyll                           # Bypasses Jekyll processing on GitHub Pages
├── AGENTS.md                           # Development and maintenance guidelines
├── README.md                           # Documentation and deployment manual
├── index.html                          # Main single-page application structure
├── Md_Mahfuz_Haque_CV.pdf              # Academic CV linked for direct download
├── Md_Mahfuz_Haque_All_Certificates.pdf # 21-page combined certificates document
│
├── css/
│   └── style.css                       # Design tokens, dark/light themes, animations
│
├── js/
│   └── main.js                         # Constellation canvas, modal logic, slideshow, filters
│
├── images/
│   ├── profile.jpg                     # High-res profile photograph
│   ├── favicon.png                     # Browser favicon (PNG)
│   ├── gallery-1.jpg ... gallery-9.jpg # Academic, fieldwork, and presentation photos
│   ├── certificates/                   # 20 optimized certificates for the interactive gallery
│   └── graphs/                         # 25 spatial research figures, maps & thumbnails
│
├── Certificates/                       # 11 individual official certificate PDFs for preview
│   ├── cert-ra-uswatun-khushi.pdf
│   ├── cert-ta-ra-sadik-shuvo.pdf
│   ├── cert-cpted-research-fair.pdf
│   ├── cert-gis-workshop-jkkniu.pdf
│   ├── cert-stata-jkkniu.pdf
│   ├── cert-climate-justice.pdf
│   ├── cert-janata-bank-merit.pdf
│   ├── HSC_Certificate_Md_Mahfuz_Haque.pdf
│   ├── SSC_Certificate_Md_Mahfuz_Haque.pdf
│   ├── JSC_Certificate_Md_Mahfuz_Haque.pdf
│   └── PSC_Certificate_Md_Mahfuz_Haque.pdf
│
├── crest/                              # Academic medals and achievement crest images
│   ├── doctors-academy-torongo-ict-crest.jpeg
│   ├── psc-achievement-medal-combined.jpeg
│   ├── cambrian-ssc-medal-combined.jpeg
│   └── mymensingh-city-medal-combined.jpeg
│
├── scripts/
│   └── build_certificates_pdf.py       # Python script to re-generate the combined certificates PDF
│
└── raw_sources/                        # Archive of original uncompressed scans & source files
    ├── certificates/
    ├── crest/
    ├── graphs_and_diagrams/
    └── images/
```

---

## ✨ Key Portfolio Features

- **Constellation Canvas Background**: Dynamic HTML5 Canvas rendering interactive spatial graph nodes connecting upon mouse proximity.
- **Theme Switcher**: Obsidian dark mode default with seamless light mode toggle; saves user choice in `localStorage`.
- **25-Figure Spatial Slideshow**: Auto-advancing visual gallery showcasing traffic volume splits, GIS study area boundaries, CPTED analyses, and spatial heatmaps.
- **Interactive Certificate Modal Gallery**: 20 synchronized credentials with category filtering, full-size image modal, and direct PDF downloads.
- **Academic Citation Generator**: One-click APA format citation copy button with toast notifications for peer-reviewed papers.
- **Zero External Runtime Dependencies**: Pure standard HTML5/CSS3/JavaScript ensuring high performance, zero build complexity, and maximum longevity.

---

## 🛠️ Local Development & Preview

To run the site locally on your computer:
1. Double-click [index.html](index.html) to open it directly in any web browser, OR
2. Use Python's built-in local server:
   ```bash
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000/`.
