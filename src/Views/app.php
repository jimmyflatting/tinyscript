<!DOCTYPE html>
<html lang="en" class="scroll-smooth text-[14px] leading-normal text-text bg-background transition-all duration-300">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TinyScript App</title>
  <link rel="stylesheet" href="./css/styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
</head>

<body class="font-['Inter',sans-serif]">
  <div class="flex h-screen bg-background text-text">
    <nav class="w-64 bg-card p-5 flex flex-col">
      <div class="text-[26px] text-primary mb-8">
        Tiny<span class="font-bold">Script</span>
      </div>
      <ul class="list-none p-0 m-0 flex flex-col justify-between">
        <li class="mb-2.5"><a href="#" id="chat-link" data-section="chat" class="text-text no-underline flex items-center p-2.5 rounded-[0.5rem] transition-colors duration-300 hover:bg-primary hover:text-background"><i class="fas fa-comment mr-2.5"></i> Chat</a></li>
        <li class="mb-2.5"><a href="/app#settings" id="settings-link" data-section="settings" class="text-text no-underline flex items-center p-2.5 rounded-[0.5rem] transition-colors duration-300 hover:bg-primary hover:text-background"><i class="fas fa-cog mr-2.5"></i> Settings</a></li>
      </ul>
    </nav>
    <main class="flex-grow p-5 overflow-y-auto">
      <?php var_dump($user); ?>
      <section id="chat" class="block">
        <div class="flex flex-col h-[80vh]">
          <div class="flex-grow overflow-y-auto p-5 flex flex-col chat-messages"></div>

          <?php if ($user['subscription_status'] === 0 && $user['available_tokens'] <= 0): ?>
            <!-- Out of tokens popup -->
            <div class="flex justify-center items-center bg-black bg-opacity-50">
              <div class="bg-card rounded-[0.5rem] p-8 text-text flex flex-col gap-4">
                <h3 class="text-[22px] font-bold">Out of Tokens</h3>
                <p>You've used all your available tokens. Upgrade to a Pro subscription for unlimited access!</p>
                <button id="upgrade-btn" class="bg-primary text-background border-none rounded-[0.5rem] py-2.5 px-5 cursor-pointer transition-opacity duration-300 hover:opacity-90">Upgrade Now</button>
              </div>
            </div>
          <?php endif; ?>

          <!-- Chat input -->
          <div class="flex mt-5 chat-input">
            <input type="hidden" id="user-id" value="<?php echo $user['id']; ?>">
            <input type="hidden" id="chat-id" value="0">
            <textarea placeholder="Type your message here..." class="flex-grow p-2.5 border-none rounded-[0.5rem] bg-card text-text resize-none"></textarea>
            <button class="bg-primary text-background border-none rounded-[0.5rem] p-2.5 ml-2.5 cursor-pointer send-btn"><i class="fas fa-paper-plane"></i></button>
          </div>
        </div>
      </section>

      <section id="settings" class="hidden">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-card rounded-[0.5rem] p-8 text-text">
            <h3 class="text-[22px] text-primary mb-4">Account Settings</h3>
            <form id="profile-form" class="flex flex-col gap-4">
              <div class="flex flex-col">
                <label for="name" class="mb-2">Name</label>
                <input type="text" id="name" name="name" value="<?php echo $user['name']; ?>" required class="p-2 border border-primary rounded-[0.5rem] bg-background text-text">
              </div>
              <div class="flex flex-col">
                <label for="email" class="mb-2">Email</label>
                <input type="email" id="email" name="email" value="<?php echo $user['email']; ?>" required class="p-2 border border-primary rounded-[0.5rem] bg-background text-text">
              </div>
              <div class="flex flex-col">
                <label for="password" class="mb-2">New Password</label>
                <input type="password" id="password" name="password" class="p-2 border border-primary rounded-[0.5rem] bg-background text-text">
              </div>
              <button type="submit" class="bg-primary text-background border-none rounded-[0.5rem] py-2.5 px-5 cursor-pointer transition-opacity duration-300 hover:opacity-90">Save Changes</button>
            </form>
          </div>

          <?php if ($user['subscription_status'] === 'trial'): ?>
            <div class="bg-card rounded-[0.5rem] p-8 text-text">
              <h3 class="text-[22px] text-primary mb-4">Upgrade to Pro</h3>
              <p class="mb-4">Unlock unlimited access with a Pro subscription!</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="border border-primary rounded-[0.5rem] p-4 text-center">
                  <h4 class="text-primary text-[22px] mb-2">Monthly</h4>
                  <p class="text-[26px] font-bold mb-4">$20<span class="text-[14px] font-normal">/month</span></p>
                  <form method="POST" action="/app/create-checkout-session">
                    <input type="hidden" name="price_id" value="price_1PrjsIGq5NXltWyk0fLJlUR2">
                    <button type="submit" class="bg-primary text-background border-none rounded-[0.5rem] py-2.5 px-5 cursor-pointer transition-opacity duration-300 hover:opacity-90">Subscribe</button>
                  </form>
                </div>
                <div class="border-2 border-primary rounded-[0.5rem] p-4 text-center shadow-[0_0_10px_rgba(126,235,216,0.3)]">
                  <h4 class="text-primary text-[22px] mb-2">Yearly</h4>
                  <p class="text-[26px] font-bold mb-4">$100<span class="text-[14px] font-normal">/year</span></p>
                  <form method="POST" action="/app/create-checkout-session">
                    <input type="hidden" name="price_id" value="price_1PrjsIGq5NXltWyklZBGeHCR">
                    <button type="submit" class="bg-primary text-background border-none rounded-[0.5rem] py-2.5 px-5 cursor-pointer transition-opacity duration-300 hover:opacity-90">Subscribe</button>
                  </form>
                </div>
              </div>
            </div>
          <?php else: ?>
            <div class="bg-card rounded-[0.5rem] p-8 text-text">
              <div class="flex flex-col mb-8 gap-2 capitalize">
                <h3 class="text-[22px] text-primary">Pro Subscription</h3>
                <p>Subscription Status: <?php echo $user['subscription_status']; ?></p>
                <?php if ($user['subscription_status'] === 'active'): ?>
                  <p>Subscription Renews: <?php echo $user['subscription_end_date']; ?></p>
                <?php elseif ($user['subscription_status'] === 'inactive'): ?>
                  <p>Subscription Ends: <?php echo $user['subscription_end_date']; ?></p>
                <?php endif; ?>
              </div>
              <?php if ($user['subscription_status'] === 'active'): ?>
                <form method="POST" action="/app/cancel-subscription">
                  <button type="submit" class="bg-primary text-background border-none rounded-[0.5rem] py-2.5 px-5 cursor-pointer transition-opacity duration-300 hover:opacity-90">Cancel Subscription</button>
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
        $('#chat').removeClass('block').addClass('hidden');
        $('#settings').removeClass('hidden').addClass('block');
        $('#chat-link').removeClass('bg-primary text-background');
        $('#settings-link').addClass('bg-primary text-background');
      });

      // Set initial active nav-link based on the active section
      $('.nav-links a[data-section="' + $('.content section:not(.hidden)').attr('id') + '"]').addClass('bg-primary text-background');
    });
  </script>
</body>

</html>