const hamburgerBtn = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

// SHOW/HIDE MOBILE MENU
hamburgerBtn.addEventListener('click', (e) => {
  menu.classList.toggle('menu--open');
  e.currentTarget.classList.toggle('hamburger--open');
});

// HERO SLIDER
const heroSwiper = new Swiper('.hero-slider', {
  allowTouchMove: false,
  centeredSlides: true,
  speed: 600,
  loop: true,

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

// TESTIMONIAL SLIDER
const testimonialSwiper = new Swiper('.testimonial-slider', {
  loop: true,
  spaceBetween: 30,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// GALLERY SLIDER
lightGallery(document.querySelector('.gallery'), {
  width: '1000px',
  height: '1000px',
});

// COUNTERS
const runCounters = function () {
  const countersEl = document.querySelectorAll('.counter__number');

  countersEl.forEach((counter, index, arr) => {
    const endValue = counter.dataset.value;
    let prevTime = performance.now();
    let curValue = 0;
    let inc = 0.04 * endValue;

    const run = function (currTime) {
      if (currTime - prevTime > 10 && curValue < endValue) {
        curValue += inc;

        if (curValue > endValue) {
          curValue = endValue;
          counter.textContent =
            index === arr.length - 1 ? `${curValue}+` : curValue;
          return;
        }
        counter.textContent =
          index === arr.length - 1
            ? `${Math.floor(curValue)}+`
            : Math.floor(curValue);
        prevTime = currTime;
      }
      requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  });
};

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounters();
        observer.disconnect();
      }
    });
  },
  { threshold: 0.1 }
);

observer.observe(document.querySelector('.section-about__countersbox'));

// MODAL BOOK
const modalEl = document.querySelector('.modal');

const openModal = function (e) {
  if (e.target.classList.contains('btn')) {
    modalEl.classList.add('modal--open');
  }
};

const closeModal = function () {
  modalEl.classList.remove('modal--open');
};

document
  .querySelectorAll('.header__btn, .section-tours__container')
  .forEach((el) => el.addEventListener('click', openModal));

document
  .querySelector('.modal__btn-close')
  .addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modalEl.classList.contains('modal--open')) {
    closeModal();
  }
});
