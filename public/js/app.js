$(document).ready(function () {
  // Navigation
  $('.nav-links a').on('click', function (e) {
    e.preventDefault();
    $('.nav-links a').removeClass('active');
    $(this).addClass('active');

    const section = $(this).data('section');
    $('section').removeClass('active');
    $(`#${section}`).addClass('active');
  });

  // Chat functionality
  $('.send-btn').on('click', sendMessage);
  $('.chat-input textarea').on('keypress', function (e) {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  function sendMessage() {
    const message = $('.chat-input textarea').val().trim();
    if (message) {
      addMessage('user', message);
      $('.chat-input textarea').val('');

      $.ajax({
        url: '/chat/create',
        method: 'POST',
        data: { message: message },
        success: function (response) {
          if (response.success) {
            addMessage('bot', response.response);
            if (response.subscription_status === 'trial') {
              updateTokenDisplay(response.tokens_available);
            }
          } else {
            if (response.requireUpgrade) {
              showUpgradePrompt();
            } else {
              addMessage('bot', 'Error: ' + response.error);
            }
          }
        },
        error: function (xhr, status, error) {
          console.error('Error:', error);
          addMessage('bot', 'Sorry, I encountered an error. Please try again.');
        }
      });
    }
  }

  function addMessage(sender, content) {
    const messageElement = $('<div>')
      .addClass(`message ${sender}`)
      .html(marked.parse(content));
    $('.chat-messages').append(messageElement);
    $('.chat-messages').scrollTop($('.chat-messages')[0].scrollHeight);

    // Add copy button
    const copyButton = $('<button>')
      .addClass('copy-btn')
      .text('Copy')
      .click(function() {
        navigator.clipboard.writeText(content).then(function() {
          copyButton.text('Copied!');
          setTimeout(function() {
            copyButton.text('Copy');
          }, 2000);
        });
      });
    messageElement.append(copyButton);
  }

  // Profile form submission
  $('#profile-form').on('submit', function (e) {
    e.preventDefault();
    // Handle profile update logic here
    alert('Profile updated successfully!');
  });

  // Add token display and management functionality
  function updateTokenDisplay(tokens) {
    $('#token-count, #token-count-settings').text(tokens);
  }

  // Add token purchase functionality
  $('#buy-tokens').on('click', function() {
    const tokenAmount = prompt("How many tokens would you like to purchase?");
    if (tokenAmount && !isNaN(tokenAmount)) {
        $.ajax({
            url: '/app/purchase-tokens',
            method: 'POST',
            data: { token_amount: tokenAmount },
            success: function(response) {
                if (response.success) {
                    window.location.href = response.checkout_url;
                } else {
                    alert('Error: ' + response.error);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
                alert('An error occurred while processing your request. Please try again.');
            }
        });
    } else if (tokenAmount !== null) {
        alert('Please enter a valid number of tokens.');
    }
  });

  function showUpgradePrompt() {
    // Show a modal or redirect to the pricing page
    alert('You have run out of tokens. Please upgrade your subscription to continue using the service.');
    // Optionally, redirect to the pricing page:
    // window.location.href = '/pricing';
  }
});
