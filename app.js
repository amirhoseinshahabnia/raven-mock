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
  var allVerticalLines = document.querySelectorAll('.ver-ln');

  var descDetails = document.getElementById('desc-details');
  var descTitle = document.querySelector('#desc-details h3');
  var descContent = document.querySelector('#desc-details p');
  var verticalLineeOne = document.getElementById('ln-1');

  // Product img vars
  const prodSlider = document.querySelector('.slick-prod-slider');
  const prodCloseBtn = document.getElementById('prod-close-btn');

  var mtiSelector = document.getElementById('mti-img-selector');
  var coreSelector = document.getElementById('core-img-selector');
  var mtzSelector = document.getElementById('mtz-img-selector');
  var allProdImgs = document.querySelectorAll('prod-tile-image');

  var coreBgImg = document.getElementById('core-bg-img');

  var bodyWidth = document.body.clientWidth;
  var controller = new ScrollMagic.Controller();

  // Batch commands auto hor scroll
  const batchCtn = document.getElementById('batch-ctn');
  var continueScroll = true;

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

  function removeBatchDetails() {
    if (descDetails.classList.contains('activated')) {
      descDetails.classList.remove('activated');
    }

    allVerticalLines.forEach((line) => {
      if (line.classList.contains('activated')) {
        line.classList.remove('activated');
      }
    });

    allCircles.forEach((circle) => {
      if (!circle.classList.contains('positive-c')) {
        circle.classList.add('positive-c');
      }
    });
  }

  function moveItemsHor(item, direction, amount) {
    if (direction === 'left') {
      gsap.to(item, {
        left: `-=${parseInt(amount)}`,
        duration: 0,
        ease: 'none',
      });
    }
    if (direction === 'right') {
      gsap.to(item, {
        left: `+=${parseInt(amount)}`,
        duration: 0,
        ease: 'none',
      });
    }
  }

  function moveImageToRight(amount) {
    if (left >= -(imgWidth - visibleWidth)) {
      offset -= amount;
      batchImg.style.left = offset + 'px';

      allCircles.forEach((circle) => {
        moveItemsHor(circle, 'left', amount);
      });

      allVerticalLines.forEach((line) => {
        moveItemsHor(line, 'left', amount);
      });
    }
    left = parseInt(batchImg.style.left.split('px')[0]);
    if (left < -1999) {
      continueScroll = false;
    }

    removeBatchDetails();
  }

  var circlesInitialLeft = [];

  allCircles.forEach((circle) => {
    circlesInitialLeft.push(circle);
  });

  function moveImageToLeft(amount) {
    if (left === 0) {
      return;
    }

    if (left >= -amount && left < 0) {
      batchImg.style.left = 0;
      return;
    }

    if (left < 0) {
      offset += amount;
      batchImg.style.left = offset + 'px';

      allCircles.forEach((circle) => {
        moveItemsHor(circle, 'right', amount);
      });

      allVerticalLines.forEach((line) => {
        moveItemsHor(line, 'right', amount);
      });
    }
    left = parseInt(batchImg.style.left.split('px')[0]);

    if (descDetails.classList.contains('activated')) {
      descDetails.classList.remove('activated');
    }

    allVerticalLines.forEach((line) => {
      if (line.classList.contains('activated')) {
        line.classList.remove('activated');
      }
    });

    allCircles.forEach((circle) => {
      if (!circle.classList.contains('positive-c')) {
        circle.classList.add('positive-c');
      }
    });
  }

  rightArrow.addEventListener('click', () => {
    moveImageToRight(333);
  });

  leftArrow.addEventListener('click', () => {
    moveImageToLeft(333);
  });

  showLb.addEventListener('click', () => {
    backdrop.style.visibility = 'visible';
  });

  document.addEventListener('click', (e) => {
    if (backdrop === e.target && backdrop.contains(e.target)) {
      backdrop.style.visibility = 'hidden';
    }
  });

  document.getElementById('lb-close-btn').addEventListener('click', () => {
    backdrop.style.visibility = 'hidden';
  });

  if (window.scrollY !== 0) {
    header.classList.add('sticky');
  }

  var onBatchCtn = false;
  var isGoingUp;

  if (bodyWidth < 768) {
    // gsap.to(coreBgImg, {
    //   left: `-${coreBgImg.offsetWidth + header.offsetWidth}`,
    //   duration: 4,
    // });
    var controller2 = new ScrollMagic.Controller();

    var tl2 = new TimelineMax();
    tl2.to(coreBgImg, {
      x: '-500',
      duration: 3,
    });

    var coreImgAnimation = new ScrollMagic.Scene({
      triggerElement: coreBgImg,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(tl2)
      // .addIndicators()
      .addTo(controller2);
  }

  window.onscroll = (e) => {
    console.log('Hey there miss Zahra!');
    header.classList.add('sticky');

    isGoingUp = this.oldScroll > this.scrollY;
    this.oldScroll = this.scrollY;

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

    // batchImg.addEventListener('mouseenter', () => {
    //   setTimeout(() => {
    //     document.querySelector('.container').classList.add('disable-scroll');
    //     batchCtn.classList.add('disable-scroll');
    //     onBatchCtn = true;
    //   }, 400);
    // });
    // if (onBatchCtn) {
    //   if (!isGoingUp) {
    //     moveImageToRight(45);
    //   } else {
    //     moveImageToLeft(45);
    //   }
    // }
  };

  var oldProgress = 0;
  var upDirection;

  if (bodyWidth >= 768) {
    var pinBatchToScene = new ScrollMagic.Scene({
      triggerElement: '.pins',
      triggerHook: 0.14,
      duration: 1000,
    })
      .setPin('.pins')
      .addTo(controller);

    pinBatchToScene.on('progress', function (event) {
      console.log('Scene progress changed to ' + event.progress);
      upDirection = oldProgress > event.progress;
      oldProgress = event.progress;
      console.log(upDirection);

      if (!upDirection) {
        moveImageToRight(40);
      } else {
        moveImageToLeft(40);
      }

      // if (!continueScroll) {
      //   pinBatchToScene = pinBatchToScene.destroy(true);
      // }
      pinBatchToScene.on('end', function (event) {
        pinBatchToScene = pinBatchToScene.destroy(true);
      });
    });
  }

  $('.hero').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1900,
    fade: true,
    pauseOnHover: false,
    arrows: false,
  });

  gsap.registerPlugin(ScrollTrigger);

  $('.fadeIn').each(function () {
    var tl = gsap.timeline();
    tl.from($(this), { opacity: 0, duration: 0.4, ease: 'sine.out' });

    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0.8,
      reverse: false,
    })
      .setTween(tl)
      .addIndicators()
      .addTo(controller);
  });

  $('.moveDown').each(function () {
    var tl = gsap.timeline();
    tl.from($(this), { y: -5 });

    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0.5,
      reverse: false,
    })
      .setTween(tl)
      .addIndicators()
      .addTo(controller);
  });

  $('.moveUp').each(function () {
    var tl = gsap.timeline();
    tl.from('.moveUp', { y: 5 });

    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0.5,
      reverse: false,
    })
      .setTween(tl)
      .addIndicators()
      .addTo(controller);
  });

  // ScrollTrigger.create({
  //   animation: tl,

  //   markers: false,
  //   toggleActions: 'restart none none none',
  // });

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

  var elems = document.querySelectorAll('.prod-title');

  if (bodyWidth >= 768) {
    mtiSelector.addEventListener('click', () => {
      prodSlider.classList.add('show');
      prodCloseBtn.classList.add('show');

      elems.forEach((element) => {
        if (element === document.querySelector('.mti-selector')) {
          element.classList.add('selected-main');
        } else {
          element.classList.remove('selected-main');
        }
      });
    });

    coreSelector.addEventListener('click', () => {
      prodSlider.classList.add('show');
      prodCloseBtn.classList.add('show');

      elems.forEach((element) => {
        if (element === document.querySelector('.core-selector')) {
          element.classList.add('selected-main');
        } else {
          element.classList.remove('selected-main');
        }
      });
    });

    mtzSelector.addEventListener('click', () => {
      prodSlider.classList.add('show');
      prodCloseBtn.classList.add('show');

      elems.forEach((element) => {
        if (element === document.querySelector('.mtz-selector')) {
          element.classList.add('selected-main');
        } else {
          element.classList.remove('selected-main');
        }
      });
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

    $('#mti-img-selector').on('click', function () {
      $('.slick-prod-slider').slick('slickGoTo', 0);
    });

    $('#core-img-selector').on('click', function () {
      $('.slick-prod-slider').slick('slickGoTo', 1);
    });

    $('#mtz-img-selector').on('click', function () {
      $('.slick-prod-slider').slick('slickGoTo', 2);
    });
  }

  // Prod Title Clicks
  if (bodyWidth >= 768) {
    document.addEventListener('click', (event) => {
      if (!event.target.classList.contains('prod-title')) return;

      event.target.classList.add('selected-main');
      prodSlider.classList.add('show');
      prodCloseBtn.classList.add('show');

      if (event.target === mtiSelector) {
        document.querySelector('.mti-selector').classList.add('selected-main');
      }

      if (event.target === coreSelector) {
        console.log('core image has been clicked');
      }

      if (event.target === mtzSelector) {
        console.log('mtz image has been clicked');
      }

      elems.forEach((element) => {
        if (element === event.target) return;
        element.classList.remove('selected-main');
      });
    });
  }

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

      allVerticalLines.forEach((line) => {
        if (line !== document.getElementById(`ln-${i}`)) {
          if (line.classList.contains('activated')) {
            line.classList.remove('activated');
          }
        }
      });

      if (circle.classList.contains('positive-c')) {
        descDetails.classList.add('activated');
        descTitle.innerText = batchData[i].title;
        descContent.innerText = batchData[i].content;
        document.getElementById(`ln-${i}`).classList.add('activated');
      } else {
        descDetails.classList.remove('activated');
        document.getElementById(`ln-${i}`).classList.remove('activated');
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
