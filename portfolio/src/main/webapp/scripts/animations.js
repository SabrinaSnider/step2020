/* intro section animations */

gsap.to('.layer-1', { y: '-100vh', delay: .5 });
gsap.to('.layer-2', { y: '-100vh', delay: .7 });
gsap.to('.layer-3', { y: '-100vh', delay: .9 });
gsap.to('#overlay', { y: '-100vh', delay: 1.5 });
gsap.to('.circle', 20, { rotation:"360", ease: Linear.easeNone, repeat: -1 });

gsap.fromTo('.circle-small', 
  { x: '10rem', opacity: 0 }, 
  { x: '0', opacity: 1, ease:'back.out(1.7)', delay: 1.8 }
);

gsap.fromTo('.circle-large', 
  { x: '-10rem', opacity: 0 }, 
  { x: '0', opacity: 1, ease:'back.out(1.7)', delay: 2.5 }
);

gsap.fromTo('#intro-content', 2,
  { opacity: 0 }, 
  { x: '0', opacity: 1, ease:'back.out(1.7)', delay: 3.2 }
);

/* event handlers */

// Change colors and rotate arrow on hover
function portfolioBtnHoverOn() {
  fadeButton('#portfolio-button', '#00bcd4', '#00bcd4', '#ede7f6');
  gsap.to("#portfolio-arrow", .2, { rotation: "90", ease: Linear.easeNone });
}

// Change colors and rotate arrow off hover
function portfolioBtnHoverOff() {
  fadeButton('#portfolio-button', 'transparent', '#ede7f6', '#ede7f6');
  gsap.to("#portfolio-arrow", .2, { rotation: "0", ease: Linear.easeNone });
}

// Fade a button with the given colors and time
function fadeButton(id, backgroundColor, borderColor, textColor, easeDuration) {
  gsap.to(id, { 
    backgroundColor: backgroundColor, 
    borderColor: borderColor, 
    color: textColor, 
    ease:`power1.out(${easeDuration})` 
  })
}

// Change skill dots on/off hover
function toggleDot(id, years) {
  const dot = document.getElementById(id);
  if (dot.classList.contains('flipped')) {
    dot.classList.remove('flipped');
    gsap.to("#" + id, 1, { backgroundColor: '#b39ddb' })
    dot.innerText = id;
  } else {
    dot.classList.add('flipped');
    gsap.to("#" + id, 1, { backgroundColor: '#673ab7' })
    dot.innerText = years + " years"
  }
}

/* Scroll to load content */
const scrollTimeline = new TimelineMax({ onUpdate: () => { scrollTimeline.progress(); } });
const scrollController = new ScrollMagic.Controller();


// about me
const aboutmeAnimation = new TimelineMax();

scrollTimeline.from(".section-header.about-me", 1, { opacity: 0 })

const aboutmeTitleAnimation = new ScrollMagic.Scene({
  triggerElement: "#about-me-section",
  triggerHook: .5,
  duration: "100%",
})

aboutmeAnimation.from("#selfie-container", 1, { x: '-20vh', opacity: 0 })
aboutmeAnimation.from("#bio", 1, { x: '20vh', opacity: 0}, "=-.5")
aboutmeAnimation.from("#selfie", 1, { x: '-20vh', opacity: 0}, "=-1")

const aboutmeSectionAnimation = new ScrollMagic.Scene({
  triggerElement: ".section-header.about-me",
})

aboutmeTitleAnimation.setTween(scrollTimeline).addTo(scrollController)
aboutmeSectionAnimation.setTween(aboutmeAnimation).addTo(scrollController)
