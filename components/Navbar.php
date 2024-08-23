<nav class="nav-scroll">
  <div class="navbar container">
    <div class="left-nav">
      <a class="logo" href="/">
        Tiny<span>Script</span>
      </a>
    </div>
    <div class="right-nav">
      <a class="secondary-btn" href="/app">Login</a>
      <a class="primary-btn" href="/app">Get Started</a>
    </div>
  </div>
</nav>


<script>
  $(document).ready(function() {
    // on scroll remove border-bottom from nav
    $(window).scroll(function() {
      if ($(window).scrollTop() > 50) {
        $("nav").removeClass("nav-scroll");
      } else {
        $("nav").addClass("nav-scroll");
      }
    });
  });
</script>