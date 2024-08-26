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

      // Send message to the API
      $.ajax({
        url: 'https://api.replicate.com/v1/predictions',
        method: 'POST',
        headers: {
          Authorization: 'Token YOUR_API_TOKEN',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          version: 'YOUR_MODEL_VERSION',
          input: { prompt: message },
        }),
        success: function (response) {
          // Handle the API response
          const botReply = response.output;
          addMessage('bot', botReply);
        },
        error: function (xhr, status, error) {
          console.error('Error:', error);
          addMessage('bot', 'Sorry, I encountered an error. Please try again.');
        },
      });
    }
  }

  function addMessage(sender, content) {
    const messageElement = $('<div>')
      .addClass(`message ${sender}`)
      .text(content);
    $('.chat-messages').append(messageElement);
    $('.chat-messages').scrollTop($('.chat-messages')[0].scrollHeight);
  }

  // Profile form submission
  $('#profile-form').on('submit', function (e) {
    e.preventDefault();
    // Handle profile update logic here
    alert('Profile updated successfully!');
  });
});
