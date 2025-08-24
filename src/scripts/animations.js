import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger,ScrollSmoother,ScrollToPlugin);

//ScrollSmoother
ScrollSmoother.create({
  smooth: 1.25,
  effects: true
});

//ScrollToPlugin
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const url = new URL(href, window.location.origin);
    const hash = url.hash;
    const page = url.pathname.split('/').pop() || 'index.html';
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (hash && page === currentPage) {
      const targetEl = document.querySelector(hash);
      if (targetEl) {
        gsap.to(window, {
          scrollTo: hash,
          ease: "power2.inOut"
        });
      }
    } else {
      if (hash) sessionStorage.setItem('scrollToHash', hash);
      window.location.href = url.pathname;
    }
  });
});
window.addEventListener('load', () => {
  const hash = sessionStorage.getItem('scrollToHash') || window.location.hash;
  if (hash) {
    sessionStorage.removeItem('scrollToHash');
    const targetEl = document.querySelector(hash);
    if (targetEl) {
      window.scrollTo(0, 0);
      gsap.to(window, {
        scrollTo: hash,
        ease: "power2.inOut"
      });
    }
  }
});

//page__price-list - click
const screen = gsap.matchMedia();
function toggleExpand(buttonSelector, contentSelector) {
  const button = document.querySelector(buttonSelector);
  const content = document.querySelector(contentSelector);
  let isOpen = false;
  let anim;
  gsap.set(content, {
    height: 0,
    opacity: 0,
    marginTop: 0,
    pointerEvents: 'none'
  });
  button.addEventListener('click', () => {
    if (anim) anim.kill();
    isOpen = !isOpen;
    button.classList.toggle('active');
    if (isOpen) {
      gsap.set(content, { height: 'auto' });
      const fullHeight = content.offsetHeight;
      gsap.set(content, { height: 0 });
      anim = gsap.timeline()
        .to(content, {
          height: fullHeight,
          opacity: 1,
          pointerEvents: 'auto',
          duration: 0.6,
          marginTop: '2.5rem',
          ease: 'power2.inOut',
          onComplete: () => {
            content.style.height = 'auto';
          }
        });
    }
    else {
      anim = gsap.timeline()
        .to(content, {
          height: 0,
          opacity: 0,
          pointerEvents: 'none',
          marginTop: 0,
          duration: 0.6,
          ease: 'power2.inOut'
        });
    }
  });
}
screen.add("(max-width: 1281px)", () => {
  toggleExpand(".button-on-click.button-on-click--gray.button-icon.button-icon--chevron-down", ".page__price-list-cards-second");
});

//page__how-to-vouchers - main - animation
const section = document.querySelector('.page__how-to-vouchers');
const animationThreshold = .5;
if (section) {
  const elementsToAnimate = [
    document.querySelector(".wave-animation-bg-mobile"),
    document.querySelector(".wave-animation-bg-desktop"),
    document.querySelector(".voucher-step-write"),
    document.querySelector(".voucher-step-confirm"),
    document.querySelector(".voucher-step-pickup"),
  ].filter(Boolean);
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= animationThreshold) {
          elementsToAnimate.forEach(el => el.classList.add('animation'));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: [animationThreshold] }
  );
  observer.observe(section);
}

//page__header-welcome - animation
gsap.fromTo(
  [
    ".page__header-welcome-header",
    ".page__header-welcome-buttons-list li"
  ],
  {
    opacity: 0,
    y: 60,
    filter: "blur(12px)"
  },
  {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 1,
    ease: "power2.inOut",
    stagger: 0.15,
    scrollTrigger: {
      trigger: ".page__header-welcome",
      start: "top 80%",
      once: true
    }
  }
);

//page__massage-benefits - animation
const isWideScreen = window.matchMedia("(min-width: 1281px)").matches;
const elements = isWideScreen
? [
    ".page__massage-benefits-header",
    ".page__massage-benefits-container-header",
    ".page__massage-benefits-container-text p",
    ".page__massage-benefits-container-list-item",
    ".page__massage-benefits-container-info"
  ]
: [
    ".page__massage-benefits-header",
    ".page__massage-benefits-container-text p",
    ".page__massage-benefits-container-list-item",
    ".page__massage-benefits-container-info",
    ".page__massage-benefits-container-header"
  ];
gsap.fromTo(
  elements,
  {
    opacity: 0,
    x: -60,
    scale: 0.96,
    filter: "blur(10px)"
  },
  {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    duration: 1,
    ease: "power2.inOut",
    stagger: 0.13,
    scrollTrigger: {
      trigger: ".page__massage-benefits",
      start: "top 80%",
      once: true
    }
  }
);

//page__price-list - animation
gsap.fromTo(
  [
    ".page__price-list-header",
    ".price-list-card",
    ".page__price-list-explanation"
  ],
  {
    opacity: 0,
    y: 60,
    scaleY: 0.92
  },
  {
    opacity: 1,
    y: 0,
    scaleY: 1,
    duration: 1,
    ease: "back.out(1.4)",
    stagger: 0.14,
    scrollTrigger: {
      trigger: ".page__price-list",
      start: "top 80%",
      once: true
    }
  }
);

//page__gallery - animation
gsap.fromTo(
  [
    ".page__gallery header > div",
    ".page__gallery figure"
  ],
  {
    opacity: 0,
    x: 60,
    rotate: 4,
    filter: "blur(8px)"
  },
  {
    opacity: 1,
    x: 0,
    rotate: 0,
    filter: "blur(0px)",
    duration: 1,
    ease: "power2.inOut",
    stagger: 0.12,
    scrollTrigger: {
      trigger: ".page__gallery",
      start: "top 80%",
      once: true
    }
  }
);