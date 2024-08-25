<nav class="nav-scroll">
  <div class="navbar container">
    <div class="left-nav">
      <a class="logo" href="/">
        Tiny<span>Script</span>
      </a>
    </div>
    <div class="right-nav">
      <?php if (isset($_SESSION['user_id'])): ?>
        <a class="secondary-btn" href="/logout">Logout</a>
        <a class="primary-btn" href="/app">Dashboard</a>
      <?php else: ?>
        <a class="secondary-btn" href="/login">Login</a>
        <a class="primary-btn" href="/signup">Sign Up</a>
      <?php endif; ?>
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