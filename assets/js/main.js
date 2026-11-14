/**
 * RPV STUDIO — Interactive Functionality & Modern UI Components
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Mobile Navigation Drawer
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const drawerBackdrop = document.querySelector('.mobile-drawer-backdrop');
  const drawerClose = document.querySelector('.mobile-drawer-close');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  // 3. Lightbox Functionality
  const lightboxModal = document.querySelector('.lightbox-modal');
  const lightboxImg = document.querySelector('.lightbox-content img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');

  let currentGalleryItems = [];
  let currentLightboxIndex = 0;

  function updateLightboxItems() {
    const visibleItems = Array.from(document.querySelectorAll('.gallery-item:not([style*="display: none"])'));
    currentGalleryItems = visibleItems.map(item => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-caption') || item.querySelector('.gallery-tag');
      return {
        src: item.getAttribute('data-full') || (img ? img.getAttribute('src') : ''),
        caption: caption ? caption.textContent.trim() : (img ? img.getAttribute('alt') : '')
      };
    });
  }

  function openLightbox(index) {
    if (!lightboxModal || currentGalleryItems.length === 0) return;
    currentLightboxIndex = index;
    const item = currentGalleryItems[currentLightboxIndex];
    if (item && lightboxImg) {
      lightboxImg.src = item.src;
      if (lightboxCaption) lightboxCaption.textContent = item.caption;
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function showNextLightbox() {
    if (currentGalleryItems.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % currentGalleryItems.length;
    openLightbox(currentLightboxIndex);
  }

  function showPrevLightbox() {
    if (currentGalleryItems.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
    openLightbox(currentLightboxIndex);
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevLightbox);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Keyboard navigation for lightbox
  window.addEventListener('keydown', (e) => {
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNextLightbox();
      if (e.key === 'ArrowLeft') showPrevLightbox();
    }
    if (videoModal && videoModal.classList.contains('active')) {
      if (e.key === 'Escape') closeVideoModal();
    }
    if (bookingModal && bookingModal.classList.contains('active')) {
      if (e.key === 'Escape') closeBookingModal();
    }
  });

  // Attach click to gallery items
  function attachGalleryClicks() {
    updateLightboxItems();
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        updateLightboxItems();
        const src = item.getAttribute('data-full') || item.querySelector('img').getAttribute('src');
        const index = currentGalleryItems.findIndex(i => i.src === src);
        if (index !== -1) {
          openLightbox(index);
        } else {
          openLightbox(0);
        }
      });
    });
  }
  attachGalleryClicks();

  // 4. Category Filtering for Portfolio / Gallery
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItemsAll = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItemsAll.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue || (itemCategory && itemCategory.includes(filterValue))) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
      updateLightboxItems();
    });
  });

  // 5. Video Player Modal
  const videoModal = document.querySelector('.video-modal');
  const videoIframe = document.querySelector('.video-modal-inner iframe');
  const videoTriggers = document.querySelectorAll('[data-video-id]');

  function openVideoModal(videoId) {
    if (!videoModal || !videoIframe) return;
    videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    if (!videoModal || !videoIframe) return;
    videoIframe.src = '';
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  videoTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const vidId = trigger.getAttribute('data-video-id');
      if (vidId) openVideoModal(vidId);
    });
  });

  const videoModalClose = document.querySelector('.video-modal-close');
  if (videoModalClose) videoModalClose.addEventListener('click', closeVideoModal);
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }

  // 6. Booking / Enquiry Modal
  const bookingModal = document.querySelector('.booking-modal');
  const bookingTriggers = document.querySelectorAll('.open-booking-modal');
  const bookingClose = document.querySelector('.booking-modal-close');
  const bookingForm = document.getElementById('bookingForm');
  const serviceSelect = document.getElementById('sessionType');

  function openBookingModal(preselectedService) {
    if (!bookingModal) return;
    if (preselectedService && serviceSelect) {
      serviceSelect.value = preselectedService;
    }
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeBookingModal() {
    if (!bookingModal) return;
    bookingModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  bookingTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      openBookingModal(service);
    });
  });

  if (bookingClose) bookingClose.addEventListener('click', closeBookingModal);
  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeBookingModal();
    });
  }

  // Booking Form Submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const alertBox = bookingForm.querySelector('.form-alert');
      if (alertBox) {
        alertBox.textContent = "Thank you! Your enquiry has been received. Our team will contact you within 24 hours.";
        alertBox.classList.add('success');
      }
      setTimeout(() => {
        bookingForm.reset();
        setTimeout(closeBookingModal, 2000);
      }, 1500);
    });
  }

  // 7. Contact Page Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const alertBox = contactForm.querySelector('.form-alert');
      if (alertBox) {
        alertBox.textContent = "Thank you for reaching out! We have received your message and will call or email you shortly.";
        alertBox.classList.add('success');
      }
      contactForm.reset();
    });
  }
});

