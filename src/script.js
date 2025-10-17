(() => {
  // Utilities
  const $ = (sel, all = false) => all ? document.querySelectorAll(sel) : document.querySelector(sel);

  /* PRELOADER */
  const preloader = $('#preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('opacity-0');
      document.body.classList.remove('no-scroll');
      setTimeout(() => preloader.style.display = 'none', 500);
    }, 600);
  });


    /* MOBILE MENU */
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('mobileMenu');
    const menuLinks = menu.querySelectorAll('a');

    // Toggle open/close
    menuBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    menu.classList.toggle('opacity-0');
    menu.classList.toggle('opacity-100');
    menu.classList.toggle('pointer-events-none');
    menu.classList.toggle('pointer-events-auto');
    });

    // Close menu when any link is clicked
    menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('hidden');
        menu.classList.remove('opacity-100', 'pointer-events-auto');
        menu.classList.add('opacity-0', 'pointer-events-none');
    });
    });



  /* SCROLL DOWN BUTTON */
  const scrollDown = $('#scrollDown');
  scrollDown?.addEventListener('click', () => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
  });

  /* TYPED EFFECT */
  const typedEl = $('#typed');
  const phrases = ['Web Developer', 'UI/UX Designer', 'Frontend Developer', 'Problem Solver', 'Graphic Designer'];
  let idx = 0, chr = 0, forward = true;
  const typeSpeed = 90;
  function typeLoop() {
    const full = phrases[idx];
    if (forward) {
      chr++;
      typedEl.textContent = full.slice(0, chr);
      if (chr === full.length) {
        forward = false;
        setTimeout(typeLoop, 1000);
        return;
      }
    } else {
      chr--;
      typedEl.textContent = full.slice(0, chr);
      if (chr === 0) {
        forward = true;
        idx = (idx + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, typeSpeed);
  }
  typeLoop();

  /* NAVBAR SCROLL EFFECT */
  const navbar = $('#navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('backdrop-blur-md', 'shadow-lg');
    } else {
      navbar.classList.remove('backdrop-blur-md', 'shadow-lg');
    }
    // Back to top visibility
    const back = $('#backToTop');
    if (!back) return;
    if (window.scrollY > 300) back.classList.remove('hidden'); else back.classList.add('hidden');
  });

  // Back to top
  $('#backToTop')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* INTERSECTION OBSERVER FOR REVEALS */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
      }
    });
  }, { threshold: 0.15 });

  // Add reveal defaults
  const revealEls = document.querySelectorAll('section > .max-w-7xl, section > .max-w-4xl, section > .max-w-3xl');
  revealEls.forEach(el => {
    el.classList.add('opacity-0', 'translate-y-6', 'transition-all', 'duration-700');
    observer.observe(el);
  });

  /* SKILL BARS ANIMATION */
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.style.width || bar.getAttribute('data-w') || bar.classList.contains('w-[90%]') ? bar.classList.contains('w-[90%]') ? '90%' : bar.style.width : '70%';
      }
    });
  }, { threshold: 0.2 });
  skillBars.forEach(b => skillObserver.observe(b));

  /* PROJECT FILTERS */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    filterBtns.forEach(b => b.classList.remove('bg-slate-800'));
    btn.classList.add('bg-slate-800');
    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) card.classList.remove('hidden'); else card.classList.add('hidden');
    });
  }));

  /* PROJECT MODAL */
  const modal = $('#projectModal');
  const modalContent = $('#modalContent');
  document.querySelectorAll('.openProject').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      const img = card.querySelector('img').src;
      const title = card.querySelector('h4').textContent;
      const desc = card.querySelector('p').textContent;
      modalContent.innerHTML = `<img src="${img}" alt="${title}" class="w-full h-64 object-cover rounded" /><div class=\"p-4\"><h4 class=\"font-semibold\">${title}</h4><p class=\"text-sm text-slate-300\">${desc}</p></div>`;
      modal.classList.remove('hidden');
      document.body.classList.add('no-scroll');
    });
  });
  $('#closeModal')?.addEventListener('click', () => { modal.classList.add('hidden'); document.body.classList.remove('no-scroll'); });
  modal?.addEventListener('click', (e) => { if (e.target === modal) { modal.classList.add('hidden'); document.body.classList.remove('no-scroll'); } });

  /* Testimonial Carousal */
    const track = document.querySelector('.carousel-track');
    if (track) {
    let pos = 0;
    const slides = track.children.length;

    function getVisibleCards() {
        return window.innerWidth < 640 ? 1 : 2; // <640px: mobile -> 1 card, else 2 cards
    }

    let visibleCards = getVisibleCards();
    let interval;

    function startCarousel() {
        clearInterval(interval);
        interval = setInterval(() => {
        visibleCards = getVisibleCards();
        pos = (pos + 1) % Math.ceil(slides / visibleCards);
        track.style.transform = `translateX(-${(pos * 100) / visibleCards}%)`;
        }, 5000);
    }

    window.addEventListener('resize', () => {
        visibleCards = getVisibleCards();
        startCarousel();
    });

    startCarousel();
    }
  /* Contact form Validation */
  const form = $('#contactForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const message = $('#message').value.trim();
    if (!name || !email || !message) {
      alert('Please fill all fields');
      return;
    }
    // Simulate sending
    const btn = form.querySelector('button');
    btn.disabled = true; btn.textContent = 'Sending...';
    setTimeout(() => {
      btn.disabled = false; btn.textContent = 'Send Message';
      form.reset();
      alert('Thanks! Your message has been sent (simulation).');
    }, 1200);
  });

  /* YEAR IN FOOTER */
  const yearEl = $('#year'); if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Accessibility: add keyboard support to close modal
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { if (!modal.classList.contains('hidden')) { modal.classList.add('hidden'); document.body.classList.remove('no-scroll'); } } });
})();
