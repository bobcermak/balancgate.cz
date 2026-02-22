import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

//scroll to hash on page load (cross-page navigation)
window.addEventListener('load', () => {
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }
});

//page__price-list - click
const screen = gsap.matchMedia();
function toggleExpand(buttonSelector, contentSelector) {
  const button = document.querySelector(buttonSelector);
  const content = document.querySelector(contentSelector);
  if (!button || !content) return;
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
          ease: 'power2.easeInOut',
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
          ease: 'power2.easeInOut'
        });
    }
  });
}

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
    ".page__header-welcome--deep-massage-content-list-item",
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
    ease: "power2.easeInOut",
    stagger: 0.15,
    scrollTrigger: {
      trigger: ".page__header-welcome",
      start: "top 80%",
      once: true
    }
  }
);
const serviceSections = document.querySelectorAll(".page__back-neck, .page__arms-foots, .page__full-60, .page__full-90, .page__massage-benefits");
serviceSections.forEach(section => {
  const isWideScreen = window.matchMedia("(min-width: 1281px)").matches;
  const elements = isWideScreen
    ? [
      section.querySelector(".page__massage-benefits-header"),
      section.querySelector(".page__massage-benefits-container-header"),
      ...section.querySelectorAll(".page__massage-benefits-container-text p"),
      ...section.querySelectorAll(".page__massage-benefits-container-list-item"),
      section.querySelector(".page__massage-benefits-container-info")
    ]
    : [
      section.querySelector(".page__massage-benefits-header"),
      ...section.querySelectorAll(".page__massage-benefits-container-text p"),
      ...section.querySelectorAll(".page__massage-benefits-container-list-item"),
      section.querySelector(".page__massage-benefits-container-info"),
      section.querySelector(".page__massage-benefits-container-header")
    ];
  gsap.fromTo(
    elements.filter(Boolean),
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
      duration: 0.7,
      ease: "power2.easeInOut",
      stagger: 0.08,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        once: true
      }
    }
  );
});

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
    ease: "power2.easeInOut",
    stagger: 0.12,
    scrollTrigger: {
      trigger: ".page__gallery",
      start: "top 80%",
      once: true
    }
  }
);

//page__education - animation (about page)
gsap.fromTo(
  [
    ".page__education-header",
  ],
  {
    opacity: 0,
    y: -40,
    filter: "blur(8px)"
  },
  {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.9,
    ease: "power2.easeInOut",
    scrollTrigger: {
      trigger: ".page__education",
      start: "top 80%",
      once: true
    }
  }
);
gsap.fromTo(
  ".page__education-image-container",
  {
    opacity: 0,
    scale: 0.92,
    filter: "blur(6px)"
  },
  {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    duration: 1,
    ease: "power2.easeInOut",
    scrollTrigger: {
      trigger: ".page__education",
      start: "top 70%",
      once: true
    }
  }
);
gsap.fromTo(
  [
    ".page__education-content-container-text",
    ".page__education-content-container-list-item",
    ".page__education-content-container-button"
  ],
  {
    opacity: 0,
    x: -40,
    filter: "blur(6px)"
  },
  {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 0.8,
    ease: "power2.easeInOut",
    stagger: 0.12,
    scrollTrigger: {
      trigger: ".page__education-content-container",
      start: "top 80%",
      once: true
    }
  }
);

//page__skills - header animation (about page)
gsap.fromTo(
  [
    ".page__skills-header",
    ".page__skills-content"
  ],
  {
    opacity: 0,
    y: 50,
    filter: "blur(8px)"
  },
  {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 0.9,
    ease: "power2.easeInOut",
    stagger: 0.15,
    scrollTrigger: {
      trigger: ".page__skills",
      start: "top 80%",
      once: true
    }
  }
);

//page__skills-stats - counter animation (about page)
const statItems = document.querySelectorAll(".page__skills-stats-list-item-data");
if (statItems.length) {
  gsap.fromTo(
    ".page__skills-stats-list-item",
    {
      opacity: 0,
      y: 30,
      scale: 0.9
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: "back.out(1.4)",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".page__skills-stats",
        start: "top 85%",
        once: true
      }
    }
  );

  // count-up for each number
  statItems.forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || "";
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: "power1.easeInOut",
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          }
        });
      }
    });
  });
}