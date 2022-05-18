gsap.registerPlugin(ScrollTrigger);

const burger = document.querySelector('.burger');
const exit = document.querySelector('.close');
const navList = document.querySelector('.navList');
const navLinks = document.querySelectorAll('.navLink');
const linkArray = Array.from(navLinks);
const loadTime = document.getElementById('loadTime');
const sections = document.querySelectorAll('section');
let load = 1;

gsap.set('.navLink', { opacity: 0, skewY: 30 });

gsap.set('.textBox p', {
  y: -20,
  autoAlpha: 0,
  skewX: 20,
});
gsap.set('.project', {
  autoAlpha: 0,
  yPercent: 100,
  rotate: 8,
});
gsap.set('.ghLink', {
  autoAlpha: 0,
  rotate: 10,
});

document.addEventListener('DOMContentLoaded', () => {
  gsap.to('.layer', { y: '-100vh', stagger: 0.2, delay: 4.1 });
  gsap.to('.preloader', { autoAlpha: 0, delay: 5.1 });
  setInterval(updateLoad, 40);

  gsap.fromTo(
    'header',
    { scale: 0.85, autoAlpha: 0.5 },
    {
      scale: 1,
      autoAlpha: 1,
      delay: 5.23,
      duration: 1.5,
      ease: 'elastic.out(1, 0.3)',
    }
  );
  gsap.fromTo(
    '.social a',
    { autoAlpha: 0 },
    { autoAlpha: 1, stagger: 0.35, delay: 5.25 }
  );
  if (window.innerWidth > 700) {
    gsap.fromTo(
      '.socialLine',
      { scale: 0 },
      { scale: 1, duration: 1.5, delay: 6.42 }
    );
  } else {
    gsap.set('.socialLine', { className: 'socialLine1' });
    gsap.fromTo(
      '.socialLine1',
      { scale: 0 },
      { scale: 1, duration: 1.5, delay: 6.42 }
    );
  }
  gsap.fromTo(
    '.locLine',
    { height: 0 },
    { height: '100%', duration: 1, delay: 7.45 }
  );
  gsap.fromTo(
    '.loc span',
    { autoAlpha: 0 },
    { autoAlpha: 1, stagger: 0.25, delay: 7.48 }
  );

  function updateLoad() {
    load += load < 99;
    loadTime.innerHTML = load;
    document.body.style.overflowY = 'scroll';
  }
});

const locoScroll = new LocomotiveScroll({
  el: document.querySelector('.smooth-scroll'),
  smooth: true,
  smoothMobile: true,
  lerp: 0.08,
  //!!!!!!! If needed for extra space at the bottom
  key: 'updateScroll',
  value: function updateScroll(e) {
    if (this.isScrolling || this.isDraggingScrollbar) {
      this.instance.scroll.y = lerp(
        this.instance.scroll.y,
        this.instance.delta.y,
        this.inertia * this.inertiaRatio
      );
    } else {
      // fix to avoid the limit to be exceeded on resize
      if (this.instance.delta.y > this.instance.limit) {
        this.instance.delta.y = this.instance.limit;
        // force transform to the max position (dirty hack?!)
        this.transform(
          this.el,
          this.instance.scroll.x,
          -this.instance.delta.y,
          0
        );
      }
      this.instance.scroll.y = this.instance.delta.y;
    }
  },
});

locoScroll.on('scroll', ScrollTrigger.update);
ScrollTrigger.scrollerProxy('.smooth-scroll', {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector('.smooth-scroll').style.transform
    ? 'transform'
    : 'fixed',
});
const footlnk = document.querySelector('.foot a');

function homeScroll() {
  locoScroll.scrollTo('#home');
}
function aboutScroll() {
  locoScroll.scrollTo('#about');
}
function projectsScroll() {
  locoScroll.scrollTo('#projects');
}
function contactScroll() {
  locoScroll.scrollTo('#contact');
}

linkArray[0].addEventListener('click', (e) => {
  e.preventDefault();
  homeScroll();
});
linkArray[1].addEventListener('click', (e) => {
  e.preventDefault();
  aboutScroll();
});
linkArray[2].addEventListener('click', (e) => {
  e.preventDefault();
  projectsScroll();
});
linkArray[3].addEventListener('click', (e) => {
  e.preventDefault();
  contactScroll();
});
footlnk.addEventListener('click', (e) => {
  e.preventDefault();
  homeScroll();
});

function socialLineUpdate() {
  if (window.innerWidth > 700) {
    gsap.set('.socialLine1', { className: 'socialLine' });
    gsap.set('.socialLine', { xPercent: 0, yPercent: 35 });
  } else {
    gsap.set('.socialLine', { className: 'socialLine1' });
    gsap.set('.socialLine1', { xPercent: 0, y: 0 });
  }
  // locoScroll.update()
}
ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
window.addEventListener('resize', () => {
  socialLineUpdate();
});
ScrollTrigger.refresh();
/*********************** To Top Button *****************************/
const toTop = document.querySelector('.toTop');
toTop.addEventListener('click', (e) => {
  e.preventDefault();
  homeScroll();
});
function hideBtn() {
  gsap.set(toTop, { autoAlpha: 0 });
}
function showBtn() {
  gsap.to(toTop, { autoAlpha: 1 });
}
ScrollTrigger.create({
  trigger: '#home',
  scroller: '.smooth-scroll',
  onEnter: function () {
    hideBtn();
  },
  onEnterBack: function () {
    hideBtn();
  },
  onLeave: function () {
    showBtn();
  },
});

/****************************************************/
/********************  Home Timeline **********************/

/********************  Nav menu **********************/
const navMenu = () => {
  navList.classList.toggle('open');
  linkArray.forEach((lnk, index) => {
    gsap.fromTo(
      lnk,
      { autoAlpha: 0, skewY: 20 },
      { autoAlpha: 1, skewY: 0, stagger: 1, delay: index * 0.25 }
    );
  });
  document.body.style.overflowY = 'hidden';
};
const navClose = () => {
  navList.classList.toggle('open');
  gsap.set('.navLink', { opacity: 0, skewY: 30 });
  document.body.style.overflowY = 'scroll';
};
burger.addEventListener('click', navMenu);
exit.addEventListener('click', navClose);

linkArray.forEach((lnk) => {
  lnk.addEventListener('click', navClose);
});

/********************  Section Title animation **********************/
sections.forEach((sct) => {
  let spns = gsap.utils.toArray('.secTitle .let');
  spns.forEach((spn, index) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sct,
        scroller: '.smooth-scroll',
        fastScrollEnd: 3000,
        scrub: true,
        onEnter: (batch) => {
          gsap.set(spn, {
            xPercent: 700,
            skewX: 20,
            autoAlpha: 0,
          });
          gsap.fromTo(
            spn,
            {
              xPercent: 700,
              skewX: 20,
              autoAlpha: 0,
            },
            {
              xPercent: 0,
              skewX: 0,
              autoAlpha: 1,
              stagger: 1.12,
              duration: 0.98,
            }
          );
        },
      },
    });
  });
});

/********************  Text Paragraphs  **********************/
function aboutTextAni() {
  let textPs = gsap.utils.toArray('.textBox p');
  gsap.set('.subTitle .let', {
    xPercent: -600,
    skewX: -20,
    autoAlpha: 0,
  });
  textPs.forEach((p, index) => {
    gsap.fromTo(
      p,
      {
        y: -20,
        skewX: 20,
        autoAlpha: 0,
      },
      {
        y: 0,
        skewX: 0,
        autoAlpha: 1,
        duration: 1,
        stagger: 0.25,
        delay: 0.5,
      }
    );
  });
}
ScrollTrigger.create({
  trigger: '.textBox',
  scroller: '.smooth-scroll',
  fastScrollEnd: 3000,
  scrub: 0.5,
  onEnter: (batch) => aboutTextAni(),
});

/********************  Skills title animation **********************/
function subSpanAni() {
  let spanSub = gsap.utils.toArray('.subTitle .let');

  spanSub.forEach((spn, index) => {
    gsap.fromTo(
      spn,
      {
        xPercent: -600,
        skewX: -20,
        autoAlpha: 0,
      },
      {
        xPercent: 0,
        skewX: 0,
        autoAlpha: 1,
        stagger: 0.25,
        delay: index * 0.12,
      }
    );
  });
}
ScrollTrigger.create({
  trigger: '.skills',
  scroller: '.smooth-scroll',
  fastScrollEnd: 3000,
  scrub: true,
  onEnter: (batch) => subSpanAni(),
});

/********************  Skills images animation **********************/
let imgs = gsap.utils.toArray('.skillsGrid img');
function skillImgAni() {
  gsap.set('.content', { autoAlpha: 0, rotateY: -90 });
  imgs.forEach((img, index) => {
    gsap.fromTo(
      img,
      {
        x: 20,
        y: -20,
        rotate: -20,
        autoAlpha: 0,
      },
      {
        x: 0,
        y: 0,
        rotate: 0,
        autoAlpha: 1,
        stagger: 0.15,
        delay: index * 0.12,
      }
    );
  });
}
ScrollTrigger.create({
  trigger: '.skillsGrid',
  scroller: '.smooth-scroll',
  fastScrollEnd: 3000,
  scrub: true,
  onEnter: (batch) => skillImgAni(),
});

/******************** Projects animation **********************/
ScrollTrigger.batch('.project', {
  trigger: '.projectBox',
  scroller: '.smooth-scroll',
  fastScrollEnd: 3000,
  scrub: 1,
  onEnter: (batch) => {
    batch.forEach((prj) =>
      gsap.to(prj, {
        autoAlpha: 1,
        yPercent: 0,
        rotate: 0,
        stagger: 0.5,
      })
    );
  },
  onLeave: () =>
    gsap.fromTo(
      '.ghLink',
      { autoAlpha: 0, rotate: 10 },
      { autoAlpha: 1, rotate: 0 }
    ),
});

/********************  Contact animation **********************/
ScrollTrigger.create({
  trigger: '#contact',
  start: 'top center',
  scroller: '.smooth-scroll',
  fastScrollEnd: 3000,
  scrub: 0.5,
  onEnter: () =>
    gsap.fromTo(
      '.content',
      { autoAlpha: 0, rotateY: -90 },
      { autoAlpha: 1, rotateY: 0, duration: 1 }
    ),
});
