/* ── Scroll Reveal Animation ─────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => observer.observe(el));

  /* ── Navbar scroll effect ─────────────────────────── */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.background = 'rgba(8,11,20,0.95)';
    } else {
      navbar.style.background = 'rgba(8,11,20,0.7)';
    }
  });

  /* ── Stat counter animation ───────────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCount(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => countObserver.observe(el));

  function animateCount(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  /* ── Platform Explorer Tabs ───────────────────────── */
  const tabs = document.querySelectorAll('.explorer-tab');
  const previews = document.querySelectorAll('.preview-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;

      previews.forEach(p => {
        p.style.display = p.dataset.panel === target ? 'block' : 'none';
      });
    });
  });

  /* ── How It Works scroll activation ───────────────── */
  const steps = document.querySelectorAll('.step-row');
  const timelineLine = document.querySelector('.timeline-line');

  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.5 });

  steps.forEach(s => stepObserver.observe(s));

  if (timelineLine) {
    window.addEventListener('scroll', () => {
      const section = document.getElementById('how-it-works');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(scrolled / (sectionHeight - window.innerHeight), 1);
      timelineLine.style.height = (progress * 100) + '%';
    });
  }

  /* ── Hero chat animation ──────────────────────────── */
  const chatBubbles = document.querySelectorAll('.chat-bubble');
  chatBubbles.forEach((bubble, i) => {
    bubble.style.opacity = '0';
    bubble.style.transform = 'translateY(10px)';
    setTimeout(() => {
      bubble.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      bubble.style.opacity = '1';
      bubble.style.transform = 'translateY(0)';
    }, 800 + i * 600);
  });

  /* ── Smooth anchor scroll ─────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
