<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TinyScript App</title>
  <link rel="stylesheet" href="./css/app.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>

<body>
  <div class="app-container">
    <nav class="sidebar">
      <div class="logo">
        Tiny<span>Script</span>
      </div>
      <ul class="nav-links">
        <li><a href="#" class="active" data-section="chat"><i class="fas fa-comment"></i> Chat</a></li>
        <li><a href="#" data-section="settings"><i class="fas fa-cog"></i> Settings</a></li>
      </ul>
    </nav>
    <main class="content">
      <section id="chat" class="active">
        <div class="chat-container">
          <div class="chat-messages"></div>
          <div class="chat-input">
            <textarea placeholder="Type your message here..."></textarea>
            <button class="send-btn"><i class="fas fa-paper-plane"></i></button>
          </div>
        </div>
      </section>
      <section id="settings">
        <h2>Settings</h2>
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

          <?php if (!$user['active_subscription']): ?>
            <div class="card subscription-settings">
              <h3>Upgrade to Pro</h3>
              <p>Unlock unlimited access with a Pro subscription!</p>
              <div class="subscription-options">
                <div class="subscription-card">
                  <h4>Monthly</h4>
                  <p class="price">$10<span>/month</span></p>
                  <ul>
                    <li>Full access to all features</li>
                    <li>Unlimited chat history</li>
                  </ul>
                  <form method="POST" action="/app/create-checkout-session">
                    <input type="hidden" name="price_id" value="price_1PrjsIGq5NXltWyk0fLJlUR2">
                    <button type="submit" class="primary-btn">Subscribe Monthly</button>
                  </form>
                </div>
                <div class="subscription-card popular">
                  <h4>Yearly</h4>
                  <p class="price">$100<span>/year</span></p>
                  <ul>
                    <li>Full access to all features</li>
                    <li>Unlimited chat history</li>
                    <li>Two months free</li>
                  </ul>
                  <form method="POST" action="/app/create-checkout-session">
                    <input type="hidden" name="price_id" value="price_1PrjsIGq5NXltWyklZBGeHCR">
                    <button type="submit" class="primary-btn">Subscribe Yearly</button>
                  </form>
                </div>
              </div>
            </div>
          <?php else: ?>
            <div class="card subscription-settings">
              <h3>Pro Subscription</h3>
              <p>You are currently on the Pro plan. Enjoy all the features!</p>
              <form method="POST" action="/app/cancel-subscription">
                <button type="submit" class="secondary-btn">Cancel Subscription</button>
              </form>
            </div>
          <?php endif; ?>
        </div>
      </section>
      <section id="billing">
        <h2>Billing Information</h2>
        <div class="subscription-info">
          <p>Current Plan: <span id="current-plan">Pro</span></p>
          <p>Next Billing Date: <span id="next-billing-date">June 1, 2023</span></p>
        </div>
        <h3>Payment Method</h3>
        <div class="payment-method">
          <p>Credit Card ending in <span id="card-last-four">1234</span></p>
          <button class="secondary-btn">Update Payment Method</button>
        </div>
        <h3>Billing History</h3>
        <table class="billing-history">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>May 1, 2023</td>
              <td>$19.99</td>
              <td>Paid</td>
            </tr>
            <tr>
              <td>April 1, 2023</td>
              <td>$19.99</td>
              <td>Paid</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
  <script src="./js/app.js"></script>
</body>

</html>