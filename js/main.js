/**
 * ARUN MANJUNATH - PORTFOLIO INTERACTIVITY SCRIPT
 * Modern, Lightweight, Vanilla ES6+
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initAmbientCanvas();
  initScrollProgress();
  initNavbarScroll();
  initMobileMenu();
  initTypedEffect();
  initStatsCounter();
  initSkillFilters();
  initProjectFilters();
  initScrollReveal();
  initContactForm();
  initEmailCopy();
  initProjectModal();
  initResumeModal();
});

/* ===================================================================
   1. AMBIENT INTERACTIVE CANVAS (Subtle Constellation / Starfield)
   =================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 22), 65);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.6 + 0.6,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  let mouse = { x: null, y: null, maxDist: 120 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse subtle interaction
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.maxDist) {
          p.x -= (dx / dist) * 0.6;
          p.y -= (dy / dist) * 0.6;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
      ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          let linkAlpha = (1 - dist / 100) * 0.12;
          ctx.strokeStyle = `rgba(99, 102, 241, ${linkAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(render);
  }

  render();
}

/* ===================================================================
   2. SCROLL PROGRESS BAR
   =================================================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

/* ===================================================================
   3. NAVBAR SCROLL & ACTIVE SCROLLSPY
   =================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scrollspy
    let scrollPos = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  });
}

/* ===================================================================
   4. MOBILE DRAWER NAVIGATION
   =================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    toggleBtn.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !toggleBtn.contains(e.target)) {
      mobileNav.classList.remove('open');
      toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  });
}

/* ===================================================================
   5. TYPING EFFECT (Rotating Taglines)
   =================================================================== */
function initTypedEffect() {
  const typedSpan = document.querySelector('.typed-text');
  if (!typedSpan) return;

  const roles = [
    'Computer Science Engineering Student',
    'Passionate Software Developer',
    'Data Structures & Algorithms Enthusiast',
    'Java & Python Programmer',
    'Full-Stack Web Builder'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const current = roles[roleIdx];

    if (isDeleting) {
      typedSpan.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 45;
    } else {
      typedSpan.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIdx === current.length) {
      // Pause at end
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ===================================================================
   6. STATS COUNTER ANIMATION
   =================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasCounted = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasCounted) {
          hasCounted = true;
          statNumbers.forEach((el) => {
            const target = parseFloat(el.getAttribute('data-target'));
            const isFloat = el.getAttribute('data-float') === 'true';
            const suffix = el.getAttribute('data-suffix') || '';
            let count = 0;
            const duration = 1500;
            const startTime = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out quad
              const ease = 1 - Math.pow(1 - progress, 3);
              const val = ease * target;

              if (isFloat) {
                el.textContent = val.toFixed(2) + suffix;
              } else {
                el.textContent = Math.floor(val) + suffix;
              }

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                el.textContent = (isFloat ? target.toFixed(2) : target) + suffix;
              }
            }
            requestAnimationFrame(updateCounter);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) observer.observe(statsSection);
}

/* ===================================================================
   7. SKILL FILTER TABS
   =================================================================== */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('.skills-filter-nav .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ===================================================================
   8. PROJECT FILTER TABS
   =================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filters .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ===================================================================
   9. SCROLL REVEAL ANIMATIONS
   =================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.glass-card, .skill-card, .project-card, .timeline-item, .cert-card, .contact-info-card, .contact-form-wrap, .section-header'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => {
    el.classList.add('fade-in-up');
    observer.observe(el);
  });
}

/* ===================================================================
   10. ONE-CLICK EMAIL COPY TO CLIPBOARD
   =================================================================== */
function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = 'arunmanjunath.cse@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('Email copied to clipboard!', 'fa-solid fa-check');
      const originalHtml = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
      setTimeout(() => {
        copyBtn.innerHTML = originalHtml;
      }, 2000);
    }).catch(() => {
      showToast('Could not auto-copy. Email: ' + email, 'fa-solid fa-info');
    });
  });
}

/* ===================================================================
   11. CONTACT FORM VALIDATION & SIMULATION
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#sender-name').value.trim();
    const email = form.querySelector('#sender-email').value.trim();
    const subject = form.querySelector('#sender-subject').value.trim();
    const message = form.querySelector('#sender-message').value.trim();
    const submitBtn = form.querySelector('#form-submit-btn');

    // Simple validation
    if (!name || !email || !subject || !message) {
      showToast('Please fill in all fields before sending.', 'fa-solid fa-triangle-exclamation');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'fa-solid fa-triangle-exclamation');
      return;
    }

    // Button loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending Message...';

    // Simulate reliable dispatch
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Sent Successfully!';
      form.reset();

      showToast('Thank you Arun has received your message!', 'fa-solid fa-circle-check');

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
      }, 3000);
    }, 1200);
  });
}

/* ===================================================================
   12. TOAST NOTIFICATION UTILITY
   =================================================================== */
function showToast(message, iconClass = 'fa-solid fa-info-circle') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="${iconClass} toast-icon"></i> <span>${message}</span>`;
  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Remove after 3.5s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ===================================================================
   13. PROJECT MODAL (DEEP DIVE DETAILS)
   =================================================================== */
const projectData = {
  algoverse: {
    title: 'Algoverse - Algorithm & Pathfinding Visualizer',
    category: 'Web & DSA',
    tech: ['JavaScript (ES6+)', 'HTML5 Canvas', 'CSS3', 'Data Structures', 'Algorithms'],
    overview: 'An interactive, educational web suite created to visualize sorting and pathfinding algorithms step-by-step. Built to assist computer science students in intuitively grasping complex time complexities and algorithmic pointer traversals.',
    highlights: [
      'Visualizes QuickSort, MergeSort, HeapSort, and BubbleSort with live comparative array operations.',
      'Implements 2D Grid Pathfinding with Dijkstra’s Algorithm, A* (A-Star Heuristic), BFS, and DFS.',
      'Interactive obstacle drawing, custom random maze generation, and speed throttling.',
      'Calculates real-time comparisons, array accesses, and algorithmic execution time.'
    ],
    github: 'https://github.com/arunmanjunath/algoverse-visualizer',
    demo: 'https://github.com/arunmanjunath'
  },
  campusconnect: {
    title: 'CampusConnect - Academic Portal & Student Management System',
    category: 'Java & Systems',
    tech: ['Java (Core & OOP)', 'MySQL', 'JDBC', 'HTML/CSS', 'MVC Architecture'],
    overview: 'A robust desktop/web student information and academic management system engineered in Java. Built using Model-View-Controller (MVC) architecture with persistent relational database integration.',
    highlights: [
      'Role-based authentication for Administrators, Faculty Members, and Students.',
      'Automated attendance tracking and grading analytics with GPA computation.',
      'Relational schema design with normalized tables, triggers, and prepared statements preventing SQL injection.',
      'Comprehensive report generation for semester transcripts and course rosters.'
    ],
    github: 'https://github.com/arunmanjunath/campus-connect-system',
    demo: 'https://github.com/arunmanjunath'
  },
  codepulse: {
    title: 'CodePulse - Developer Task & Productivity Suite',
    category: 'Python & Web',
    tech: ['Python', 'Flask', 'SQLite', 'JavaScript', 'TailwindCSS'],
    overview: 'A developer-centric task management platform combining Kanban sprint boards, Pomodoro productivity timers, and milestone completion trackers.',
    highlights: [
      'RESTful API architecture handling task state mutations and project associations.',
      'Drag-and-drop Kanban interface with responsive states (Backlog, In Progress, Review, Completed).',
      'Integrated code snippet stash with markdown preview support.',
      'Dark mode UI with animated productivity heatmaps and statistics.'
    ],
    github: 'https://github.com/arunmanjunath/codepulse-tracker',
    demo: 'https://github.com/arunmanjunath'
  },
  smartexpense: {
    title: 'SmartExpense - Personal Finance & Budget Analyzer',
    category: 'Python & Data',
    tech: ['Python', 'Pandas', 'Matplotlib', 'CSV/Data Parsing', 'GUI'],
    overview: 'A Python software application designed to help university students track monthly expenditures, categorize recurring bills, and visualize spending habits.',
    highlights: [
      'Parses bank CSV statements and automatically classifies transactions via regex and keywords.',
      'Generates interactive Matplotlib category distribution pie charts and trend line plots.',
      'Smart budget threshold alerts when spending exceeds customized limits.',
      'Modular object-oriented Python codebase with test coverage.'
    ],
    github: 'https://github.com/arunmanjunath/smart-expense-analyzer',
    demo: 'https://github.com/arunmanjunath'
  },
  packetsniffer: {
    title: 'Network Packet Sniffer & Traffic Inspector',
    category: 'C & Systems',
    tech: ['C Programming', 'Raw Sockets', 'TCP/IP Stack', 'Linux POSIX', 'Network Security'],
    overview: 'A low-level systems project written in C that captures and dissects incoming network packets in real time directly from local network interfaces.',
    highlights: [
      'Leveraged Linux AF_PACKET raw socket programming for unbuffered packet listening.',
      'Decodes Ethernet frames, IPv4 headers, TCP/UDP headers, and payload contents.',
      'Calculates bandwidth consumption and flags suspicious ICMP or port-scan anomalies.',
      'Demonstrates deep understanding of memory management, pointer manipulation, and bitwise operations in C.'
    ],
    github: 'https://github.com/arunmanjunath/packet-sniffer-c',
    demo: 'https://github.com/arunmanjunath'
  },
  devportfolio: {
    title: 'Arun Manjunath - Modern Developer Portfolio',
    category: 'Web & UI/UX',
    tech: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Glassmorphism', 'Responsive Design'],
    overview: 'A lightning-fast, high-aesthetic developer portfolio engineered with modern web standards, cyber-minimal dark mode, and fluid micro-interactions.',
    highlights: [
      'Zero bloated dependencies: 100% pure vanilla HTML5, CSS3, and ES6+ JavaScript.',
      'Fully responsive across all screen dimensions with custom CSS Grid and Flexbox.',
      'Built-in downloadable resume generator and printable HTML resume mode.',
      'Lightweight interactive canvas particle background running at a steady 60 FPS.'
    ],
    github: 'https://github.com/arunmanjunath/arun-manjunath-portfolio',
    demo: '#'
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');
  const modalTitle = document.getElementById('modal-project-title');
  const modalCategory = document.getElementById('modal-project-category');
  const modalTech = document.getElementById('modal-project-tech');
  const modalOverview = document.getElementById('modal-project-overview');
  const modalHighlights = document.getElementById('modal-project-highlights');
  const modalGithub = document.getElementById('modal-project-github');

  document.querySelectorAll('.open-project-modal').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalCategory.textContent = data.category;
      modalOverview.textContent = data.overview;
      modalGithub.href = data.github;

      // Tech tags
      modalTech.innerHTML = data.tech
        .map((t) => `<span class="tech-tag">${t}</span>`)
        .join('');

      // Highlights
      modalHighlights.innerHTML = data.highlights
        .map((h) => `<li><i class="fa-solid fa-chevron-right text-cyan"></i> ${h}</li>`)
        .join('');

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

/* ===================================================================
   14. RESUME PREVIEW & DOWNLOAD MODAL
   =================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const previewBtns = document.querySelectorAll('.open-resume-preview');
  if (!modal || !previewBtns.length) return;

  const closeBtn = modal.querySelector('.resume-modal-close');

  previewBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeResume = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeResume);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeResume();
  });
}

