window.addEventListener('load', () => {
  const body = document.querySelector('body');
  const header = document.querySelector('header');
  const backdrop = document.querySelector('.backdrop');
  const showLb = document.getElementById('show-lb');

  // hor slider batch commands
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  const batchImg = document.getElementById('batch-hor-img');
  var offset = 0;
  var left = 0;
  var imgWidth = batchImg.clientWidth;
  var visibleWidth = body.clientWidth - body.clientWidth / 10;

  var allCircles = document.querySelectorAll('.circle-f');

  var descDetails = document.getElementById('desc-details');
  var descTitle = document.querySelector('#desc-details h3');
  var descContent = document.querySelector('#desc-details p');

  // Product img vars
  const prodSlider = document.querySelector('.slick-prod-slider');
  const prodCloseBtn = document.getElementById('prod-close-btn');

  const batchData = [
    {
      number: 1,
      title: 'Lorem Ipsum 1',
      content:
        'dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      number: 2,
      title: 'Lorem Ipsum 2',
      content:
        'dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      number: 3,
      title: 'Lorem Ipsum 3',
      content:
        'dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      number: 4,
      title: 'Lorem Ipsum 4',
      content:
        'dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ];

  // jQuery.easing.def = 'easeInExpo';

  rightArrow.addEventListener('click', () => {
    if (left >= -(imgWidth - visibleWidth)) {
      offset -= 333;
      batchImg.style.left = offset + 'px';

      allCircles.forEach((circle) => {
        $(circle).animate({
          left: '-=333',
        });
      }, 0);
    }
    left = parseInt(batchImg.style.left.split('px')[0]);
  });

  leftArrow.addEventListener('click', () => {
    if (left === 0) {
      return;
    }

    if (left < 0) {
      offset += 333;
      batchImg.style.left = offset + 'px';

      allCircles.forEach((circle) => {
        $(circle).animate({
          left: '+=333',
        });
      });
    }
    left = parseInt(batchImg.style.left.split('px')[0]);
  });

  showLb.addEventListener('click', () => {
    backdrop.style.visibility = 'visible';
  });

  document.addEventListener('click', (e) => {
    if (backdrop === e.target && backdrop.contains(e.target)) {
      backdrop.style.visibility = 'hidden';
    }
  });

  if (window.scrollY !== 0) {
    header.classList.add('sticky');
  }

  window.onscroll = () => {
    console.log('Hey there miss Zahra!');
    header.classList.add('sticky');

    if (window.scrollY === 0) {
      if (header.classList.contains('sticky')) {
        header.classList.remove('sticky');
      }
    }

    if (isScrolledIntoView(gestureVid)) {
      gestureVid.classList.add('activated');
      gestureVid.play();
    } else {
      if (gestureVid.classList.contains('activated')) {
        gestureVid.classList.remove('activated');
        gestureVid.pause();
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

  $('.slick-prod-slider').slick({
    slidesToShow: 1,
    autoplay: false,
    arrows: true,
    draggable: false,
  });

  $('.mti-selector').on('click', function () {
    $('.slick-prod-slider').slick('slickGoTo', 0);
  });

  $('.core-selector').on('click', function () {
    $('.slick-prod-slider').slick('slickGoTo', 1);
  });

  $('.mtz-selector').on('click', function () {
    $('.slick-prod-slider').slick('slickGoTo', 2);
  });

  // Prod Title Clicks
  document.addEventListener('click', (event) => {
    if (!event.target.classList.contains('prod-title')) return;

    event.target.classList.add('selected-main');
    prodSlider.classList.add('show');
    prodCloseBtn.classList.add('show');

    if (event.target.classList.contains('mti-selector')) {
      // mtiFull.classList.add('img-selected');
      // coreFull.classList.remove('img-selected');
      // mtzFull.classList.remove('img-selected');
    }

    if (event.target.classList.contains('core-selector')) {
      // mtiFull.classList.remove('img-selected');
      // coreFull.classList.add('img-selected');
      // mtzFull.classList.remove('img-selected');
    }

    if (event.target.classList.contains('mtz-selector')) {
      // mtiFull.classList.remove('img-selected');
      // coreFull.classList.remove('img-selected');
      // mtzFull.classList.add('img-selected');
    }

    var elems = document.querySelectorAll('.prod-title');

    elems.forEach((element) => {
      if (element === event.target) return;
      element.classList.remove('selected-main');
    });
  });

  prodCloseBtn.addEventListener('click', () => {
    prodSlider.classList.remove('show');
    prodCloseBtn.classList.remove('show');
    document.querySelector('.selected-main').classList.remove('selected-main');
  });

  var gestureVid = document.getElementById('gestures-vid');

  function isScrolledIntoView(elem) {
    var windowViewTop = window.scrollY;
    var windowViewBottom = windowViewTop + window.innerHeight;

    var elemTop = elem.offsetTop;
    var elemBottom = elemTop + elem.offsetHeight;

    return elemBottom <= windowViewBottom && elemTop >= windowViewTop;
  }

  allCircles.forEach((circle, i) => {
    circle.addEventListener('click', () => {
      allCircles.forEach((elem) => {
        if (elem !== circle) {
          if (!elem.classList.contains('positive-c')) {
            elem.classList.add('positive-c');
          }
        }
      });
      if (circle.classList.contains('positive-c')) {
        descDetails.classList.add('activated');
        descTitle.innerText = batchData[i].title;
        descContent.innerText = batchData[i].content;
      } else {
        descDetails.classList.remove('activated');
      }
      circle.classList.toggle('positive-c');
    });
  });

  // Top header links hash animations
  $('.header-links').on('click', function (event) {
    if (this.hash !== '') {
      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate(
        {
          scrollTop: $(hash).offset().top - 114,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    }
  });
});
