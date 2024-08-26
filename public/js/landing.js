$(document).ready(function () {
  // on scroll remove border-bottom from nav
  $(window).scroll(function () {
    if ($(window).scrollTop() > 50) {
      $("nav").removeClass("nav-scroll");
    } else {
      $("nav").addClass("nav-scroll");
    }
  });

  const commands = [
    "How do I center a div in CSS?",
    "How do I implement a linked list in C++?",
    "What is the time complexity of binary search?",
    "Explain event delegation in JavaScript.",
  ];

  const results = [
    `To center a div in CSS, you can use:\n\n\`\`\`css\ndiv { display: flex; justify-content:\n center; align-items: center; }\n\`\`\``,
    `To implement a linked list in C++:\n\n\`\`\`cpp\nstruct Node { int data; Node* next; };\nNode* head = NULL; // empty list\n\`\`\``,
    "The time complexity of binary search is O(log n), where n is the number of elements in the array.",
    "Event delegation is a technique where you use a single event listener to manage events for multiple elements.",
  ];

  let commandIndex = 0;

  function scrollToBottom() {
    let messageBox = $(".message-box");
    messageBox.scrollTop(messageBox[0].scrollHeight);
  }

  function typeIntoInput(command, callback) {
    let input = $(".input-box input");
    let i = 0;
    let interval = setInterval(function () {
      input.val(input.val() + command.charAt(i));
      i++;
      if (i >= command.length) {
        clearInterval(interval);
        if (callback) callback();
      }
    }, 100); // Adjust the speed of typing here
  }

  function typeAnswer(text, callback) {
    let output = $(".message-box .output");
    let parsedText = renderCodeBlock(text);
    let tempDiv = $("<div></div>");
    let i = 0;
    let interval = setInterval(function () {
      tempDiv.html(parsedText.substring(0, i));
      output.children().last().replaceWith(tempDiv.clone());
      scrollToBottom();
      i++;
      if (i > parsedText.length) {
        clearInterval(interval);
        scrollToBottom(); // Ensure we scroll after the last character
        if (callback) callback();
      }
    }, 50);
    output.append(tempDiv); // Add an empty div that will be updated
  }

  function renderCodeBlock(text) {
    // Add language bars to code blocks and remove markdown indicators
    text = text.replace(
      /```(\w+)\n([\s\S]*?)```/g,
      function (match, lang, code) {
        return `<div class="code-block"><div class="language-bar">${lang}</div><pre><code class="language-${lang}">${code.trim()}</code></pre></div>`;
      }
    );
    // Use marked to parse the markdown
    return marked.parse(text);
  }

  function executeCommand() {
    if (commandIndex < commands.length) {
      let command = commands[commandIndex];
      let commandResult = results[commandIndex];
      let output = $(".message-box .output");
      let input = $(".input-box input");

      typeIntoInput(command, function () {
        setTimeout(function () {
          // Append command to output
          output.append(marked.parse(`> ${input.val()}\n\n`));
          scrollToBottom();
          input.val(""); // Clear input field

          // Add a small delay before starting to type the answer
          setTimeout(function () {
            // Prepare and type the result with potential code block rendering
            typeAnswer(commandResult, function () {
              commandIndex++;
              // Add a line break between QA pairs
              output.append("<br>");
              scrollToBottom();
              executeCommand(); // Execute the next command
            });
          }, 500);
        }, 500);
      });
    }
  }

  // Start executing the first command
  executeCommand();
});
