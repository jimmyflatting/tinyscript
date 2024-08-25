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