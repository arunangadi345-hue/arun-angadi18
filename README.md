# Arun Angadi  — Modern Developer Portfolio

A modern, high-performance, and responsive personal portfolio website crafted for **Arun Manjunath**, Computer Science Engineering Student and Aspiring Software Engineer.

---

## 🌟 Key Features

- **Cyber-Minimal Dark Theme**: High-contrast, dark aesthetic (`#07090e`) with radiant cyan, indigo, and violet gradient accents and glassmorphism.
- **Interactive Ambient Canvas**: Lightweight, 60fps particle/constellation animation that subtly reacts to cursor movements.
- **Dynamic Typing Animation**: Smooth role-switching headline in the hero section.
- **Comprehensive Sections**:
  1. **Home**: Hero banner, status badge, dynamic tagline, CTA actions, and live animated stats counter.
  2. **About Me**: Narrative bio, 4 core engineering principles, and an interactive `ArunProfile.java` terminal code block.
  3. **Skills**: Explicitly highlights **Java, C, Python, HTML, CSS, JavaScript, and Data Structures**, with interactive category filter tabs and proficiency progress bars.
  4. **Projects**: 6 featured academic and personal projects with architecture highlights, tech tags, GitHub links, and an interactive **Quick View Modal**.
  5. **Education**: Interactive glowing timeline showcasing Bachelor of Engineering in CSE (CGPA: 7.85/10.0) and Pre-University (PCMC: 70.0%).
  6. **Certifications & Achievements**: Oracle/Coursera Java, GeeksforGeeks DSA, Michigan Python, Hackathon Finalist.
  7. **Contact**: Direct links to LinkedIn, GitHub, email with **one-click copy to clipboard**, and an interactive validated contact form.
- **Downloadable Resume**:
  - Direct download button for `assets/Arun_Manjunath_Resume.pdf`.
  - Built-in in-browser **Resume Preview Modal** and standalone printable view `resume.html` with dedicated `@media print` styling for A4 export.

---

## 📂 Project Structure

```
Arun/
├── index.html                   # Main semantic HTML5 portfolio document
├── resume.html                  # Standalone printable resume page
├── generate_resume_pdf.py       # Python script that generates the PDF resume
├── css/
│   └── style.css                # Custom CSS design system, glassmorphism, responsive queries
├── js/
│   └── main.js                  # Vanilla ES6+ interactivity, canvas, filters, modals, counters
└── assets/
    ├── favicon.svg              # Custom developer terminal favicon
    ├── avatar.svg               # Modern developer portrait illustration
    └── Arun_Manjunath_Resume.pdf# Generated downloadable PDF resume
```

---

## 🚀 How to View Locally

Simply double-click `index.html` to open it in any modern browser (Chrome, Edge, Firefox, Safari).

Alternatively, launch a lightweight local server:
```bash
python -m http.server 8000
```
Then navigate to: [http://localhost:8000](http://localhost:8000)

---

## 🌐 Deploy to Free Web Hosting

- **GitHub Pages**: Push this repository to GitHub and enable GitHub Pages in Repository Settings > Pages.
- **Vercel / Netlify**: Drag-and-drop the project folder to deploy instantly with zero configuration.

