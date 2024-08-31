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

<body class="font-['Inter',sans-serif] h-screen overflow-hidden">
  <script>
    console.log(<?php echo json_encode($chats); ?>);
  </script>
  <div class="flex bg-background text-text h-full">
    <nav id="sidebar" class="w-64 bg-card p-5 flex flex-col fixed h-full z-20 transition-transform duration-300 transform -translate-x-full md:translate-x-0">
      <div class="text-[26px] text-primary mb-8">
        Tiny<span class="font-bold">Script</span>
      </div>
      <ul class="list-none p-0 m-0 flex flex-col justify-between h-full">
        <li class="mb-2.5">
          <button onClick="newChat(); toggleChat()" id="chat-link" data-section="chat" class="w-full text-text no-underline flex items-center p-2.5 rounded-[0.5rem] transition-colors duration-300 hover:bg-primary hover:text-background mb-3 border border-primary">
            <i class="fas fa-comment mr-2.5"></i> Chat
          </button>
          <ul class="list-none ps-5 m-0 flex flex-col">
            <?php foreach ($chats as $chat): ?>
              <li class="mb-2.5">
                <button onClick="loadChat(<?php echo $chat['id']; ?>); toggleChatItem()" class="chat-item-link w-full text-text no-underline flex items-center p-2.5 rounded-[0.5rem] transition-colors duration-300 hover:bg-primary hover:text-background" data-chat-id="<?php echo $chat['id']; ?>">
                  <?php
                  $chatIndex = count($chat['body']);
                  $message = trim($chat['body'][$chatIndex - 1]['user']);
                  $words = explode(' ', $message);
                  if (count($words) < 4) {
                    echo $message;
                  } else {
                    $trimmedMessage = implode(' ', array_slice($words, 0, 3)) . '...';
                    echo $trimmedMessage;
                  }
                  ?>
                </button>
              </li>
            <?php endforeach; ?>
          </ul>
        </li>
        <li class="mb-2.5">
          <button onClick="toggleChat()" id="settings-link" data-section="settings" class="w-full text-text no-underline flex items-center p-2.5 rounded-[0.5rem] transition-colors duration-300 hover:bg-primary hover:text-background mb-3">
            <i class="fas fa-cog mr-2.5"></i> Settings
          </button>
        </li>
      </ul>
    </nav>
    <div id="overlay" class="fixed inset-0 bg-black opacity-50 z-10 hidden md:hidden"></div>
    <main class="flex-grow p-5 md:ml-64 flex flex-col h-full">
      <button id="menu-toggle" class="md:hidden fixed top-4 left-4 z-30 bg-primary text-background p-2 rounded-full">
        <i class="fas fa-bars"></i>
      </button>

      <section id="chat" class="flex-grow flex flex-col h-full">
        <div class="flex-grow overflow-y-auto p-5 flex flex-col chat-messages h-[60%] mt-[20%] md:mt-0 rounded-[0.5rem] bg-card"></div>

        <?php if ($user['subscription_status'] === 0 && $user['available_tokens'] <= 0): ?>
          <!-- Out of tokens popup -->
          <div class="flex justify-center items-center bg-black bg-opacity-50">
            <div class="bg-card rounded-[0.5rem] p-8 text-text flex flex-col gap-4">
              <h3 class="text-[22px] font-bold">Out of Messages</h3>
              <p>You've used all your available messages. Upgrade to a Pro membership for unlimited access!</p>
              <button id="upgrade-btn" class="bg-primary text-background border-none rounded-[0.5rem] py-2.5 px-5 cursor-pointer transition-opacity duration-300 hover:opacity-90">Upgrade Now</button>
            </div>
          </div>
        <?php else: ?>

          <!-- Chat input -->
          <div class="flex mt-5 chat-input h-[10%]">
            <input type="hidden" id="user-id" value="<?php echo $user['id']; ?>">
            <input type="hidden" id="chat-id" value="0">
            <textarea placeholder="Type your message here..." class="flex-grow p-2.5 border-none rounded-[0.5rem] bg-card text-text resize-none"></textarea>
            <button id="send-btn" class="bg-primary text-background border-none rounded-[0.5rem] p-2.5 ml-2.5 cursor-pointer send-btn"><i class="fas fa-paper-plane"></i></button>
          </div>
      </section>
    <?php endif; ?>

    <section id="settings" class="hidden overflow-y-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-card rounded-[0.5rem] p-8 text-text">
          <h3 class="text-[22px] text-primary mb-4">Account Settings</h3>
          <form id="profile-form" class="flex flex-col gap-4 mb-4">
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
          <form method="POST" action="/api/logout">
            <button type="submit" class="w-full border border-primary text-primary rounded-[0.5rem] py-2.5 px-5 cursor-pointer transition-opacity duration-300 hover:opacity-90">Logout</button>
          </form>
        </div>
        <?php if ($user['subscription_status'] === 0): ?>
          <div class="bg-card rounded-[0.5rem] p-8 text-text">
            <h3 class="text-[22px] text-primary mb-4">Upgrade to Pro</h3>
            <p class="mb-4">Unlock unlimited access with a Pro subscription!</p>

            <div class="border-2 border-primary rounded-[0.5rem] p-4 text-center shadow-[0_0_10px_rgba(126,235,216,0.3)]">
              <h4 class="text-primary text-[22px] mb-2">Pro Membership</h4>
              <p class="text-[26px] font-bold mb-4">$5<span class="text-[14px] font-normal">/week</span></p>
              <form method="POST" action="/api/subscribe">
                <input type="hidden" name="price_id" value="price_1PrjsIGq5NXltWyklZBGeHCR">
                <button type="submit" class="bg-primary text-background border-none rounded-[0.5rem] py-2.5 px-5 cursor-pointer transition-opacity duration-300 hover:opacity-90">Subscribe</button>
              </form>

            </div>

          </div>
        <?php else: ?>
          <div class="bg-card rounded-[0.5rem] p-8 text-text">
            <div class="flex flex-col mb-8 gap-2 capitalize">
              <h3 class="text-[22px] text-primary">Pro Subscription</h3>
              <p>You are subscribed to the Pro plan.</p>
            </div>

            <form method="POST" action="/api/cancel-subscription">
              <button type="submit" class="border border-primary text-primary rounded-[0.5rem] py-2.5 px-5 cursor-pointer transition-opacity duration-300 hover:opacity-90">Cancel Subscription</button>
            </form>
          </div>
        <?php endif; ?>
      </div>
    </section>
    </main>
  </div>
  <script src="./js/app.js"></script>
  <script>
    // toggle chat and settings

    const borderClasses = 'border border-primary';

    function toggleChat() {
      $('#chat').toggleClass('hidden');
      $('#settings').toggleClass('hidden');
      $('#chat-link').toggleClass(borderClasses);
      $('#settings-link').toggleClass(borderClasses);
    }

    function toggleChatItem() {
      if ($('#chat').hasClass('hidden')) {
        $('#chat').toggleClass('hidden');
        $('#settings').toggleClass('hidden');
        $('#chat-link').toggleClass(borderClasses);
        $('#settings-link').toggleClass(borderClasses);
      }
    }
  </script>
  <script>
    $(document).ready(function() {
      if (<?php echo json_encode($user['subscription_status'] === 'trial' && $user['tokens_available'] <= 0); ?>) {
        $('#subscription-popup').show();
      }
      $('#upgrade-btn').click(function() {
        $('#chat').removeClass('block').addClass('hidden');
        $('#settings').removeClass('hidden').addClass('block');
        $('#chat-link').removeClass('bg-primary text-background');
        $('#settings-link').addClass('bg-primary text-background');
      });

      // Set initial active nav-link based on the active section
      $('.nav-links a[data-section="' + $('.content section:not(.hidden)').attr('id') + '"]').addClass('bg-primary text-background');

      // Toggle sidebar
      $('#menu-toggle').click(function() {
        $('#sidebar').toggleClass('-translate-x-full');
        $('#overlay').toggleClass('hidden');
      });

      // Close sidebar when clicking outside
      $('#overlay').click(function() {
        $('#sidebar').addClass('-translate-x-full');
        $('#overlay').addClass('hidden');
      });

      // Close sidebar on window resize (in case it's open on mobile and user switches to desktop view)
      $(window).resize(function() {
        if ($(window).width() >= 768) { // 768px is the breakpoint for md in Tailwind
          $('#sidebar').removeClass('-translate-x-full');
          $('#overlay').addClass('hidden');
        }
      });
    });
  </script>
</body>

</html>