<?php get_template_part('Head'); ?>
<?php get_template_part('Navbar'); ?>

<div class="container">
    <h2>Sign Up</h2>
    <form method="POST" action="/signup">
        <input type="text" name="name" required placeholder="Name">
        <input type="email" name="email" required placeholder="Email">
        <input type="password" name="password" required placeholder="Password">
        <button type="submit">Sign Up</button>
    </form>
    <?php if (isset($error)): ?>
        <p style="color: red;"><?php echo $error; ?></p>
    <?php endif; ?>
    <p>Already have an account? <a href="/login">Login</a></p>
</div>

<?php get_template_part('Footer'); ?>
<?php get_template_part('Foot'); ?>