(function() {
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      var isOpen = mobileMenu.classList.toggle('is-open');
      hamburger.classList.toggle('is-active');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
})();
