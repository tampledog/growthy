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
    setTimeout(() => {
      acc.querySelector('.accordion__info').style.overflow = 'visible';
    }, 150);
  }

  clearActive(acc) {
    acc.classList.remove('active');
    acc.querySelector('.accordion__button').classList.remove('active');
    acc.querySelector('.accordion__info').style.height = `0px`;
    acc.querySelector('.accordion__info').style.overflow = 'hidden';
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


class Callback {
  constructor(block) {
    this.body = document.querySelector('body');
    this.block = block;
    this.button = this.block.querySelector('.js-read-callback');
    this.wrapper = null;
    this.closeButton = null;
    this.back = null;
    this.postDate = null;
    this.postContent = null;
    this.postPerson = null;
    this.video = null;

    const createWrapper = () => {
      this.wrapper = document.createElement('div');
      this.back = document.createElement('div');
      this.closeButton = document.createElement('button');
      this.inner = document.createElement('div');
      this.inner.style.opacity = '0';

      this.wrapper.classList.add('callback-popup');
      this.back.classList.add('callback-popup__back');
      this.inner.classList.add('callback-popup__inner');
      this.closeButton.classList.add('callback-popup__close');

      this.inner.append(this.closeButton);
      this.wrapper.append(this.inner);
      this.wrapper.append(this.back);

      this.closeButton.addEventListener('click', () => {
        this.hidePopup();
      });

      this.back.addEventListener('click', () => {
        this.hidePopup();
      });

      document.querySelector('body').append(this.wrapper);
    }

    const addSimpleContent = () => {
      this.postDate = document.createElement('p');
      this.postDate.textContent = this.block.querySelector('.js-callback-date').textContent;
      this.postDate.classList.add('callback-popup__date');

      this.postContent = document.createElement('p');
      this.postContent.textContent = this.block.querySelector('.js-reviews-post').dataset.full;
      this.postContent.classList.add('callback-popup__content');

      this.postPerson = this.block.querySelector('.js-review-person').cloneNode(true);

      this.inner.append(this.postDate);
      this.inner.append(this.postContent);
      this.inner.append(this.postPerson);
    }

    const addVideoContent = () => {
      this.wrapper.classList.add('vid');
      this.postPerson = this.block.querySelector('.js-review-person').cloneNode(true);
      const videoBlock = document.createElement('div');
      videoBlock.classList.add('callback-popup__video-box');

      const videoLink = this.block.dataset.video;

      this.video = document.createElement('video');
      this.video.setAttribute('src', videoLink);
      this.video.setAttribute('controls', true);
      this.video.setAttribute('type', 'video/mp4');

      videoBlock.append(this.video);
      this.inner.append(this.postPerson);
      this.inner.append(videoBlock);
    }

    this.button.addEventListener('click', (e) => {
      e.preventDefault();
      createWrapper();

      if (this.block.classList.contains('review_video')) {
        addVideoContent();
      } else {
        addSimpleContent();
      }

      this.showPopup();
    });
  }

  showPopup() {
    this.body.style.paddingRight = '7px';
    this.body.style.overflow = 'hidden';

    setTimeout(() => {
      this.inner.style.opacity = '1';
    }, 10);
  }

  hidePopup() {
    this.inner.style.opacity = '0';
    this.body.style.paddingRight = '0';
    this.body.style.overflow = 'auto';

    setTimeout(() => {
      setTimeout(() => {
        this.wrapper.remove();
      }, 100);
      this.wrapper.style.opacity = '0';
    }, 230);
  }
}


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

const caseSlider = new Swiper('.js-case-slider .swiper', {
  loop: true,
  autoHeight: false,
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
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 15
    },
    // 920: {
    //
    // },
    1320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
  }
});

const benefitsSliderCheck = () => {
  const element = document.querySelector('.js-benefits-slider .swiper');
  if (!element) return;

  if (window.innerWidth <= 992 && !element.classList.contains('swiper-initialized')) {
    const benefitsSlider = new Swiper(element, {
      loop: true,
      autoHeight: false,
      spaceBetween: 100,

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
          spaceBetween: 15
        },
        // 920: {
        //
        // },
        1320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
      }
    });
  }
}

benefitsSliderCheck();
window.addEventListener('resize', () => {
  benefitsSliderCheck();
})

function articleShareWatch() {
  const block = document.querySelector('.js-article-share');

  if (!block) return;

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


const rewSlider = new Swiper('.js-reviews-slider-new .swiper', {
  loop: !0,
  autoHeight: false,
  spaceBetween: 20,
  speed: 400,
  slidesPerView:"auto",

  navigation: {
    nextEl: '.js-reviews-slider-new .swiper-button-next',
    prevEl: '.js-reviews-slider-new .swiper-button-prev',
  },

  pagination: {
    el: '.js-reviews-slider-new .swiper-pagination',
    type: 'bullets',
    dynamicBullets: true,
    clickable: true,
  },
});

$(document).ready(function () {
  const body = document.querySelector('body');

  const contactsFormPlacer = () => {
    const container = document.querySelector('.contacts-top');
    if (!container) return;

    const form = container.querySelector('.contacts-top-form');
    const mobilePlace = container.querySelector('.contacts-top__form-place');
    const desktopPlace = container.querySelector('.contacts-top__form');

    const placeForm = () => {
      if (window.innerWidth <= 992) {
        mobilePlace.append(form);
      } else {
        desktopPlace.append(form);
      }
    }

    window.addEventListener('resize', () => {
      placeForm();
    });

    placeForm();
  }

  contactsFormPlacer();


  const cvFormPopup = () => {
    const popup = document.querySelector('.js-cv-form');

    if (!popup) return;

    const popupInner = popup.querySelector('.cv-form__wrapper');
    const closeButtons = popup.querySelectorAll('.js-cv-close');
    const buttons = document.querySelectorAll('.js-cv-button');

    const inputBox = document.querySelector('.js-file-input');
    const input = inputBox.querySelector('input');
    const textField = inputBox.querySelector('span');

    input.addEventListener('change', () => {
      if (input.files.length > 0) {
        const fileName = input.files[0].name;
        textField.textContent = `${fileName}`;
      } else {
        textField.textContent = 'CV Додати резюме';
      }
    })

    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        popup.classList.add('active');
        body.classList.add('cv-open');
      });
    });

    closeButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        popupInner.style.opacity = 0;

        setTimeout(() => {
          popupInner.style.opacity = 1;
          popup.classList.remove('active');
          body.classList.remove('cv-open');
          input.value = '';
          textField.textContent = 'CV Додати резюме';
        }, 450)
      });
    })
  }

  cvFormPopup();

  const careerSlider = () => {
    const block = $('.js-reviews-slider-new');
    if (!block) return;

    const body = block.find('.career-slider__body');
    const dots = block.find('.career-slider__dots');
    const slides = block.find('.career-slider__slide');

    slides.each(() => {
      const div = document.createElement('div');
      const button = document.createElement('div');

      div.classList.add('career-slider__dot');
      button.classList.add('career-slider__dot-inner');

      div.append(button);
      dots.append(div);
    })


    body.slick({
      slidesToShow: 2,
      variableWidth: true,
      prevArrow: block.find('.js-prev'),
      nextArrow: block.find('.js-next'),
      dots: false,
      infinite: true,
      asNavFor: dots,

      responsive: [
        {
          breakpoint: 992,
          settings: {
            variableWidth: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
      ]
    });

    dots.slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: body,
      arrows: false,
      dots: false,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: '20%',
    })
  }
  careerSlider();

  const agenciesSlider = () => {
    const createSlider = () => {
      const sliderElement = $('.js-agencies-slider');
      const dots = $('.js-agencies-dots');

      if (!sliderElement) return;

      if (window.innerWidth <= 992) {
        if (sliderElement.hasClass('slick-initialized')) {
          return;
        }

        const slides = sliderElement.find('.structure-item:not(.structure-item--central)');

        slides.each(() => {
          const div = document.createElement('div');
          const button = document.createElement('div');

          div.classList.add('career-slider__dot');
          button.classList.add('career-slider__dot-inner');

          div.append(button);
          dots.append(div);
        })

        sliderElement.slick({
          slidesToShow: 1,
          arrows: false,
          dots: false,
          infinite: true,
          initialSlide: 1,
          asNavFor: dots,

          responsive: [
            {
              breakpoint: 992,
              settings: {
                variableWidth: false,
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            },
          ]
        });

        dots.slick({
          initialSlide: 1,
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: sliderElement,
          arrows: false,
          dots: false,
          centerMode: true,
          focusOnSelect: true,
          centerPadding: '20%',
        })
      } else {
        if (sliderElement.hasClass('slick-initialized')) {
          sliderElement.slick('unslick');
          dots.slick('unslick');
        }
      }


    }

    window.addEventListener('resize', () => {
      createSlider();
    });

    createSlider();

  }
  agenciesSlider();

  const videoSlider = () => {
    const createSlider = () => {
      const mainSliderBlock = $('.js-video-reviews-slider');
      const sliderMain = mainSliderBlock.find('.callback-page__slider-inner');
      const dotsNew = mainSliderBlock.find('.callback-page__slider-dots');
      const slides = mainSliderBlock.find('.reviews-page__slider-item');

      slides.each(() => {
        const div = document.createElement('div');
        const button = document.createElement('div');

        div.classList.add('career-slider__dot');
        button.classList.add('career-slider__dot-inner');

        div.append(button);
        dotsNew.append(div);
      })

      sliderMain.slick({
        slidesToShow: 1,
        arrows: false,
        dots: false,
        infinite: true,
        initialSlide: 1,
        asNavFor: dotsNew,
        variableWidth: true,

        responsive: [
          {
            breakpoint: 480,
            settings: {
              variableWidth: false,
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
        ]
      });

      dotsNew.slick({
        initialSlide: 1,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: sliderMain,
        arrows: false,
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        centerPadding: '20%',
      })
    }

    createSlider();
  }
  videoSlider();


  const clearSlider = () => {
    const createSlider = () => {
      const block = $('.js-clear-slider');
      const mainSlider = block.find('.clear-block__slider-main');
      const dotsSlider = block.find('.clear-block__slider-dots');
      const slides = mainSlider.find('.clear-block__slide');

      slides.each(() => {
        const div = document.createElement('div');
        const button = document.createElement('div');

        div.classList.add('career-slider__dot');
        button.classList.add('career-slider__dot-inner');

        div.append(button);
        dotsSlider.append(div);
      });

      mainSlider.slick({
        slidesToShow: 1,
        arrows: false,
        dots: false,
        infinite: true,
        asNavFor: dotsSlider,
        variableWidth: true,

        responsive: [
          {
            breakpoint: 480,
            settings: {
              variableWidth: false,
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
        ]
      });

      dotsSlider.slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: mainSlider,
        arrows: false,
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        centerPadding: '20%',
      })
    }

    createSlider();
  }

  clearSlider();



  const callbacks = document.querySelectorAll('.js-callback');
  callbacks.forEach((item) => {
    new Callback(item);
  })

});