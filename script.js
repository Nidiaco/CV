document.addEventListener('DOMContentLoaded', function () {

  // Navbar shrink on scroll
  var navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth scrolling for nav links and footer
  document.querySelectorAll('.navbar a[href^="#"], footer a[href^="#"], .hero-cta a[href^="#"], .hero-scroll-indicator a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var hash = this.getAttribute('href');
      if (hash && hash !== '#') {
        var target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          history.pushState(null, null, hash);
        }
      }
    });
  });

  // Close mobile nav on link click
  var navCollapse = document.getElementById('myNavbar');
  document.querySelectorAll('.navbar .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (navCollapse.classList.contains('show')) {
        var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });

  // Scroll-triggered slide-up animations
  var slideElements = document.querySelectorAll('.slide-up');

  function checkSlide() {
    slideElements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkSlide);
  checkSlide();

  // ===== Typewriter Effect =====
  var typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    var phrases = [
      'Powering innovation through solar energy & engineering excellence',
      'Building automated tools with Python',
      'Microinverter engineering specialist',
      'From rooftops to test racks — always learning'
    ];
    var phraseIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 60;

    function typeWriter() {
      var current = phrases[phraseIndex];
      if (isDeleting) {
        typewriterEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 30;
      } else {
        typewriterEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 60;
      }

      if (!isDeleting && charIndex === current.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
      }

      setTimeout(typeWriter, typeSpeed);
    }

    setTimeout(typeWriter, 1200);
  }

  // ===== Animated Counters =====
  var counterAnimated = false;

  function animateCounters() {
    if (counterAnimated) return;
    var counters = document.querySelectorAll('.stat-number[data-count]');
    if (counters.length === 0) return;

    var firstCounter = counters[0];
    var rect = firstCounter.getBoundingClientRect();
    if (rect.top > window.innerHeight - 80) return;

    counterAnimated = true;

    counters.forEach(function (counter) {
      var target = parseInt(counter.getAttribute('data-count'), 10);
      var suffix = counter.getAttribute('data-suffix') || '';
      var current = 0;
      var duration = 1500;
      var step = Math.ceil(target / (duration / 30));

      function updateCounter() {
        current += step;
        if (current >= target) {
          current = target;
          counter.textContent = current + suffix;
          return;
        }
        counter.textContent = current + suffix;
        requestAnimationFrame(updateCounter);
      }

      updateCounter();
    });
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // ===== Skill Bar Animations =====
  var skillsAnimated = false;

  function animateSkillBars() {
    if (skillsAnimated) return;
    var bars = document.querySelectorAll('.skill-progress');
    if (bars.length === 0) return;

    var firstBar = bars[0];
    var rect = firstBar.getBoundingClientRect();
    if (rect.top > window.innerHeight - 60) return;

    skillsAnimated = true;

    bars.forEach(function (bar) {
      var targetWidth = bar.getAttribute('data-width');
      setTimeout(function () {
        bar.style.width = targetWidth + '%';
      }, 200);
    });
  }

  window.addEventListener('scroll', animateSkillBars);
  animateSkillBars();

  // ===== Hero Cursor Glow =====
  var heroSection = document.getElementById('hero');
  if (heroSection) {
    var glow = document.createElement('div');
    glow.classList.add('hero-glow');
    document.body.appendChild(glow);

    heroSection.addEventListener('mousemove', function (e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      glow.classList.add('active');
    });

    heroSection.addEventListener('mouseleave', function () {
      glow.classList.remove('active');
    });
  }
});