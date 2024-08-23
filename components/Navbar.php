<nav class="nav-scroll">
  <div class="navbar container">
    <div class="left-nav">
      <a class="logo" href="/">
        Tiny<span>Script</span>
      </a>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#faq">What is this?</a></li>
      </ul>
    </div>
    <div class="right-nav">
      <a class="secondary-btn" href="/app">Login</a>
      <a class="primary-btn" href="/app">Try now</a>
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