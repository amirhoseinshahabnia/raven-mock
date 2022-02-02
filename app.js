window.addEventListener('load', () => {
  const header = document.querySelector('header');
  const backdrop = document.querySelector('.backdrop');
  const showLb = document.getElementById('show-lb');

  showLb.addEventListener('click', () => {
    backdrop.style.visibility = 'visible';
  });

  document.addEventListener('click', (e) => {
    if (backdrop === e.target && backdrop.contains(e.target)) {
      backdrop.style.visibility = 'hidden';
    }
  });

  window.onscroll = () => {
    console.log('Hey there miss Zahra!');
    header.classList.add('sticky');

    if (window.scrollY === 0) {
      if (header.classList.contains('sticky')) {
        header.classList.remove('sticky');
      }
    }
  };

  $('.hero').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1900,
    fade: true,
    pauseOnHover: false,
    arrows: false,
  });

  gsap.registerPlugin(ScrollTrigger);

  const anim = gsap.fromTo(
    '.fadeIn',
    { opacity: 0 },
    { opacity: 1, duration: 1 }
  );

  const tl = gsap.timeline();
  tl.to('.fadeIn', { opacity: 1, duration: 1 });
  tl.from('.moveDown', { y: -5 });
  tl.from('.moveUp', { y: 5 });

  ScrollTrigger.create({
    animation: tl,

    markers: false,
    toggleActions: 'restart none none none',
  });

  $('.slider-showcase').slick({
    infinite: true,
    slidesToShow: 1,
    autoplay: false,
    autoplaySpeed: 1900,
    fade: false,
    pauseOnHover: true,
    arrows: true,
    centerMode: true,
  });

  // var imgArray = [
  //   'imgs/slider/slide-1.png',
  //   'imgs/slider/slide-2.png',
  //   'imgs/slider/slide-3.png',
  //   'imgs/slider/slide-4.png',
  // ];

  // var currIndex = 1;
  // var imgDuration = 2500;

  // function slideShow() {
  //   document.getElementById('slider').className += 'fadeOut';
  //   setTimeout(function () {
  //     document.getElementById('slider').src = imgArray[currIndex];
  //     document.getElementById('slider').className = '';
  //   }, 1000);
  //   setTimeout(() => {
  //     currIndex++;
  //   }, 1000);
  //   if (currIndex == imgArray.length) {
  //     currIndex = 0;
  //   }
  //   setTimeout(slideShow, imgDuration);
  // }
  // slideShow();
});
