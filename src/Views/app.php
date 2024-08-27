<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TinyScript App</title>
  <link rel="stylesheet" href="./css/app.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
</head>

<body>
  <div class="app-container">
    <nav class="sidebar">
      <div class="logo">
        Tiny<span>Script</span>
      </div>
      <ul class="nav-links">
        <li><a href="#" id="chat-link" data-section="chat"><i class="fas fa-comment"></i> Chat</a></li>
        <li><a href="/app#settings" id="settings-link" data-section="settings"><i class="fas fa-cog"></i> Settings</a></li>
      </ul>
    </nav>
    <main class="content">

      <section id="chat" class="active">
        <div class="chat-container">
          <div class="chat-messages"></div>
          <div id="subscription-popup" class="popup" style="display: none;">
            <div class="popup-content">
              <h3>Out of Tokens</h3>
              <p>You've used all your available tokens. Upgrade to a Pro subscription for unlimited access!</p>
              <button id="upgrade-btn" class="primary-btn">Upgrade Now</button>
            </div>
          </div>
          <div class="chat-input">
            <textarea placeholder="Type your message here..."></textarea>
            <button class="send-btn"><i class="fas fa-paper-plane"></i></button>
          </div>
        </div>
      </section>

      <section id="settings">
        <div class="settings-container">
          <div class="card account-settings">
            <h3>Account Settings</h3>
            <form id="profile-form">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" value="<?php echo $user['name']; ?>" required>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" value="<?php echo $user['email']; ?>" required>
              </div>
              <div class="form-group">
                <label for="password">New Password</label>
                <input type="password" id="password" name="password">
              </div>
              <button type="submit" class="primary-btn">Save Changes</button>
            </form>
          </div>

          <?php if ($user['subscription_status'] === 'trial'): ?>
            <div class="card subscription-settings">
              <h3>Upgrade to Pro</h3>
              <p>Unlock unlimited access with a Pro subscription!</p>
              <div class="subscription-options">
                <div class="subscription-card">
                  <h4>Monthly</h4>
                  <p class="price">$20<span>/month</span></p>
                  <form method="POST" action="/app/create-checkout-session">
                    <input type="hidden" name="price_id" value="price_1PrjsIGq5NXltWyk0fLJlUR2">
                    <button type="submit" class="primary-btn">Subscribe</button>
                  </form>
                </div>
                <div class="subscription-card popular">
                  <h4>Yearly</h4>
                  <p class="price">$100<span>/year</span></p>
                  <form method="POST" action="/app/create-checkout-session">
                    <input type="hidden" name="price_id" value="price_1PrjsIGq5NXltWyklZBGeHCR">
                    <button type="submit" class="primary-btn">Subscribe</button>
                  </form>
                </div>
              </div>
            </div>
          <?php else: ?>
            <div class="card subscription-settings">
              <div class="subscription-settings-text">
                <h3>Pro Subscription</h3>
                <p>Subscription Status: <?php echo $user['subscription_status']; ?></p>
                <?php if ($user['subscription_status'] === 'active'): ?>
                  <p>Subscription Renews: <?php echo $user['subscription_end_date']; ?></p>
                <?php elseif ($user['subscription_status'] === 'inactive'): ?>
                  <p>Subscription Ends: <?php echo $user['subscription_end_date']; ?></p>
                <?php endif; ?>
              </div>
              <?php if ($user['subscription_status'] === 'active'): ?>
                <form method="POST" action="/app/cancel-subscription">
                  <button type="submit" class="primary-btn">Cancel Subscription</button>
                </form>
              <?php endif; ?>

            </div>
          <?php endif; ?>
        </div>
      </section>
    </main>
  </div>
  <script src="./js/app.js"></script>
  <script>
    $(document).ready(function() {
      if (<?php echo json_encode($user['subscription_status'] === 'trial' && $user['tokens_available'] <= 0); ?>) {
        $('#subscription-popup').show();
        $('.chat-input').hide();
      }
      $('#upgrade-btn').click(function() {
        $('#chat').removeClass('active');
        $('#settings').addClass('active');
        $('#chat-link').removeClass('active');
        $('#settings-link').addClass('active');
      });

      // Set initial active nav-link based on the active section
      $('.nav-links a[data-section="' + $('.content section.active').attr('id') + '"]').addClass('active');
    });
  </script>
</body>

</html>