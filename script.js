/* =========================================================
   PERSONAL BIODATA WEBSITE — script.js
   Berisi: mobile menu, navbar scroll effect, active nav link,
   scroll reveal animation, dan gallery lightbox/modal.
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------
     1. NAVBAR: efek berbayang ketika halaman di-scroll
  ------------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  /* -------------------------------------------------------
     2. HAMBURGER MENU (mobile)
  ------------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', toggleMenu);

  // Tutup menu mobile setiap kali sebuah link navigasi diklik
  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  /* -------------------------------------------------------
     3. ACTIVE NAVIGATION LINK berdasarkan section yang terlihat
  ------------------------------------------------------- */
  const sections = document.querySelectorAll('main section[id]');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    {
      root: null,
      rootMargin: '-45% 0px -50% 0px', // aktif ketika section berada di tengah layar
      threshold: 0,
    }
  );

  sections.forEach((section) => navObserver.observe(section));

  /* -------------------------------------------------------
     4. SCROLL REVEAL ANIMATION (fade-up, fade-left, fade-right)
        Menggunakan Intersection Observer agar ringan & halus.
  ------------------------------------------------------- */
  const animatedElements = document.querySelectorAll('[data-animate]');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); // animasi cukup sekali
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  animatedElements.forEach((el, index) => {
    // sedikit delay bertahap agar kartu-kartu muncul berurutan
    el.style.transitionDelay = `${(index % 6) * 70}ms`;
    revealObserver.observe(el);
  });

  /* -------------------------------------------------------
     5. GALLERY LIGHTBOX / MODAL
  ------------------------------------------------------- */
  const galleryItems = document.querySelectorAll('.gallery__item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(imgEl) {
    lightboxImg.src = imgEl.getAttribute('src');
    lightboxImg.alt = imgEl.getAttribute('alt') || '';
    lightboxCaption.textContent = imgEl.getAttribute('data-caption') || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // cegah scroll di belakang modal
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  galleryItems.forEach((img) => {
    img.addEventListener('click', () => openLightbox(img));
  });

  // Tutup modal lewat tombol close
  lightboxClose.addEventListener('click', closeLightbox);

  // Tutup modal ketika klik area gelap di luar foto
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Tutup modal dengan tombol Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

});
