// Color constants
const OFF_WHITE = '#ede7f6';
const PORTFOLIO_HOVER_BLUE = '#00bcd4';

// Intro section animations

/* Overlay */
gsap.to('.layer-left', {y: '-100vh', delay: .5});
gsap.to('.layer-middle', {y: '-100vh', delay: .7});
gsap.to('.layer-right', {y: '-100vh', delay: .9});
gsap.to('#overlay', {y: '-100vh', delay: 1.5});

/* Rotate circles */
gsap.to('.circle', 20, {rotation:"360", ease: Linear.easeNone, repeat: -1});

/* Fade in portfolio button */
gsap.fromTo('#portfolio-button', 2,
    {opacity: 0}, 
    {x: '0', opacity: 1, ease:'back.out(1.7)', delay: 5});

// Typewriter effect for title
const mainHeader = document.getElementById('big-header-main')
const name = document.getElementById('name')
const subHeader = document.getElementById('sub-header-main')

ityped.init(mainHeader, { 
  strings: ['Hi, my name is Sabrina'], 
  typeSpeed: 50, 
  startDelay: 1800, 
  loop: false, 
  showCursor: false,
});

ityped.init(subHeader, { 
  strings: ['I like to code'], 
  typeSpeed: 50, 
  startDelay: 3400, 
  loop: false, 
  showCursor: false,
});

// Event handlers

/* Change colors and rotate portfolio arrow on hover */
function portfolioButtonHoverOn() {
  gsap.to('#portfolio-button', {
    backgroundColor: PORTFOLIO_HOVER_BLUE, 
    borderColor: PORTFOLIO_HOVER_BLUE, 
    color: OFF_WHITE, 
  })
  gsap.to("#portfolio-arrow", .2, {rotation: "90", ease: Linear.easeNone});
}

/* Change colors and rotate back portfolio arrow off hover */
function portfolioButtonHoverOff() {
  gsap.to('#portfolio-button', {
    backgroundColor: 'transparent', 
    borderColor: OFF_WHITE, 
    color: OFF_WHITE, 
  })
  gsap.to("#portfolio-arrow", .2, {rotation: "0", ease: Linear.easeNone});
}

// Make scrolling triggers section animations
const scrollController = new ScrollMagic.Controller();

/* About me section */
const aboutmeAnimation = new TimelineMax();

aboutmeAnimation.from('#about-me-title', .6, {opacity: 0})
aboutmeAnimation.from("#selfie-container", 1, {x: '-20vh', opacity: 0})
aboutmeAnimation.from("#bio-text", 1, {x: '20vh', opacity: 0}, "=-1")
aboutmeAnimation.from("#selfie", 1, {x: '-20vh', opacity: 0}, "=-1")

aboutmeAnimation.from(".java", 1, {x: '100vh', ease: "Power2.easeOut"}, "=-1")
aboutmeAnimation.from(".python", 1, {x: '100vh', ease: "Power2.easeOut"}, "=-.9")
aboutmeAnimation.from(".cpp", 1, {x: '100vh', ease: "Power2.easeOut"}, "=-.9")
aboutmeAnimation.from(".html", 1, {x: '100vh', ease: "Power2.easeOut"}, "=-.6")
aboutmeAnimation.from(".css", 1, {x: '100vh', ease: "Power2.easeOut"}, "=-.9")
aboutmeAnimation.from(".javascript", 1, {x: '100vh', ease: "Power2.easeOut"}, "=-.9")

const aboutmeSectionAnimation = new ScrollMagic.Scene({
  triggerElement: "#about-me-section",
  triggerHook: .8,
})

aboutmeSectionAnimation.setTween(aboutmeAnimation).addTo(scrollController)

/* Work Section */
const workAnimation = new TimelineMax();

// animate workplaces in with a slight delay between each
aboutmeAnimation.from("#google-logo", 1, {x: '-100vh', ease: "Power2.easeOut"})
aboutmeAnimation.from("#google-info", 1, {x: '100vh', ease: "Power2.easeOut"}, "=-1")

aboutmeAnimation.from("#uf-info", 1, {x: '-100vh', ease: "Power2.easeOut"}, "=-.8")
aboutmeAnimation.from("#uf-logo", 1, {x: '100vh', ease: "Power2.easeOut"}, "=-1")

aboutmeAnimation.from("#infotech-logo", 1, {x: '-100vh', ease: "Power2.easeOut"}, "=-.8")
aboutmeAnimation.from("#infotech-info", 1, {x: '100vh', ease: "Power2.easeOut"}, "=-1")

aboutmeAnimation.from("#medtronic-info", 1, {x: '-100vh', ease: "Power2.easeOut"}, "=-.8")
aboutmeAnimation.from("#medtronic-logo", 1, {x: '100vh', ease: "Power2.easeOut"}, "=-1")

const workSectionAnimation = new ScrollMagic.Scene({
  triggerElement: "#work-section",
  triggerHook: .8,
})

workSectionAnimation.setTween(workAnimation).addTo(scrollController)
