<?php

get_template_part('Head');
get_template_part('Navbar');
?>

<body>
  <div class="app">
    <h1>We are not ready for launch yet, silly!</h1>
    <p>But you can still check out our pricing plans below.</p>
    <?php get_template_part('Pricing'); ?>
  </div>

  <style>
    body {
      overflow: hidden;
    }

    .app {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
    }

    .app h1 {
      font-size: 2rem;
      margin-bottom: 10px;
    }

    .app p {
      font-size: 1.2rem;
      margin-bottom: 20px;
    }
  </style>
</body>

</html>