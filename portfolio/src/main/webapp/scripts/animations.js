// Color constants
const OFF_WHITE = '#ede7f6';
const PORTFOLIO_HOVER_BLUE = '#00bcd4';

// Animation constants
const EASE_IN_RIGHT = {x: '100vw', ease: "Power2.easeOut"};
const EASE_IN_LEFT = {x: '-100vw', ease: "Power2.easeOut"};

// Allow scrolling to trigger section animations
const scrollController = new ScrollMagic.Controller();

// Animate each section
animateLandingPage();
animateAboutMe();
animateWork();

/**
 * Animates the landing page of the website
 */
function animateLandingPage () {
  // Overlay
  gsap.to('.layer-left', {y: '-100vh', delay: .5});
  gsap.to('.layer-middle', {y: '-100vh', delay: .7});
  gsap.to('.layer-right', {y: '-100vh', delay: .9});
  gsap.to('#overlay', {y: '-100vh', delay: 1.5});

  // Rotate circles
  gsap.to('.circle', 20, {rotation:"360", ease: Linear.easeNone, repeat: -1});

  // Fade in portfolio button
  gsap.fromTo('#portfolio-button', 2,
      {opacity: 0}, 
      {x: '0', opacity: 1, ease:'back.out(1.7)', delay: 4.5});

  // Typewriter effect for title
  const mainHeader = document.getElementById('big-header-main')
  const subHeader = document.getElementById('sub-header-main')

  ityped.init(mainHeader, { 
    strings: ["Hi, I'm Sabrina"], 
    typeSpeed: 50, 
    startDelay: 1800, 
    loop: false, 
    showCursor: false,
  });

  ityped.init(subHeader, { 
    strings: ["I like to code"], 
    typeSpeed: 50, 
    startDelay: 3200, 
    loop: false, 
    showCursor: false,
  });
}

/**
 * Animates the About Me section of the website
 */
function animateAboutMe() {
  const aboutmeAnimation = new TimelineMax();

  aboutmeAnimation.from("#selfie-container", 1, EASE_IN_LEFT)
  aboutmeAnimation.from("#bio-text", 1, EASE_IN_RIGHT, "=-1")

  aboutmeAnimation.from("#java", 1, EASE_IN_RIGHT, "=-.9")
  aboutmeAnimation.from("#python", 1, EASE_IN_RIGHT, "=-.9")
  aboutmeAnimation.from("#cpp", 1, EASE_IN_RIGHT, "=-.9")
  aboutmeAnimation.from("#html", 1, EASE_IN_RIGHT, "=-.6")
  aboutmeAnimation.from("#css", 1, EASE_IN_RIGHT, "=-.9")
  aboutmeAnimation.from("#javascript", 1, EASE_IN_RIGHT, "=-.9")

  const aboutmeTrigger = new ScrollMagic.Scene({
    triggerElement: "#about-me-section",
    triggerHook: .8,
  })

  aboutmeTrigger.setTween(aboutmeAnimation).addTo(scrollController)
}

/**
 * Animates the Work section of the website
 */
function animateWork() {
  animateWorkplaceImage(".google", "#google-work", true);
  animateWorkplaceImage(".uf", "#uf-work", false);
  animateWorkplaceImage(".infotech", "#infotech-work", true);
  animateWorkplaceImage(".medtronic", "#medtronic-work", false);
}

// Event handlers

/**
 * When hovering onto the "View My Portfolio" button, animate the 
 * button to blue and rotate the button's arrow.
 */
function portfolioButtonHoverOn() {
  gsap.to('#portfolio-button', {
    backgroundColor: PORTFOLIO_HOVER_BLUE, 
    borderColor: PORTFOLIO_HOVER_BLUE, 
    color: OFF_WHITE, 
  })
  gsap.to("#portfolio-arrow", .2, {rotation: "90", ease: Linear.easeNone});
}

/**
 * When hovering off of the "View My Portfolio" button, animate
 * the button to white and transparent and rotate the button's arrow
 * back.
 */
function portfolioButtonHoverOff() {
  gsap.to('#portfolio-button', {
    backgroundColor: 'transparent', 
    borderColor: OFF_WHITE, 
    color: OFF_WHITE, 
  })
  gsap.to("#portfolio-arrow", .2, {rotation: "0", ease: Linear.easeNone});
}

// Helper functions

/**
 * Function that applies the same animation effect to workplace images as
 * you scroll down.
 * @param {string} imageElementSelector css selector for the image to be animated
 * @param {string} triggerElementSelector css selector for the element that starts the animation
 * @param {boolean} fromLeft whether the image should slide in from the left
 */
function animateWorkplaceImage(imageElementSelector, triggerElementSelector, fromLeft) {
  const animation = gsap.from(imageElementSelector, .75, fromLeft ? EASE_IN_LEFT : EASE_IN_RIGHT)
  const trigger = new ScrollMagic.Scene({triggerElement: triggerElementSelector, triggerHook: .7})
  trigger.setTween(animation).addTo(scrollController)
}
