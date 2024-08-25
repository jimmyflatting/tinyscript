<?php get_template_part('Head'); ?>
<?php get_template_part('Navbar'); ?>

<div class="container">
    <h2>Your Dashboard</h2>
    <?php if ($user['active_subscription']): ?>
        <p>Your subscription is active.</p>
        <form action="/subscription/cancel" method="post">
            <button type="submit" class="secondary-btn">Cancel Subscription</button>
        </form>
    <?php else: ?>
        <p>You don't have an active subscription.</p>
        <?php get_template_part('Pricing'); ?>
    <?php endif; ?>
</div>

<?php get_template_part('Footer'); ?>
<?php get_template_part('Foot'); ?>