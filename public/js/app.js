function newChat() {
  console.log("Creating new chat");
  // Clear existing messages
  $('.chat-messages').empty();
  
  // Update the chat ID in the hidden input
  $('#chat-id').val('0');
}

function loadChat(chat_id) {
  console.log("Loading chat:", chat_id);
  
  // Clear existing messages
  $('.chat-messages').empty();
  
  // Update the chat ID in the hidden input
  $('#chat-id').val(chat_id);

  // Fetch chat data from the server
  fetch(`/api/item/${chat_id}`)
    .then(response => response.json())
    .then(data => {
      console.log("Chat data:", data);
      
      // Update chat messages
      data.body.forEach(message => {
        if (message.user) {
          addMessage('user', message.user);
        }
        if (message.ai) {
          addMessage('ai', message.ai);
        }
      });

      // Scroll to the bottom of the chat
      const chatMessages = document.querySelector('.chat-messages');
      chatMessages.scrollTop = chatMessages.scrollHeight;
    })
    .catch(error => {
      console.error("Error loading chat:", error);
    });
}

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
    const message = document.querySelector('.chat-input textarea').value.trim();
    const message_element = document.querySelector('.chat-input textarea');
    const user_id = document.getElementById('user-id').value;
    let chat_id = document.getElementById('chat-id').value;
    const send_btn = document.getElementById('send-btn');
    
    send_btn.disabled = true;
    message_element.disabled = true;
    
    if (message) {
      addMessage('user', message);
      message_element.value = '';
      
      console.log(typeof(chat_id));
      chat_id = parseInt(chat_id);
      console.log(typeof(chat_id));

      const formData = new FormData();
      formData.append('message', message);
      formData.append('user_id', user_id);
      formData.append('chat_id', chat_id);

      fetch('/api/item', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data.status) {
            console.log(data);
            addMessage('bot', data.latest_response);
            console.log(data.chat_id);
            document.getElementById('chat-id').value = data.chat_id;
            if (data.subscription_status === 'trial') {
              updateTokenDisplay(data.tokens_available);
            }
          } else {
            console.log(data);
            if (data.requireUpgrade) {
              showUpgradePrompt();
            } else {
              addMessage('bot', `Error: ${data.error}`);
            }
          }
        }).finally(() => {
          send_btn.disabled = false;
          message_element.disabled = false;
          // add back focus to the message element
          message_element.focus();
        })
        .catch(error => {
          console.error('Error:', error);
          addMessage('bot', 'Sorry, I encountered an error. Please try again.');
        });
    }
  };

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
