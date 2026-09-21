/**
 * Portfolio Interactive Scripts & UX Enhancements
 * Author: Md. Mahfuz Haque
 * Functionality: Theme management, geospatial constellation canvas,
 * publication filtering with pop animations, card spotlight physics,
 * button ripples, scroll progress bar, scroll-driven reveals, and clipboard feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSpatialCanvas();
  initNav();
  initScrollProgressBar();
  initButtonRipples();
  initCardSpotlight();
  initScrollReveal();
  initPubFilters();
  initCertFilters();
  initCrestFilters();
  initTimelineTabs();
  initCopyActions();
  initStatCounters();
  initContactForm();
  initBackToTop();
  initWorldGlobe();
  initGraphSlideshow();
});

/* ==========================================
   1. Theme Management (Dark / Light)
   ========================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Default to dark mode for geospatial tech aesthetics
  const currentTheme = storedTheme || (prefersDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', (e) => {
      createRipple(e, themeToggleBtn);
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

      // Trigger silky smooth theme transition & button animation
      themeToggleBtn.classList.add('theme-switching');
      document.documentElement.classList.add('theme-transitioning');

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);

      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
        themeToggleBtn.classList.remove('theme-switching');
      }, 400);

      showToast(`Switched to ${newTheme === 'dark' ? 'Geospatial Dark' : 'Clean Light'} theme`);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  if (theme === 'light') {
    // Show Moon icon (switch to dark)
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />`;
  } else {
    // Show Sun icon (switch to light)
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />`;
  }
}

/* ==========================================
   2. Scroll Progress Bar
   ========================================== */
function initScrollProgressBar() {
  let bar = document.getElementById('scroll-progress');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'scroll-progress';
    bar.className = 'scroll-progress-bar';
    document.body.prepend(bar);
  }

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ==========================================
   3. Tactile Button Pop & Ripple Wave
   ========================================== */
function initButtonRipples() {
  const clickableSelectors = '.btn, .filter-btn, .copy-badge-btn, .timeline-tab-btn, .social-link';
  document.addEventListener('click', (e) => {
    const target = e.target.closest(clickableSelectors);
    if (!target) return;
    createRipple(e, target);
  });
}

function createRipple(event, element) {
  const rect = element.getBoundingClientRect();
  const circle = document.createElement('span');
  const diameter = Math.min(Math.max(rect.width, rect.height) * 0.45, 45);
  const radius = diameter / 2;

  const clientX = event.clientX || (rect.left + rect.width / 2);
  const clientY = event.clientY || (rect.top + rect.height / 2);

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${clientX - rect.left - radius}px`;
  circle.style.top = `${clientY - rect.top - radius}px`;
  circle.classList.add('ripple-wave');

  const existing = element.querySelector('.ripple-wave');
  if (existing) existing.remove();

  element.appendChild(circle);
  setTimeout(() => circle.remove(), 420);
}

/* ==========================================
   4. Glass Card Spotlight (Mouse Coordinate Physics)
   ========================================== */
function initCardSpotlight() {
  const cards = document.querySelectorAll('.glass-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================
   5. Scroll-Driven Reveal Animations
   ========================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el) => revealObserver.observe(el));
}

/* ==========================================
   6. Geospatial Constellation Canvas Background
   ========================================== */
function initSpatialCanvas() {
  const canvas = document.getElementById('spatial-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const nodeCount = Math.floor(Math.min(width, 1400) / 24);
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      baseRadius: Math.random() * 2 + 1,
      phase: Math.random() * Math.PI * 2
    });
  }

  let mouse = { x: null, y: null, maxDist: 150 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const nodeColor = isLight ? 'rgba(2, 132, 199, ' : 'rgba(6, 182, 212, ';
    const lineColor = isLight ? 'rgba(13, 148, 136, ' : 'rgba(16, 185, 129, ';

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      node.x += node.vx;
      node.y += node.vy;
      node.phase += 0.025;

      // Bounce at edges
      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      // Pulse node size
      const currentRadius = node.baseRadius + Math.sin(node.phase) * 0.5;

      // Draw node
      ctx.beginPath();
      ctx.arc(node.x, node.y, Math.max(0.6, currentRadius), 0, Math.PI * 2);
      ctx.fillStyle = nodeColor + '0.7)';
      ctx.fill();

      // Connect with nearby nodes (spatial graph network)
      for (let j = i + 1; j < nodes.length; j++) {
        const other = nodes[j];
        const dx = node.x - other.x;
        const dy = node.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 115) {
          const alpha = (1 - dist / 115) * 0.28;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = lineColor + alpha + ')';
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }

      // Connect to mouse pointer
      if (mouse.x !== null && mouse.y !== null) {
        const mdx = node.x - mouse.x;
        const mdy = node.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouse.maxDist) {
          const malpha = (1 - mdist / mouse.maxDist) * 0.45;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = nodeColor + malpha + ')';
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================
   7. Navigation & Scroll-spy
   ========================================== */
function initNav() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const expanded = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', expanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Scrollspy
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* ==========================================
   8. Publications Filtering with Pop Animation
   ========================================== */
function initPubFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const pubCards = document.querySelectorAll('.pub-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      pubCards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory.includes(filterValue)) {
          card.style.display = 'grid';
          // Re-trigger pop animation
          card.classList.remove('pop-in');
          void card.offsetWidth; // Force reflow
          card.classList.add('pop-in');
          card.style.animationDelay = `${index * 50}ms`;
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================
   9. Timeline Tabs (Experience vs Education)
   ========================================== */
function initTimelineTabs() {
  const tabBtns = document.querySelectorAll('.timeline-tab-btn');
  const timelineViews = document.querySelectorAll('.timeline-view');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-target');
      timelineViews.forEach((view) => {
        if (view.id === targetTab) {
          view.style.display = 'block';
          view.style.animation = 'fadeIn 0.35s ease';
        } else {
          view.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================
   10. Clipboard & Enhanced Toast Notifications
   ========================================== */
function initCopyActions() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const textToCopy = button.getAttribute('data-copy');
      if (!textToCopy) return;

      // Button tactile feedback animation
      button.style.transform = 'scale(0.92)';
      setTimeout(() => {
        button.style.transform = '';
      }, 150);

      navigator.clipboard.writeText(textToCopy).then(() => {
        const label = button.getAttribute('data-copy-label') || 'Copied to clipboard!';
        showToast(label);
      }).catch(() => {
        showToast('Unable to copy. Please manually select.');
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" fill="none" stroke="var(--accent-emerald)" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ==========================================
   11. Stat Counters Animation
   ========================================== */
function initStatCounters() {
  const statElements = document.querySelectorAll('[data-count-target]');
  if (!statElements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-count-target'));
          const isDecimal = el.getAttribute('data-count-target').includes('.');
          const suffix = el.getAttribute('data-count-suffix') || '';
          const duration = 1600;
          const startTime = performance.now();

          function updateCounter(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = target * easeProgress;

            el.textContent = (isDecimal ? currentVal.toFixed(2) : Math.floor(currentVal)) + (progress === 1 ? suffix : '');

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = (isDecimal ? target.toFixed(2) : target) + suffix;
            }
          }

          requestAnimationFrame(updateCounter);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statElements.forEach((el) => observer.observe(el));
}

/* ==========================================
   12. Contact Form Handling
   ========================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const getFormData = () => {
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please complete all required fields (Name, Email, and Message).');
      return null;
    }

    const emailSubject = subject || `Academic / Research Inquiry: ${name}`;
    const emailBody = `Dear Mahfuz,\n\n${message}\n\n---\nSender Name: ${name}\nSender Email: ${email}`;

    return { name, email, subject: emailSubject, message, body: emailBody };
  };

  // Primary: Direct Gmail-to-Gmail Web Composer
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getFormData();
    if (!data) return;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mahfuzhaque09@gmail.com&su=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.body)}`;

    showToast('Opening Gmail composer... Just click Send in Gmail!');

    // Open in a new tab; if popup blocked, fallback to window.location
    const newTab = window.open(gmailUrl, '_blank');
    if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
      window.location.href = gmailUrl;
    }
  });

  // Secondary: System Default Mail Client (Outlook / Apple Mail)
  const defaultBtn = document.getElementById('btn-send-default');
  if (defaultBtn) {
    defaultBtn.addEventListener('click', () => {
      const data = getFormData();
      if (!data) return;

      const mailtoUrl = `mailto:mahfuzhaque09@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.body)}`;
      window.location.href = mailtoUrl;
      showToast('Opening your default mail app...');
    });
  }
}

/* ==========================================
   13. Back to Top Button
   ========================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================
   14. 3D Geospatial World Globe (Globe.gl)
   ========================================== */
function initWorldGlobe() {
  const container = document.getElementById('hero-globe');
  if (!container) return;

  // If Globe.gl is not yet available, wait and retry
  if (typeof Globe === 'undefined') {
    const checkScript = setInterval(() => {
      if (typeof Globe !== 'undefined') {
        clearInterval(checkScript);
        buildGlobe();
      }
    }, 100);
    setTimeout(() => clearInterval(checkScript), 5000);
    return;
  }

  buildGlobe();

  function buildGlobe() {
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    // Academic & research base: Bangladesh (JKKNIU)
    const researchHubs = [
      {
        lat: 24.582,
        lng: 90.380,
        name: 'JKKNIU, Trishal / Mymensingh, Bangladesh',
        role: 'Academic Base & Dept. of Local Govt. & Urban Development',
        size: 1.45,
        color: '#10b981'
      }
    ];

    // Pulsing beacon ring on Bangladesh
    const ringsData = [
      {
        lat: 24.582,
        lng: 90.380,
        maxR: 5.5,
        propagationSpeed: 2.2,
        repeatPeriod: 1200
      }
    ];

    let world;
    try {
      world = Globe()(container)
        .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
        .backgroundColor('rgba(0,0,0,0)')
        .width(width)
        .height(height)
        .pointsData(researchHubs)
        .pointLat('lat')
        .pointLng('lng')
        .pointColor('color')
        .pointRadius('size')
        .pointAltitude(0.04)
        .pointLabel(d => `
          <div class="globe-tooltip-box">
            <div class="globe-tooltip-title">${d.name}</div>
            <div class="globe-tooltip-sub">${d.role}</div>
          </div>
        `)
        .ringsData(ringsData)
        .ringColor(() => '#10b981')
        .ringMaxRadius('maxR')
        .ringPropagationSpeed('propagationSpeed')
        .ringRepeatPeriod('repeatPeriod');

      // Auto-rotation & control settings
      world.controls().autoRotate = true;
      world.controls().autoRotateSpeed = 0.65;
      world.controls().enableZoom = false; // Never trap vertical scroll!

      // Initial Camera angle focused on South Asia / Bangladesh
      world.pointOfView({ lat: 24.582, lng: 85, altitude: 2.3 }, 0);

      // Load Country Polygons for 3D topology
      fetch('https://unpkg.com/globe.gl/example/datasets/ne_110m_admin_0_countries.geojson')
        .then(res => res.json())
        .then(countries => {
          world
            .polygonsData(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'))
            .polygonAltitude(0.015)
            .polygonCapColor(d => d.properties.ISO_A2 === 'BD' ? 'rgba(16, 185, 129, 0.65)' : 'rgba(6, 182, 212, 0.18)')
            .polygonSideColor(() => 'rgba(6, 182, 212, 0.1)')
            .polygonStrokeColor(() => 'rgba(255, 255, 255, 0.15)')
            .polygonLabel(({ properties: d }) => `
              <div class="globe-tooltip-box">
                <div class="globe-tooltip-title">${d.ADMIN} (${d.ISO_A2})</div>
                <div class="globe-tooltip-sub">
                  ${d.ISO_A2 === 'BD' ? '<span style="color:#10b981;font-weight:700;">★ Academic Base (JKKNIU)</span><br/>' : ''}
                  Pop: ${(d.POP_EST / 1e6).toFixed(1)}M
                </div>
              </div>
            `)
            .onPolygonHover(hoverD => {
              world
                .polygonAltitude(d => d === hoverD ? 0.055 : 0.015)
                .polygonCapColor(d => {
                  if (d === hoverD) return '#06b6d4';
                  return d.properties.ISO_A2 === 'BD' ? 'rgba(16, 185, 129, 0.65)' : 'rgba(6, 182, 212, 0.18)';
                });
            })
            .polygonsTransitionDuration(250);
        })
        .catch(err => {
          console.warn('GeoJSON polygons could not load, sphere rendered with base texture:', err);
        });

      // Button: Focus Bangladesh
      const btnFocus = document.getElementById('btn-focus-bd');
      if (btnFocus) {
        btnFocus.addEventListener('click', (e) => {
          createRipple(e, btnFocus);
          world.pointOfView({ lat: 24.582, lng: 90.380, altitude: 2.1 }, 1200);
          showToast('Centered on Bangladesh Research Hub');
        });
      }

      // Button: Toggle Auto-Rotate
      const btnRotate = document.getElementById('btn-toggle-rotate');
      const rotateLabel = document.getElementById('rotate-label');
      if (btnRotate) {
        btnRotate.addEventListener('click', (e) => {
          createRipple(e, btnRotate);
          const isRotating = world.controls().autoRotate;
          world.controls().autoRotate = !isRotating;
          btnRotate.classList.toggle('active', !isRotating);
          if (rotateLabel) {
            rotateLabel.textContent = !isRotating ? 'Rotate' : 'Paused';
          }
          showToast(!isRotating ? 'Globe rotation resumed' : 'Globe rotation paused');
        });
      }

      // Parallax mouse tilt
      let mouseX = 0, mouseY = 0;
      document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      });

      function animateParallax() {
        if (world && world.scene()) {
          world.scene().rotation.x += (mouseY * 0.08 - world.scene().rotation.x) * 0.04;
          world.scene().rotation.z += (mouseX * 0.08 - world.scene().rotation.z) * 0.04;
        }
        requestAnimationFrame(animateParallax);
      }
      animateParallax();

      // Responsive resize
      window.addEventListener('resize', () => {
        if (container && world) {
          const newW = container.clientWidth || 600;
          const newH = container.clientHeight || 600;
          world.width(newW);
          world.height(newH);
        }
      });
    } catch (e) {
      console.warn('Globe initialization error:', e);
    }
  }
}


/* ==========================================
   14. CERTIFICATES FILTERING WITH POP ANIMATION
   ========================================== */
function initCertFilters() {
  const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
  const certCards = document.querySelectorAll('.cert-card');

  certFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      certFilterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      certCards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.classList.remove('pop-in');
          void card.offsetWidth; // Force reflow
          card.classList.add('pop-in');
          card.style.animationDelay = `${index * 40}ms`;
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================
   15. CERTIFICATE DATA & MODAL LIGHTBOX
   ========================================== */
const certData = [
  {
    id: 'ra-uswatun-khushi',
    src: 'images/certificates/cert-ra-uswatun-khushi.jpg',
    pdfUrl: 'Certificates/cert-ra-uswatun-khushi.pdf',
    category: 'ta-ra',
    tag: 'Research Appointment',
    issuer: 'Dept. of Local Govt & Urban Dev, JKKNIU',
    date: 'Jul 2026',
    title: 'Research Assistant Appointment & Supervision Testimonial',
    desc: 'Official credential issued by Assistant Professor Uswatun Mahera Khushi certifying research leadership on three major projects: GIS-based Crime Deterrence (CPTED) in Mymensingh, Spatiotemporal Machine Learning for Road Hierarchy Traffic Accidents (Random Forest, XGBoost, CNN-LSTM), and Mixed-Methods Clinical Waste ML Risk Assessment.',
    credId: 'Ref: JKKNIU-LGUD-RA',
    verifyUrl: ''
  },
  {
    id: 'ta-ra-sadik-shuvo',
    src: 'images/certificates/cert-ta-ra-sadik-shuvo.jpg',
    pdfUrl: 'Certificates/cert-ta-ra-sadik-shuvo.pdf',
    category: 'ta-ra',
    tag: 'Academic Appointment',
    issuer: 'Dept. of Local Govt & Urban Dev, JKKNIU',
    date: 'Jul 2026',
    title: 'Teaching Assistant & Research Assistant Certification',
    desc: 'Official testimonial from Department Chairman Sadik Hasan Shuvo certifying tenure as Teaching Assistant (since Oct 2024) and Research Assistant (since July 2025). Highlighting training seminars delivered on NVivo & ArcGIS Pro, and roles as Lead Data Analyst on the UGC-funded public university research study.',
    credId: 'Ref: JKKNIU-LGUD-TARA',
    verifyUrl: ''
  },
  {
    id: 'hsc-2020',
    src: 'images/certificates/cert-hsc-2020.jpg',
    pdfUrl: 'Certificates/HSC_Certificate_Md_Mahfuz_Haque.pdf',
    category: 'academic',
    tag: 'Academic Board Excellence',
    issuer: 'BISE Mymensingh',
    date: '2020',
    title: 'Higher Secondary Certificate Examination (HSC) 2020 — Science',
    desc: 'Awarded by the Board of Intermediate and Secondary Education, Mymensingh from Cantonment Public School & College, Mymensingh. Secured highest distinction with a perfect GPA 5.00 on a 5.00 scale in the Science group (Session 2018–19).',
    credId: 'Roll: 204433 | Reg: 1510765241',
    verifyUrl: ''
  },
  {
    id: 'ssc-2018',
    src: 'images/certificates/cert-ssc-2018.jpg',
    pdfUrl: 'Certificates/SSC_Certificate_Md_Mahfuz_Haque.pdf',
    category: 'academic',
    tag: 'Academic Board Excellence',
    issuer: 'BISE Dhaka',
    date: '2018',
    title: 'Secondary School Certificate Examination (SSC) 2018 — Science',
    desc: 'Awarded by the Board of Intermediate and Secondary Education, Dhaka from Progressive Model School, Mymensingh. Achieved a perfect GPA 5.00 on a 5.00 scale in the Science group (Session 2016).',
    credId: 'Roll: 187182 | Reg: 1510765241',
    verifyUrl: ''
  },
  {
    id: 'jsc-2015',
    src: 'images/certificates/cert-jsc-2015.jpg',
    pdfUrl: 'Certificates/JSC_Certificate_Md_Mahfuz_Haque.pdf',
    category: 'academic',
    tag: 'Academic Board Excellence',
    issuer: 'BISE Dhaka',
    date: '2015',
    title: 'Junior School Certificate Examination (JSC) 2015',
    desc: 'Awarded by the Board of Intermediate and Secondary Education, Dhaka from Monipur High School, Dhaka. Successfully passed the national Junior School Certificate examination with a perfect GPA 5.00 on a 5.00 scale (Session 2015).',
    credId: 'Roll: 696192 | Reg: 1510765241',
    verifyUrl: ''
  },
  {
    id: 'psc-2012',
    src: 'images/certificates/cert-psc-2012.jpg',
    pdfUrl: 'Certificates/PSC_Certificate_Md_Mahfuz_Haque.pdf',
    category: 'academic',
    tag: 'Academic Distinction',
    issuer: 'Directorate of Primary Education, Bangladesh',
    date: '2012',
    title: 'Primary Education Completion Examination (PSC / PECE) 2012',
    desc: 'Awarded by the Directorate of Primary Education, Ministry of Primary and Mass Education, Government of Bangladesh from Monipur High School & College, Mirpur, Dhaka. Secured a flawless GPA 5.00 on a 5.00 scale.',
    credId: 'Roll: 12703 | Reg: 8696943',
    verifyUrl: ''
  },
  {
    id: 'research-methodology',
    src: 'images/certificates/cert-research-methodology.jpg',
    category: 'data-research',
    tag: 'Research Methodology',
    issuer: 'Research Help Bangladesh',
    date: 'Nov 2025',
    title: 'Research Methodology: Basic to Advanced',
    desc: 'Successfully completed the 3-month intensive (48-hour) "Research Methodology: Basic to Advanced" course organized by Research Help Bangladesh under the guidance of Chief Instructor Morshed Alam. Gained hands-on proficiency in software (NVivo, SPSS, Zotero, KoBo Toolbox) and methodology (Critical Literature Review, Qualitative Data Analysis, and writing winning research proposals).',
    credId: 'ID: c37965442d78ecf3',
    verifyUrl: ''
  },
  {
    id: 'spss-jurs',
    src: 'images/certificates/cert-spss-jurs.jpg',
    category: 'data-research',
    tag: 'Statistical Computing',
    issuer: 'Jahangirnagar University Research Society',
    date: 'Jan 2026',
    title: 'SPSS for Research Quantitative Course',
    desc: 'Comprehensive research training in IBM SPSS organized by Jahangirnagar University Research Society (JURS), covering descriptive statistics, ANOVA, cross-tabulations, parametric & non-parametric statistical tests, and data reporting.',
    credId: 'JURS-SPSS',
    verifyUrl: ''
  },
  {
    id: 'cpted-research-fair',
    src: 'images/certificates/cert-cpted-research-fair.jpg',
    pdfUrl: 'Certificates/cert-cpted-research-fair.pdf',
    category: 'data-research',
    tag: 'Research Fair Award',
    issuer: 'Social Science Faculty, JKKNIU',
    date: 'May 2025',
    title: 'Certificate of Project Presentation — 3rd Research Fair 2025',
    desc: 'Presented research on CPTED and urban safety enhancement in Bangladesh at the 3rd Research Fair–2025, JKKNIU. Honored to receive the Certificate of Project Presentation for project work titled: "Integrating Crime Prevention Through Environmental Design (CPTED) in Enhanced Urban Safety in Bangladesh: A Post-August 5th, 2024 Analysis in Mymensingh District", organized by Jatiya Kabi Kazi Nazrul Islam University.',
    credId: 'Reg: 11252 | ID: 22123803',
    verifyUrl: ''
  },
  {
    id: 'stanford-ml',
    src: 'images/certificates/cert-stanford-ml.jpg',
    category: 'data-research',
    tag: 'Machine Learning',
    issuer: 'Stanford Online & DeepLearning.AI',
    date: 'Nov 2025',
    title: 'Supervised Machine Learning: Regression and Classification',
    desc: 'Completed with a 99.83% grade in the "Supervised Machine Learning: Regression and Classification" course offered by DeepLearning.AI and Stanford University on Coursera, instructed by Andrew Ng. Built machine learning models in Python using NumPy and scikit-learn, mastering Supervised Learning techniques for prediction and binary classification, with hands-on experience in Linear and Logistic Regression.',
    credId: 'ID: TWDSZQEMR0A1',
    verifyUrl: 'https://coursera.org/verify/TWDSZQEMR0A1'
  },
  {
    id: 'gis-workshop-jkkniu',
    src: 'images/certificates/cert-gis-workshop-jkkniu.jpg',
    pdfUrl: 'Certificates/cert-gis-workshop-jkkniu.pdf',
    category: 'data-research',
    tag: 'Geospatial Analytics',
    issuer: 'Dept. of Local Govt & Urban Dev, JKKNIU',
    date: 'Jul 2025',
    title: 'Day-Long GIS Training Workshop Certificate',
    desc: 'Successfully completed a day-long GIS Training Workshop organized by the Department of Local Government and Urban Development, JKKNIU, on 27 July 2025. The training enhanced knowledge of GIS concepts, hands-on experience with ArcGIS tools for spatial data analysis, creating and managing geographic datasets, and solving real-world urban planning case studies.',
    credId: 'LGUD-GIS-2025',
    verifyUrl: ''
  },
  {
    id: 'stata-jkkniu',
    src: 'images/certificates/cert-stata-jkkniu.jpg',
    pdfUrl: 'Certificates/cert-stata-jkkniu.pdf',
    category: 'data-research',
    tag: 'Econometrics & Statistics',
    issuer: 'Dept. of LGUD, JKKNIU',
    date: 'Nov 2025',
    title: 'Professional Training on STATA for Advanced Research',
    desc: 'Had the privilege of completing intensive professional training on STATA conducted by Dr. Nuruzzaman Khan, Research Fellow at the University of Melbourne (recognized among the top 2% scientists worldwide and one of the most cited researchers in Bangladesh). Deeply grateful to Department Head, Assistant Professor Sadik Hasan Shuvo for organizing such a valuable learning opportunity at JKKNIU.',
    credId: 'LGUD-JKKNIU-STATA',
    verifyUrl: ''
  },
  {
    id: 'mkcrd-research',
    src: 'images/certificates/cert-mkcrd-research.jpg',
    category: 'data-research',
    tag: 'Academic Research',
    issuer: 'MK Center for Research & Debate',
    date: 'Mar 2026',
    title: 'MKCRD Basic Research Training Season Two',
    desc: 'Awarded for completing the seasonal research fellowship at MKCRD, focusing on foundational academic inquiry, critical thinking frameworks, and evidence-based manuscript preparation.',
    credId: 'MKCRD-Season 2',
    verifyUrl: ''
  },
  {
    id: 'ostad-datascience',
    src: 'images/certificates/cert-ostad-datascience.jpg',
    category: 'data-research',
    tag: 'Data Science',
    issuer: 'Ostad',
    date: '2025',
    title: 'Data Science Workshop for Research & Higher Studies',
    desc: 'Completed the Data Science Workshop for Research & Higher Studies organized by Ostad. Dived deep into Python, Pandas, data cleaning, time-series resampling, and visualization, culminating in a full mini-project analyzing monthly weather patterns for real-world research and higher studies.',
    credId: 'ID: C35195',
    verifyUrl: ''
  },
  {
    id: 'janata-bank-merit',
    src: 'images/certificates/cert-janata-bank-merit.jpg',
    pdfUrl: 'Certificates/cert-janata-bank-merit.pdf',
    category: 'fellowship',
    tag: 'Merit Award (20,000 TK)',
    issuer: 'Janata Bank Limited',
    date: 'Nov 2021',
    title: 'Janata Bank Academic Excellence Commendation Award',
    desc: 'Official Letter of Commendation and 20,000 TK Merit Scholarship Award presented by Janata Bank Employees Benevolent Fund Managing Committee & MD/CEO, honoring exceptional academic distinction and GPA 5.00 achievement in the HSC Science Examination from Cantonment Public School & College, Mymensingh.',
    credId: 'Janata Bank Central Directorate',
    verifyUrl: ''
  },
  {
    id: 'csa-fellowship',
    src: 'images/certificates/cert-csa-fellowship.jpg',
    category: 'fellowship',
    tag: 'Global Fellowship',
    issuer: 'Commonwealth Students\' Association',
    date: 'May 2026',
    title: 'Certificate of Fellowship — Young SDG Fellow',
    desc: 'Officially recognized as a Young SDG Fellow by the Commonwealth Students\' Association (CSA) following competitive participation in the Zero Olympiad, recognizing leadership and contributions to the UN Sustainable Development Goals (SDGs).',
    credId: 'ZO-26-FEL-EB3E79',
    verifyUrl: ''
  },
  {
    id: 'tedx-jkkniu',
    src: 'images/certificates/cert-tedx.jpg',
    category: 'fellowship',
    tag: 'Ideas & Innovation',
    issuer: 'TEDx & JKKNIU',
    date: 'Jan 2025',
    title: 'TEDxJKKNIU: Unleashing Creativity',
    desc: 'Participated in TEDxJKKNIU, organized on the theme "Unleashing Creativity" held on January 25, 2025 at Jatiya Kabi Kazi Nazrul Islam University. Officially certified by Licensee & Lead Organizer Md. Abul Absar Bappy and Chief Patron & Vice Chancellor Prof. Dr. Md. Jahangir Alam.',
    credId: 'TEDx Participant',
    verifyUrl: ''
  },
  {
    id: 'unitar-unep',
    src: 'images/certificates/cert-unitar-unep.jpg',
    category: 'policy',
    tag: 'Global Climate Policy',
    issuer: 'UNITAR & UN Environment Programme (UNEP)',
    date: 'May 2026',
    title: 'Climate Change International Legal Regime',
    desc: 'Joint certification by UNITAR and UNEP (InforMEA), signed by UN Assistant Secretary General Nikhil Seth and UNEP Law Division Director Elizabeth Mrema. Covers multilateral climate diplomacy, UNFCCC mechanisms, and Paris Agreement commitments.',
    credId: 'UN / InforMEA',
    verifyUrl: ''
  },
  {
    id: 'climate-justice',
    src: 'images/certificates/cert-climate-justice.jpg',
    pdfUrl: 'Certificates/cert-climate-justice.pdf',
    category: 'policy',
    tag: 'Environmental Justice',
    issuer: 'SERAC-Bangladesh & KOICA-NGO',
    date: 'May 2023',
    title: 'Youth Climate Justice Workshop 2023',
    desc: 'Led my team in the Youth Climate Justice Workshop 2023 organized by SERAC-Bangladesh at Jatiya Kabi Kazi Nazrul Islam University on May 21, 2023. Joint international initiative in collaboration with KOICA-NGO Volunteers, KIDC, and DAEJAYON, addressing environmental vulnerability, climate adaptation, and community resilience.',
    credId: 'SERAC-KOICA-2023',
    verifyUrl: ''
  },
  {
    id: 'electoral-integrity-wfd',
    src: 'images/certificates/cert-electoral-integrity.jpg',
    category: 'policy',
    tag: 'Democratic Governance',
    issuer: 'Applied Democracy Lab, DU & WFD (UK)',
    date: 'Jul 2025',
    title: 'Pursuing Electoral Integrity in Bangladesh',
    desc: 'Successfully participated in the mini-lecture series on "Pursuing Electoral Integrity in Bangladesh" (16–17 July 2025) online, organized by the Applied Democracy Lab (ADL), University of Dhaka, in collaboration with the Westminster Foundation for Democracy (WFD), UK. Enriched understanding of electoral transparency, democratic values, and political integrity for shaping a just and accountable society.',
    credId: 'ID: ADL160725065M',
    verifyUrl: ''
  }
];

/* ==========================================
   16. PHOTO GALLERY & CERTIFICATE LIGHTBOX
   ========================================== */

// Gallery data - 9 curated photos with rich metadata
const galleryData = [
  {
    src: 'images/gallery-1.jpg',
    tag: 'Teaching Assistant • Qualitative Analysis',
    title: 'Conducting NVivo Qualitative Analysis Workshop for Master\'s Students',
    desc: 'Serving as Teaching Assistant, conducting a hands-on NVivo software session for Master\'s degree students, training them in qualitative data analysis and thesis methodology.'
  },
  {
    src: 'images/gallery-2.jpg',
    tag: 'Academic Leadership • Group Leader',
    title: 'Delivering Academic Presentation as Group Leader',
    desc: 'Delivering a technical presentation as designated group leader—a leadership role held continuously for 4 consecutive years across undergraduate coursework and research projects.'
  },
  {
    src: 'images/gallery-3.jpg',
    tag: 'Group Leadership • Econometrics',
    title: 'Leading Technical Presentation on Quantitative Indices',
    desc: 'Explaining statistical derivations of expected vs. mean years of schooling and HDI indices as group leader during an advanced quantitative methods session.'
  },
  {
    src: 'images/gallery-4.jpg',
    tag: 'Leadership & Hosting • LGUD Fest',
    title: 'Departmental Cultural Gala & Event Hosting',
    desc: 'Master of ceremonies and host for the annual Department of Local Government and Urban Development cultural fest.'
  },
  {
    src: 'images/gallery-5.jpg',
    tag: 'Research Fair 2025 • Vice-Chancellor Presentation',
    title: 'Presenting Research Project to the Honorable Vice-Chancellor',
    desc: 'Presenting my independent urban research project and physical spatial planning model at the 3rd Research Fair 2025 in front of the Honorable Vice-Chancellor and distinguished faculties at JKKNIU.'
  },
  {
    src: 'images/gallery-6.jpg',
    tag: 'Academic Cohort • LGUD Department',
    title: 'Department of Local Government & Urban Development Cohort',
    desc: 'Department faculty members, researchers, and student cohort assembled at the LGUD departmental mural at JKKNIU.'
  },
  {
    src: 'images/gallery-7.jpg',
    tag: 'Professional Training • STATA Workshop',
    title: 'STATA Data Analysis Workshop & Certification',
    desc: 'Advanced statistical training workshop on STATA for social science and urban research, covering econometric modeling, survey data analysis, and empirical regression techniques.'
  },
  {
    src: 'images/gallery-8.jpg',
    tag: 'Professional Training • STATA Workshop',
    title: 'STATA Data Analysis Workshop & Certification',
    desc: 'Advanced statistical training workshop on STATA for social science and urban research, covering econometric modeling, survey data analysis, and empirical regression techniques.'
  },
  {
    src: 'images/gallery-9.jpg',
    tag: 'Professional Training • STATA Workshop',
    title: 'STATA Data Analysis Workshop & Certification',
    desc: 'Advanced statistical training workshop on STATA for social science and urban research, covering econometric modeling, survey data analysis, and empirical regression techniques.'
  }
];

/* Crests & Medals Showcase Data */
const crestData = [
  {
    src: 'crest/mymensingh-city-medal-combined.jpeg',
    tag: "Mayor's Gold Medal • SSC 2018 (Front & Back)",
    title: "Mayor's Student Merit Gold Medal",
    desc: 'Commemorative gold medal presented by Md. Ekramul Haque Titu, Administrator of Mymensingh City Corporation (30 Nov 2018), honoring outstanding student merit and achieving perfect GPA 5.00 in the Secondary School Certificate examination. Collage shows both front medal face and official reverse municipal seal.',
    issuer: 'Mymensingh City Corporation',
    year: '2018',
    category: 'medal ssc2018'
  },
  {
    src: 'crest/cambrian-ssc-medal-combined.jpeg',
    tag: 'Scholastic Gold Medal • SSC 2018 (Front & Back)',
    title: 'BSB-Cambrian Education Group Outstanding Result Medal (SSC)',
    desc: 'Golden laurel-wreath medal of excellence awarded by BSB-Cambrian Education Group celebrating top-tier academic results and GPA 5.00 in the 2018 SSC board examination. Obverse side features the congratulatory laurel wreath; reverse displays the registered BSB Foundation pen-and-book insignia.',
    issuer: 'BSB-Cambrian Education Group',
    year: '2018',
    category: 'medal ssc2018'
  },
  {
    src: 'crest/psc-achievement-medal-combined.jpeg',
    tag: 'Academic Distinction • PSC 2012 (Front & Back)',
    title: 'Primary Education Completion (PSC) GPA-5 Achievement Medal',
    desc: 'Distinguished five-star achievement medal awarded for academic brilliance and securing GPA 5.00 in the nationwide Primary Education Completion (PSC) examination. Front face features the 5-star GPA award; reverse displays Cambrian College academic insignia.',
    issuer: 'Directorate of Primary Education / Cambrian',
    year: '2012',
    category: 'medal psc2012'
  },
  {
    src: 'crest/doctors-academy-torongo-ict-crest.jpeg',
    tag: 'Acrylic Distinction Crest • SSC Merit',
    title: 'Doctors Academy & Torongo ICT Academic Distinction Crest',
    desc: 'Custom standing commemorative acrylic crest mounted on a wood pedestal presented by Doctors Academy & Torongo ICT in celebration of exceptional SSC results.',
    issuer: 'Doctors Academy & Torongo ICT',
    year: '2018',
    category: 'crest ssc2018'
  }
];

let currentLightboxIndex = 0;
let activeLightboxMode = 'gallery'; // 'gallery', 'cert', or 'crest'

function openLightbox(index) {
  activeLightboxMode = 'gallery';
  currentLightboxIndex = index;
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;
  updateLightboxContent();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Keyboard navigation
  document.addEventListener('keydown', lightboxKeyHandler);
}

function openCertLightbox(index) {
  activeLightboxMode = 'cert';
  currentLightboxIndex = index;
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;
  updateLightboxContent();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Keyboard navigation
  document.addEventListener('keydown', lightboxKeyHandler);
}

function openCrestLightbox(index) {
  activeLightboxMode = 'crest';
  currentLightboxIndex = index;
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;
  updateLightboxContent();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Keyboard navigation
  document.addEventListener('keydown', lightboxKeyHandler);
}

function updateLightboxContent() {
  let list;
  if (activeLightboxMode === 'cert') {
    list = certData;
  } else if (activeLightboxMode === 'crest') {
    list = crestData;
  } else if (activeLightboxMode === 'graph') {
    list = graphsData;
  } else {
    list = galleryData;
  }
  const data = list[currentLightboxIndex];

  const img = document.getElementById('lightbox-img');
  const tag = document.getElementById('lightbox-tag');
  const title = document.getElementById('lightbox-title');
  const desc = document.getElementById('lightbox-desc');
  const extra = document.getElementById('lightbox-extra');
  const current = document.getElementById('lb-current');
  const total = document.getElementById('lb-total');

  if (img) {
    img.src = data.src;
    img.alt = data.title;
  }
  if (tag) tag.textContent = data.tag;
  if (title) title.textContent = data.title;
  if (desc) desc.textContent = data.desc;
  if (current) current.textContent = currentLightboxIndex + 1;
  if (total) total.textContent = list.length;

  const caption = document.querySelector('.lightbox-caption');
  if (caption) {
    caption.style.display = (data && (data.title || data.desc)) ? 'block' : 'none';
  }

  if (extra) {
    if (activeLightboxMode === 'cert') {
      extra.style.display = 'flex';
      let html = '';
      if (data.issuer) {
        html += `<span class="lightbox-id-badge">🏛️ ${data.issuer}</span>`;
      }
      if (data.verifyUrl) {
        html += `<a href="${data.verifyUrl}" target="_blank" rel="noopener noreferrer" class="lightbox-verify-btn">
          <span>Verify Credential</span>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
        </a>`;
      }
      if (data.pdfUrl) {
        html += `<a href="${data.pdfUrl}" target="_blank" rel="noopener noreferrer" class="lightbox-verify-btn">
          <span>View / Download PDF</span>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
        </a>`;
      }
      extra.innerHTML = html;
    } else if (activeLightboxMode === 'crest') {
      extra.style.display = 'flex';
      let html = '';
      if (data.issuer) {
        html += `<span class="lightbox-id-badge" style="background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.35); color: #fbbf24;">🎖️ ${data.issuer}</span>`;
      }
      if (data.year) {
        html += `<span class="lightbox-id-badge" style="background: rgba(245, 158, 11, 0.12); border-color: rgba(245, 158, 11, 0.25); color: #f59e0b;">📅 Year ${data.year}</span>`;
      }
      extra.innerHTML = html;
    } else if (activeLightboxMode === 'graph') {
      extra.style.display = 'flex';
      let html = '';
      if (data.metric) {
        html += `<span class="lightbox-id-badge" style="background: rgba(6, 182, 212, 0.15); border-color: rgba(6, 182, 212, 0.35); color: #38bdf8;">📊 ${data.metric}</span>`;
      }
      html += `<a href="${data.src}" target="_blank" rel="noopener noreferrer" class="lightbox-verify-btn">
        <span>Inspect Native HD</span>
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
      </a>`;
      extra.innerHTML = html;
    } else {
      extra.style.display = 'none';
      extra.innerHTML = '';
    }
  }
}

function navigateLightbox(direction) {
  let list;
  if (activeLightboxMode === 'cert') {
    list = certData;
  } else if (activeLightboxMode === 'crest') {
    list = crestData;
  } else if (activeLightboxMode === 'graph') {
    list = graphsData;
  } else {
    list = galleryData;
  }
  currentLightboxIndex = (currentLightboxIndex + direction + list.length) % list.length;
  updateLightboxContent();
}

function closeLightbox(event) {
  if (event && event.target !== document.getElementById('lightbox-modal')) return;
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', lightboxKeyHandler);
  if (activeLightboxMode === 'graph' && typeof isGraphSlideshowPlaying !== 'undefined' && isGraphSlideshowPlaying) {
    startGraphTimer();
  }
}

// Allow closing by pressing Escape key or navigating with Arrow keys
function lightboxKeyHandler(e) {
  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowRight') {
    navigateLightbox(1);
  } else if (e.key === 'ArrowLeft') {
    navigateLightbox(-1);
  }
}

/* ==========================================
   17. CRESTS & MEDALS FILTERING
   ========================================== */
function initCrestFilters() {
  const crestFilterBtns = document.querySelectorAll('.crest-filter-btn');
  const crestCards = document.querySelectorAll('.crest-card');
  if (!crestFilterBtns.length || !crestCards.length) return;

  crestFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      crestFilterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');

      crestCards.forEach((card, index) => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        const match = filter === 'all' || categories.includes(filter);

        if (match) {
          card.style.display = 'flex';
          card.classList.remove('pop-anim');
          void card.offsetWidth; // Force reflow
          card.style.animationDelay = `${(index % 6) * 0.05}s`;
          card.classList.add('pop-anim');
        } else {
          card.style.display = 'none';
          card.classList.remove('pop-anim');
        }
      });
    });
  });
}




/* ==========================================
   18. RESEARCH FIGURES & SPATIAL ANALYTICS SLIDESHOW
   ========================================== */
const graphsData = [
  {
    "id": "fig-01",
    "file": "study_area_map_trishal.png",
    "num": "Figure 01",
    "title": "Study Area Map: Multi-Scale Geographic Hierarchy",
    "tag": "GIS Spatial Boundary",
    "category": "spatial",
    "metric": "Trishal & 4 Union Hubs",
    "desc": "Multi-scale geographic GIS mapping establishing the empirical study area: Bangladesh → Mymensingh District → Trishal Upazila, detailing the focal administrative unions of Trishal, Bailar, Balipara, and Amirabari.",
    "src": "images/graphs/graph-study-area.png",
    "thumb": "images/graphs/graph-study-area-thumb.jpg"
  },
  {
    "id": "fig-02",
    "file": "WhatsApp Image 2026-09-21 at 1.47.40 AM.jpeg",
    "num": "Figure 02",
    "title": "Hourly Total Vehicle Volume",
    "tag": "Traffic Flow Analysis",
    "category": "volume",
    "metric": "1,938 Peak Veh/hr",
    "desc": "Continuous longitudinal survey tracking vehicle throughput across daytime and evening hours, capturing distinctive morning and afternoon congestion peaks.",
    "src": "images/graphs/graph-01.jpg",
    "thumb": "images/graphs/graph-01-thumb.jpg"
  },
  {
    "id": "fig-03",
    "file": "WhatsApp Image 2026-09-21 at 1.47.41 AM.jpeg",
    "num": "Figure 03",
    "title": "Hourly Total Passenger Car Units (PCU)",
    "tag": "Capacity & PCU Load",
    "category": "volume",
    "metric": "1,970 Max PCU/hr",
    "desc": "Standardized dynamic passenger car equivalent calculation reflecting the actual road capacity saturation exerted by mixed traffic modes.",
    "src": "images/graphs/graph-02.jpg",
    "thumb": "images/graphs/graph-02-thumb.jpg"
  },
  {
    "id": "fig-04",
    "file": "WhatsApp Image 2026-09-21 at 1.47.41 AM (1).jpeg",
    "num": "Figure 04",
    "title": "Hourly Total Pedestrian Volume",
    "tag": "Pedestrian Dynamics",
    "category": "pedestrian",
    "metric": "4,560 Peak Pedestrians/hr",
    "desc": "High-density pedestrian volume distribution across peak commute windows, showcasing intensive active transport demand between 5:00-6:00 PM.",
    "src": "images/graphs/graph-03.jpg",
    "thumb": "images/graphs/graph-03-thumb.jpg"
  },
  {
    "id": "fig-05",
    "file": "WhatsApp Image 2026-09-21 at 1.47.41 AM (2).jpeg",
    "num": "Figure 05",
    "title": "Directional Traffic Volume Split",
    "tag": "Directional Modeling",
    "category": "volume",
    "metric": "Bus-Stand ⇄ Bazar",
    "desc": "Comparative directional analysis revealing bidirectional tidal flows between the regional transport node (Bus-stand) and the central commercial Bazar district.",
    "src": "images/graphs/graph-04.jpg",
    "thumb": "images/graphs/graph-04-thumb.jpg"
  },
  {
    "id": "fig-06",
    "file": "WhatsApp Image 2026-09-21 at 1.47.41 AM (3).jpeg",
    "num": "Figure 06",
    "title": "Vehicle Composition by Hour",
    "tag": "Modal Composition",
    "category": "composition",
    "metric": "10 Transport Modes",
    "desc": "Hourly classification breakdown across Rickshaws, Bicycles, Motorcycles, CNGs, Mini-Trucks, Cars, and Heavy Buses showing shifting modal shares throughout the day.",
    "src": "images/graphs/graph-05.jpg",
    "thumb": "images/graphs/graph-05-thumb.jpg"
  },
  {
    "id": "fig-07",
    "file": "WhatsApp Image 2026-09-21 at 1.47.41 AM (4).jpeg",
    "num": "Figure 07",
    "title": "Overall Corridor Modal Split",
    "tag": "Modal Split",
    "category": "composition",
    "metric": "Rickshaws #1 Dominant",
    "desc": "Aggregate modal split proving the overwhelmingly non-motorized and paratransit nature of secondary municipal corridors in Bangladesh.",
    "src": "images/graphs/graph-06.jpg",
    "thumb": "images/graphs/graph-06-thumb.jpg"
  },
  {
    "id": "fig-08",
    "file": "WhatsApp Image 2026-09-21 at 1.47.41 AM (5).jpeg",
    "num": "Figure 08",
    "title": "Hourly Pedestrian-to-Vehicle Ratio",
    "tag": "Safety & Space Conflict",
    "category": "pedestrian",
    "metric": "2.8x Pedestrian Dominance",
    "desc": "Critical ratio analyzing road space contestation, showing pedestrians outnumber vehicles by up to nearly 3 to 1 during peak evening market hours.",
    "src": "images/graphs/graph-07.jpg",
    "thumb": "images/graphs/graph-07-thumb.jpg"
  },
  {
    "id": "fig-09",
    "file": "WhatsApp Image 2026-09-21 at 1.47.41 AM (6).jpeg",
    "num": "Figure 09",
    "title": "Pedestrian Volume vs Total Vehicle Volume Correlation",
    "tag": "Bivariate Regression",
    "category": "correlation",
    "metric": "Strong Covariance (R²)",
    "desc": "Scatter plot and regression line illustrating the positive correlation and simultaneous peak congestion between walking pedestrians and vehicular flow.",
    "src": "images/graphs/graph-08.jpg",
    "thumb": "images/graphs/graph-08-thumb.jpg"
  },
  {
    "id": "fig-10",
    "file": "WhatsApp Image 2026-09-21 at 1.47.41 AM (7).jpeg",
    "num": "Figure 10",
    "title": "Pedestrian Volume vs Total PCU Correlation",
    "tag": "Congestion Modeling",
    "category": "correlation",
    "metric": "Capacity Friction",
    "desc": "Empirical relationship between pedestrian footfall and road capacity load (PCUs), measuring pedestrian friction factors in shared right-of-ways.",
    "src": "images/graphs/graph-09.jpg",
    "thumb": "images/graphs/graph-09-thumb.jpg"
  },
  {
    "id": "fig-11",
    "file": "WhatsApp Image 2026-09-21 at 1.47.41 AM (8).jpeg",
    "num": "Figure 11",
    "title": "Weather Observation Timeline",
    "tag": "Environmental Impact",
    "category": "weather",
    "metric": "Clear / Overcast / Sunny",
    "desc": "Hourly meteorological conditions logged synchronously with traffic observations to control for weather-induced variations in mobility.",
    "src": "images/graphs/graph-10.jpg",
    "thumb": "images/graphs/graph-10-thumb.jpg"
  },
  {
    "id": "fig-12",
    "file": "WhatsApp Image 2026-09-21 at 1.47.44 AM.jpeg",
    "num": "Figure 12",
    "title": "Sub-Hour Pedestrian Rate (15-Min Slices)",
    "tag": "Peak Spreading",
    "category": "pedestrian",
    "metric": "15-Min Granularity",
    "desc": "Micro-level temporal granularity revealing short-interval surge rates and immediate surges after transit arrival at transfer hubs.",
    "src": "images/graphs/graph-11.jpg",
    "thumb": "images/graphs/graph-11-thumb.jpg"
  },
  {
    "id": "fig-13",
    "file": "WhatsApp Image 2026-09-21 at 1.47.50 AM.jpeg",
    "num": "Figure 13",
    "title": "Contextual Timeline: Traffic Volume & Weather Interaction",
    "tag": "Integrated Timeline",
    "category": "weather",
    "metric": "Multi-Variable Dual Axis",
    "desc": "Dual-axis synchronized plot combining pedestrian footfall, vehicular throughput, and meteorological state transitions over time.",
    "src": "images/graphs/graph-12.jpg",
    "thumb": "images/graphs/graph-12-thumb.jpg"
  },
  {
    "id": "fig-14",
    "file": "WhatsApp Image 2026-09-21 at 1.47.50 AM (1).jpeg",
    "num": "Figure 14",
    "title": "Spatiotemporal Vehicle Density Heatmap",
    "tag": "Density Heatmap",
    "category": "composition",
    "metric": "Matrix Intensity",
    "desc": "2D heat matrix mapping the concentration of each vehicle class across all time intervals, immediately highlighting persistent bottlenecks.",
    "src": "images/graphs/graph-13.jpg",
    "thumb": "images/graphs/graph-13-thumb.jpg"
  },
  {
    "id": "fig-15",
    "file": "WhatsApp Image 2026-09-21 at 1.47.50 AM (2).jpeg",
    "num": "Figure 15",
    "title": "Vehicle-Type Composition of O-D Trips by Direction",
    "tag": "O-D Survey Analytics",
    "category": "od",
    "metric": "Bidirectional Modal Split",
    "desc": "Origin-Destination survey breakdown revealing differences in modal choices depending on direction toward the commercial core or highway terminal.",
    "src": "images/graphs/graph-14.jpg",
    "thumb": "images/graphs/graph-14-thumb.jpg"
  },
  {
    "id": "fig-16",
    "file": "WhatsApp Image 2026-09-21 at 1.47.50 AM (3).jpeg",
    "num": "Figure 16",
    "title": "Trip Purpose Distribution by Direction",
    "tag": "Trip Generation",
    "category": "od",
    "metric": "Work / Business / Education",
    "desc": "Trip generator profile categorized into business/trade, formal employment, academic access, and domestic shopping trips across directions.",
    "src": "images/graphs/graph-15.jpg",
    "thumb": "images/graphs/graph-15-thumb.jpg"
  },
  {
    "id": "fig-17",
    "file": "WhatsApp Image 2026-09-21 at 1.47.50 AM (4).jpeg",
    "num": "Figure 17",
    "title": "Top Spatial Origin Nodes",
    "tag": "Spatial Hierarchy",
    "category": "od",
    "metric": "Ranked Origin Hubs",
    "desc": "Frequency ranking of primary trip generators, led by Bazar Commercial Core, Bus Stand, Nazrul Academy, and Regional highway links.",
    "src": "images/graphs/graph-16.jpg",
    "thumb": "images/graphs/graph-16-thumb.jpg"
  },
  {
    "id": "fig-18",
    "file": "WhatsApp Image 2026-09-21 at 1.47.50 AM (5).jpeg",
    "num": "Figure 18",
    "title": "Top Spatial Destination Nodes",
    "tag": "Spatial Attraction",
    "category": "od",
    "metric": "Ranked Destinations",
    "desc": "Trip attraction hierarchy led by JKKNIU University Campus, Central Bazar, Regional Bus Terminus, and Local Secondary Colleges.",
    "src": "images/graphs/graph-17.jpg",
    "thumb": "images/graphs/graph-17-thumb.jpg"
  },
  {
    "id": "fig-19",
    "file": "WhatsApp Image 2026-09-21 at 1.47.51 AM.jpeg",
    "num": "Figure 19",
    "title": "Origin × Destination Trip Matrix (Top 10 Nodes)",
    "tag": "O-D Matrix",
    "category": "od",
    "metric": "10×10 Spatial Flow",
    "desc": "Full directional trip interchange matrix detailing pairwise spatial interactions between the 10 highest-density activity centers.",
    "src": "images/graphs/graph-18.jpg",
    "thumb": "images/graphs/graph-18-thumb.jpg"
  },
  {
    "id": "fig-20",
    "file": "WhatsApp Image 2026-09-21 at 1.47.51 AM (1).jpeg",
    "num": "Figure 20",
    "title": "Non-Motorized (NMT) vs Motorized Modal Split",
    "tag": "NMT Sustainability",
    "category": "composition",
    "metric": "75.9% NMT Share",
    "desc": "Directional modal split proving that three-quarters of all corridor passenger movements rely on sustainable, zero-emission non-motorized transport.",
    "src": "images/graphs/graph-19.jpg",
    "thumb": "images/graphs/graph-19-thumb.jpg"
  },
  {
    "id": "fig-21",
    "file": "WhatsApp Image 2026-09-21 at 1.47.51 AM (2).jpeg",
    "num": "Figure 21",
    "title": "Vehicle Mix Used for Each Trip Purpose",
    "tag": "Travel Behavior",
    "category": "od",
    "metric": "Purpose × Mode",
    "desc": "Cross-tabulation assessing vehicle choice variation across economic activities, demonstrating heavy rickshaw reliance for daily market commerce.",
    "src": "images/graphs/graph-20.jpg",
    "thumb": "images/graphs/graph-20-thumb.jpg"
  },
  {
    "id": "fig-22",
    "file": "WhatsApp Image 2026-09-21 at 1.47.51 AM (3).jpeg",
    "num": "Figure 22",
    "title": "Top 10 Origin ➔ Destination Trip Pairs",
    "tag": "Corridor Desire Lines",
    "category": "od",
    "metric": "Key Movement Corridors",
    "desc": "Identification of the highest-volume desire lines across the municipal network, isolating priority corridors for pedestrianization and transit investment.",
    "src": "images/graphs/graph-21.jpg",
    "thumb": "images/graphs/graph-21-thumb.jpg"
  },
  {
    "id": "fig-23",
    "file": "WhatsApp Image 2026-09-21 at 1.47.51 AM (4).jpeg",
    "num": "Figure 23",
    "title": "Intra-Corridor (Local) vs External Through-Trips",
    "tag": "Through-Traffic Analysis",
    "category": "od",
    "metric": "Local vs External Split",
    "desc": "Quantification of bypass versus local access traffic, critical for evaluating municipal bypass ring-road feasibility and town-center calming.",
    "src": "images/graphs/graph-22.jpg",
    "thumb": "images/graphs/graph-22-thumb.jpg"
  },
  {
    "id": "fig-24",
    "file": "WhatsApp Image 2026-09-21 at 1.47.52 AM.jpeg",
    "num": "Figure 24",
    "title": "Busiest Nodes Overall (Total O+D Activity)",
    "tag": "Activity Centers",
    "category": "od",
    "metric": "Total Node Throughput",
    "desc": "Cumulative node activity aggregating departures and arrivals to identify the municipal hubs with highest demand for multimodal interchange infrastructure.",
    "src": "images/graphs/graph-23.jpg",
    "thumb": "images/graphs/graph-23-thumb.jpg"
  },
  {
    "id": "fig-25",
    "file": "WhatsApp Image 2026-09-21 at 1.47.52 AM (1).jpeg",
    "num": "Figure 25",
    "title": "O-D Survey Sample vs Full-Day Traffic Count",
    "tag": "Survey Validation",
    "category": "od",
    "metric": "Sample Fidelity",
    "desc": "Statistical validation verifying that the sample interview distribution closely mirrors the total 12-hour video & manual vehicle count counts.",
    "src": "images/graphs/graph-24.jpg",
    "thumb": "images/graphs/graph-24-thumb.jpg"
  }
];

let currentGraphIndex = 0;
let graphSlideshowTimer = null;
let isGraphSlideshowPlaying = true;
const GRAPH_SLIDE_DURATION = 2000; // 2.0s per slide
let activeGraphLayer = 'a';
let isInitialGraphSlide = true;

function initGraphSlideshow() {
  const container = document.getElementById('graph-slideshow-container');
  if (!container || !graphsData.length) return;

  // Preload all graph figures in browser memory to eliminate any loading pop or flash
  graphsData.forEach((graph) => {
    const preload = new Image();
    preload.src = graph.src;
  });

  const prevBtn = document.getElementById('graph-prev-btn');
  const nextBtn = document.getElementById('graph-next-btn');
  const playPauseBtn = document.getElementById('graph-play-pause-btn');
  const thumbTrack = document.getElementById('graph-thumb-track');

  // Populate Thumbnails in track
  if (thumbTrack) {
    thumbTrack.innerHTML = '';
    graphsData.forEach((graph, idx) => {
      const thumbItem = document.createElement('div');
      thumbItem.className = `graph-thumb-card ${idx === 0 ? 'active' : ''}`;
      thumbItem.setAttribute('data-index', idx);
      thumbItem.setAttribute('title', `${graph.num}: ${graph.title}`);
      thumbItem.innerHTML = `
        <div class="graph-thumb-img-wrap">
          <img src="${graph.thumb || graph.src}" alt="${graph.num}" loading="lazy" class="graph-thumb-img" />
          <span class="graph-thumb-num">${graph.num.replace('Figure ', 'Fig ')}</span>
        </div>
        <div class="graph-thumb-info">
          <span class="graph-thumb-title">${graph.title}</span>
          <span class="graph-thumb-tag">${graph.tag}</span>
        </div>
      `;
      thumbItem.addEventListener('click', () => {
        setGraphSlide(idx);
        restartGraphTimer();
      });
      thumbTrack.appendChild(thumbItem);
    });
  }

  // Previous & Next controls
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateGraphSlide(-1);
      restartGraphTimer();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateGraphSlide(1);
      restartGraphTimer();
    });
  }

  // Play / Pause Toggle
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleGraphSlideshow();
    });
  }

  // Pause on hover
  container.addEventListener('mouseenter', () => {
    if (isGraphSlideshowPlaying) {
      pauseGraphTimer();
    }
  });

  container.addEventListener('mouseleave', () => {
    if (isGraphSlideshowPlaying) {
      startGraphTimer();
    }
  });

  // Touch Swipe for Mobile
  let touchStartX = 0;
  let touchEndX = 0;
  const viewport = document.getElementById('graph-viewport');
  if (viewport) {
    viewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      pauseGraphTimer();
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        navigateGraphSlide(1); // Swipe left -> next
      } else if (touchEndX - touchStartX > 50) {
        navigateGraphSlide(-1); // Swipe right -> prev
      }
      if (isGraphSlideshowPlaying) startGraphTimer();
    }, { passive: true });
  }

  // Set initial slide and start timer
  setGraphSlide(0);
  startGraphTimer();
}

function setGraphSlide(index) {
  currentGraphIndex = (index + graphsData.length) % graphsData.length;
  const data = graphsData[currentGraphIndex];

  const imgA = document.getElementById('graph-img-a');
  const imgB = document.getElementById('graph-img-b');
  const num = document.getElementById('graph-current-num');
  const total = document.getElementById('graph-total-num');
  const title = document.getElementById('graph-active-title');
  const desc = document.getElementById('graph-active-desc');
  const tag = document.getElementById('graph-category-tag');
  const metric = document.getElementById('graph-metric-highlight');

  // Butter-smooth dual layer cross-fade (zero pop, zero blank frame)
  if (imgA && imgB) {
    if (isInitialGraphSlide) {
      imgA.src = data.src;
      imgA.alt = `${data.num}: ${data.title}`;
      imgA.classList.add('active');
      imgB.classList.remove('active');
      activeGraphLayer = 'a';
      isInitialGraphSlide = false;
    } else {
      const currentLayer = activeGraphLayer === 'a' ? imgA : imgB;
      const nextLayer = activeGraphLayer === 'a' ? imgB : imgA;

      nextLayer.src = data.src;
      nextLayer.alt = `${data.num}: ${data.title}`;

      nextLayer.classList.add('active');
      currentLayer.classList.remove('active');
      activeGraphLayer = activeGraphLayer === 'a' ? 'b' : 'a';
    }
  }

  if (num) num.textContent = data.num;
  if (total) total.textContent = String(graphsData.length).padStart(2, '0');
  if (title) title.textContent = `${data.num}: ${data.title}`;
  if (desc) desc.textContent = data.desc;
  if (tag) tag.textContent = data.tag;
  if (metric) metric.textContent = `📊 ${data.metric}`;

  // Update Thumbnail Active States
  const thumbCards = document.querySelectorAll('.graph-thumb-card');
  thumbCards.forEach((card, idx) => {
    if (idx === currentGraphIndex) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  // Smooth scroll ONLY within the horizontal thumbnail track
  // (Prevents browser scrollIntoView from causing vertical page jump)
  const trackOuter = document.getElementById('graph-thumb-track-outer');
  const targetCard = thumbCards[currentGraphIndex];
  if (trackOuter && targetCard) {
    const scrollTarget = targetCard.offsetLeft - (trackOuter.clientWidth / 2) + (targetCard.clientWidth / 2);
    trackOuter.scrollTo({ left: Math.max(0, scrollTarget), behavior: 'smooth' });
  }
}

function navigateGraphSlide(direction) {
  setGraphSlide(currentGraphIndex + direction);
}

function startGraphTimer() {
  clearTimeout(graphSlideshowTimer);
  graphSlideshowTimer = setTimeout(() => {
    navigateGraphSlide(1);
    startGraphTimer();
  }, GRAPH_SLIDE_DURATION);
}

function pauseGraphTimer() {
  clearTimeout(graphSlideshowTimer);
}

function restartGraphTimer() {
  if (isGraphSlideshowPlaying) {
    startGraphTimer();
  }
}

function toggleGraphSlideshow() {
  isGraphSlideshowPlaying = !isGraphSlideshowPlaying;
  const playIcon = document.getElementById('graph-play-icon');
  const pauseIcon = document.getElementById('graph-pause-icon');
  const playText = document.getElementById('graph-play-text');

  if (isGraphSlideshowPlaying) {
    if (playIcon) playIcon.style.display = 'none';
    if (pauseIcon) pauseIcon.style.display = 'inline-block';
    if (playText) playText.textContent = 'Auto-Playing';
    startGraphTimer();
  } else {
    if (playIcon) playIcon.style.display = 'inline-block';
    if (pauseIcon) pauseIcon.style.display = 'none';
    if (playText) playText.textContent = 'Paused';
    pauseGraphTimer();
  }
}

function openActiveGraphModal() {
  openGraphLightbox(currentGraphIndex);
}

function openGraphLightbox(index) {
  pauseGraphTimer();
  activeLightboxMode = 'graph';
  currentLightboxIndex = index;
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;
  updateLightboxContent();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', lightboxKeyHandler);
}
