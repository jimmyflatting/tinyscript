<div class="terminal">
    <div class="message-box">
        <div class="output"></div>
    </div>
    <div class="input-box">
        <input type="text" placeholder="Type something here..." />
    </div>
</div>



<style>
    .terminal {
        width: 100%;
        height: 400px;
        background-color: #1d1f21;
        color: #c5c8c6;
        font-family: 'Courier New', Courier, monospace;
        border-radius: 5px;
        padding: 15px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .message-box {
        flex-grow: 1;
        overflow-y: auto;
        margin-bottom: 10px;
        white-space: pre-wrap;
        /* Allows preserving whitespace formatting */
    }

    .output {
        color: #c5c8c6;
        font-family: inherit;
        font-size: 14px;
        line-height: 1.5;
    }

    .input-box input {
        width: 100%;
        background-color: #1d1f21;
        border: none;
        padding: 10px;
        color: #c5c8c6;
        font-family: inherit;
        font-size: 14px;
        outline: none;
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
    }

    /* Style for code blocks */
    .output .code-block {
        display: block;
        background-color: #282a2e;
        padding: 10px;
        border-radius: 5px;
        margin: 10px 0;
        font-family: 'Courier New', Courier, monospace;
        color: #cc6666;
        font-size: 13px;
        line-height: 1.4;
        white-space: pre;
    }
</style>

<script>
    $(document).ready(function() {
        const commands = [
            "How do I implement a linked list?",
            "What is the time complexity of binary search?",
            "Explain event delegation in JavaScript.",
            "How do I center a div in CSS?"
        ];

        const results = [
            `To implement a linked list in C++:\n\n\`\`\`cpp\nstruct Node { int data; Node* next; };\nNode* head = NULL; // empty list\n\`\`\``,
            "The time complexity of binary search is O(log n), where n is the number of elements in the array.",
            "Event delegation is a technique where you use a single event listener to manage events for multiple elements.",
            `To center a div in CSS, you can use:\n\n\`\`\`css\ndiv { display: flex; justify-content: center; align-items: center; }\n\`\`\``
        ];

        let commandIndex = 0;

        function typeIntoInput(command, callback) {
            let input = $('.input-box input');
            let i = 0;
            let interval = setInterval(function() {
                input.val(input.val() + command.charAt(i));
                i++;
                if (i >= command.length) {
                    clearInterval(interval);
                    if (callback) callback();
                }
            }, 100); // Adjust the speed of typing here
        }

        function typeAnswer(text, callback) {
            let output = $('.message-box .output');
            let i = 0;
            let interval = setInterval(function() {
                output.html(output.html() + text.charAt(i));
                output.scrollTop(output[0].scrollHeight); // Scroll to bottom as typing happens
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                    if (callback) callback();
                }
            }, 50); // Adjust the speed of typing here
        }

        function renderCodeBlock(text) {
            // Convert markdown code blocks to HTML
            text = text.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
                return `<div class="code-block"><pre><code>${code}</code></pre></div>`;
            });
            // Convert inline code to HTML
            text = text.replace(/`([^`]+)`/g, (match, code) => {
                return `<code>${code}</code>`;
            });
            // Replace newlines with <br/> for better formatting
            text = text.replace(/\n/g, '<br/>');
            return text;
        }

        function executeCommand() {
            if (commandIndex < commands.length) {
                let command = commands[commandIndex];
                let commandResult = results[commandIndex];
                let output = $('.message-box .output');
                let input = $('.input-box input');

                typeIntoInput(command, function() {
                    setTimeout(function() {
                        // Move command from input to output
                        output.append(`> ${input.val()}<br/>`);
                        input.val(''); // Clear input field

                        // Prepare and type the result with potential code block rendering
                        let renderedResult = renderCodeBlock(commandResult);
                        typeAnswer(renderedResult, function() {
                            commandIndex++;
                            executeCommand(); // Execute the next command
                        });
                    }, 500);
                });
            }
        }

        // Start executing the first command
        executeCommand();
    });
</script>