'use strict';

// PRELOAD
const preloader = document.querySelector("[data-preaload]");
window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  preloader.style.opacity = "0";
  preloader.style.visibility = "hidden";
  document.body.classList.add("loaded");
});

// Add event listener on multiple elements
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

// NAVBAR
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

const navLinks = document.querySelectorAll(".navbar-link");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("nav-active");
  });
});

// HEADER & BACK TOP BTN
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");
let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }
  lastScrollPos = window.scrollY;
}

let isScrolling = false;
window.addEventListener("scroll", function () {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      if (window.scrollY >= 50) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
        hideHeader();
      } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
      }
      isScrolling = false;
    });
    isScrolling = true;
  }
});

// HERO SLIDER
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");
let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  currentSlidePos = (currentSlidePos >= heroSliderItems.length - 1) ? 0 : currentSlidePos + 1;
  updateSliderPos();
}

const slidePrev = function () {
  currentSlidePos = (currentSlidePos <= 0) ? heroSliderItems.length - 1 : currentSlidePos - 1;
  updateSliderPos();
}

const resetAutoSlide = function () {
  clearInterval(autoSlideInterval);
  autoSlide();
};

heroSliderNextBtn.addEventListener("click", () => { slideNext(); resetAutoSlide(); });
heroSliderPrevBtn.addEventListener("click", () => { slidePrev(); resetAutoSlide(); });

let autoSlideInterval;
const autoSlide = function () {
  autoSlideInterval = setInterval(slideNext, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", () => clearInterval(autoSlideInterval));
addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);
window.addEventListener("load", autoSlide);

// PARALLAX EFFECT
const parallaxItems = document.querySelectorAll("[data-parallax-item]");

window.addEventListener("mousemove", function (event) {
  const xOffset = ((event.clientX / window.innerWidth) * 10 - 5) * -1;
  const yOffset = ((event.clientY / window.innerHeight) * 10 - 5) * -1;

  parallaxItems.forEach(item => {
    const itemX = xOffset * Number(item.dataset.parallaxSpeed);
    const itemY = yOffset * Number(item.dataset.parallaxSpeed);
    item.style.transform = `translate3d(${itemX}px, ${itemY}px, 0px)`;
  });
});
