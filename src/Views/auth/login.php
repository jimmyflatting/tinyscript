<?php get_template_part('Head'); ?>
<?php get_template_part('Navbar'); ?>

<div class="container">
    <h2>Login</h2>
    <form method="POST" action="/login">
        <input type="email" name="email" required placeholder="Email">
        <input type="password" name="password" required placeholder="Password">
        <button type="submit">Login</button>
    </form>
    <?php if (isset($error)): ?>
        <p style="color: red;"><?php echo $error; ?></p>
    <?php endif; ?>
    <p>Don't have an account? <a href="/signup">Sign up</a></p>
</div>

<?php get_template_part('Footer'); ?>
<?php get_template_part('Foot'); ?>