<?php get_template_part('Head'); ?>
<?php get_template_part('Navbar'); ?>

<div class="container">
    <h2>Account Settings</h2>
    <div class="settings-section">
        <h3>Personal Information</h3>
        <form method="POST" action="/app/update-profile">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" value="<?php echo htmlspecialchars($user['name']); ?>" required>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($user['email']); ?>" required>
            <button type="submit" class="primary-btn">Update Profile</button>
        </form>
    </div>

    <div class="settings-section">
        <h3>Subscription</h3>
        <?php if ($user['active_subscription']): ?>
            <p>Your subscription is active. Plan: <?php echo htmlspecialchars($user['subscription_plan']); ?></p>
            <p>Next billing date: <?php echo htmlspecialchars($user['subscription_end_date']); ?></p>
            <form method="POST" action="/app/cancel-subscription">
                <button type="submit" class="secondary-btn">Cancel Subscription</button>
            </form>
        <?php else: ?>
            <p>You don't have an active subscription.</p>
            <?php get_template_part('Pricing'); ?>
        <?php endif; ?>
    </div>

    <div class="settings-section">
        <h3>Change Password</h3>
        <form method="POST" action="/app/change-password">
            <label for="current_password">Current Password:</label>
            <input type="password" id="current_password" name="current_password" required>
            <label for="new_password">New Password:</label>
            <input type="password" id="new_password" name="new_password" required>
            <label for="confirm_password">Confirm New Password:</label>
            <input type="password" id="confirm_password" name="confirm_password" required>
            <button type="submit" class="primary-btn">Change Password</button>
        </form>
    </div>
</div>

<?php get_template_part('Footer'); ?>
<?php get_template_part('Foot'); ?>