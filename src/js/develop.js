class Accordions {
  constructor(container) {
    this.container = container;
    this.active = undefined;
    this.accordions = container.querySelectorAll('.accordion');

    this.accordions.forEach((accordion) => {
      accordion.querySelector('.accordion__header').addEventListener('click', () => {
        if (this.active === accordion) {
          this.clearActive(this.active);
          return this.active = undefined;
        }

        if (this.active) {
          this.clearActive(this.active);
        }

        this.makeActive(accordion);
        this.active = accordion;
      });
    });
  }

  makeActive(acc) {
    acc.classList.add('active');
    acc.querySelector('.accordion__button').classList.add('active');

    const contentHeight = acc.querySelector('.accordion__inner').clientHeight;
    acc.querySelector('.accordion__info').style.height = `${contentHeight}px`;
  }

  clearActive(acc) {
    acc.classList.remove('active');
    acc.querySelector('.accordion__button').classList.remove('active');
    acc.querySelector('.accordion__info').style.height = `0px`;
  }
}

const accordionsContainers = document.querySelectorAll('.js-accordions');

accordionsContainers.forEach((item) => {
  new Accordions(item);
});


class RatingStars {
  constructor(container) {
    this.container = container;
    this.stars = container.querySelectorAll('.stars__item');

    this.stars.forEach((star) => {
      star.addEventListener('click', (e) => {
        e.preventDefault();
        this.clear()
        star.classList.add('active');
        this.activeStar = star;
      })
    })
  }

  clear() {
    this.stars.forEach((star) => {
        star.classList.remove('active');
    })
  }
}

const ratingStars = document.querySelectorAll('.js-rating-stars');
ratingStars.forEach((item) => {
  new RatingStars(item);
});



const articleSlider = new Swiper('.js-article-slider .swiper', {
  loop: true,
  autoHeight: true,
  spaceBetween: 100,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    dynamicBullets: true,
    clickable: true,
  },
});

const thematicSlider = new Swiper('.js-thematic-slider .swiper', {
  loop: false,
  autoHeight: true,
  spaceBetween: 20,
  slidesPerView: 1,
  // autoplay: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    dynamicBullets: true,
    clickable: true,
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1320: {
      slidesPerView: 3,
      spaceBetween: 20
    },
  }
});

function articleShareWatch() {
  const block = document.querySelector('.js-article-share');
  const asideTarget = document.querySelector('.js-share-aside-target');
  const mainTarget = document.querySelector('.js-share-main-target');

  const moveBlock = () => {
    if (window.innerWidth <= 1320) {
      mainTarget.append(block);
    } else {
      asideTarget.append(block);
    }
  }

  moveBlock();

  window.addEventListener('resize', () => {
    moveBlock();
  });
}

articleShareWatch();
