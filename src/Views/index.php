<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TinyScript</title>
    <link rel="stylesheet" href="./css/landing.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="./js/landing.js"></script>
</head>

<body>
    <nav class="nav-scroll">
        <div class="navbar container">
            <div class="left-nav">
                <a class="logo" href="/">
                    Tiny<span>Script</span>
                </a>
            </div>
            <div class="right-nav">
                <?php if (isset($_SESSION['user_id'])): ?>
                    <a class="secondary-btn" href="/logout">Logout</a>
                    <a class="primary-btn" href="/app">App</a>
                <?php else: ?>
                    <a class="secondary-btn" href="/login">Login</a>
                    <a class="primary-btn" href="/register">Try now</a>
                <?php endif; ?>
            </div>
        </div>
    </nav>

    <main>
        <section class="section-hero">
            <div class="container">
                <div class="first-row">
                    <div class="content">
                        <h1 class="hero-title">Your AI-powered coding assistant for seamless development.</h1>
                        <p class="hero-subtitle">From squashing bugs to building features—when you're in a bind, TinyScript is here to help.</p>
                        <a class="primary-btn" href="/app"><span>Get started for free</span><i class="fa-solid fa-chevron-right"></i></a>
                    </div>
                </div>
                <div class="second-row">
                    <div class="terminal">
                        <div class="message-box">
                            <div class="output"></div>
                        </div>
                        <div class="input-box">
                            <input disabled type="text" placeholder="|" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-cards">
            <div class="container">
                <div class="cards-first">
                    <div class="card">
                        <div class="heading-card">
                            <i class="fa-solid fa-code"></i>
                            <h3>Effortless coding assistance.</h3>
                        </div>
                        <p>TinyScript speeds up your workflow by providing smart, context-aware code suggestions, so you can focus on building.</p>
                    </div>
                    <div class="card">
                        <div class="heading-card">
                            <i class="fa-solid fa-brain"></i>
                            <h3>Reduce cognitive load.</h3>
                        </div>
                        <p>Let TinyScript handle repetitive coding tasks, giving you more mental space to solve complex problems.</p>
                    </div>
                </div>
                <div class="cards-second">
                    <div class="card">
                        <div class="heading-card">
                            <i class="fa-solid fa-code-branch"></i>
                            <h3>Code with confidence.</h3>
                        </div>
                        <p>TinyScript helps you catch errors and improve code quality, reducing bugs before they reach production.</p>
                    </div>
                    <div class="card">
                        <div class="heading-card">
                            <i class="fa-solid fa-terminal"></i>
                            <h3>Stay in the flow.</h3>
                        </div>
                        <p>Maintain momentum in your coding sessions with TinyScript’s on-demand guidance, keeping interruptions to a minimum.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-pricing" id="pricing">
            <div class="container">
                <div class="cards">
                    <div class="card">
                        <div class="heading">
                            <h3>Monthly</h3>
                            <h2>$10<span>/monthly</span></h2>
                            <p>Perfect for trying out TinyScript without a long-term commitment.</p>
                        </div>
                        <div class="body">
                            <ul>
                                <li>Full access to all features</li>
                                <li>Unlimited chat history</li>

                            </ul>
                        </div>
                        <div class="footer">
                            <form method="POST" action="/app/create-checkout-session">
                                <input type="hidden" name="price_id" value="price_monthly">
                                <button type="submit" class="primary-btn">Get started</button>
                            </form>
                        </div>
                    </div>
                    <div class="card popular">
                        <div class="heading">
                            <div class="flex">
                                <h3>Yearly</h3>
                                <h4>Most popular</h4>
                            </div>
                            <h2>$100<span>/yearly</span></h2>
                            <p>Best value for committed developers looking to save in the long run.</p>
                        </div>
                        <div class="body">
                            <ul>
                                <li>Full access to all features</li>
                                <li>Unlimited chat history</li>
                                <li>Two months free</li>
                            </ul>
                        </div>
                        <div class="footer">
                            <form method="POST" action="/app/create-checkout-session">
                                <input type="hidden" name="price_id" value="price_yearly">
                                <button type="submit" class="primary-btn">Get started</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-faq" id="faq">
            <div class="container">
                <div class="card">
                    <div class="heading">
                        <h2>Frequently Asked Questions</h2>
                        <p>Here are some of our FAQs. If you have any other questions you’d like answered please feel free to email us.</p>
                    </div>
                    <div class="questions">
                        <div class="question">
                            <h3>What is TinyScript?</h3>
                            <p>TinyScript is an AI-powered coding assistant designed to help developers write code more efficiently. Whether you're debugging, building new features, or just need a second pair of eyes.</p>
                        </div>
                        <div class="question">
                            <h3>How do I use TinyScript?</h3>
                            <p>Using TinyScript is simple! Just click on the "Try now" button on the homepage, and you'll be redirected to the app. From there, you can begin coding with the assistance of TinyScript.</p>
                        </div>
                        <div class="question">
                            <h3>Can I save my chats?</h3>
                            <p>Yes, you can save your chats. TinyScript allows you to keep a record of your coding sessions, so you can easily refer back to previous conversations whenever needed.</p>
                        </div>
                    </div>
                </div>
        </section>

        <section class="section-cta">
            <div class="container">
                <div class="cta card">
                    <h2>Ready to supercharge your coding?</h2>
                    <p>Sign up today and elevate your development skills with TinyScript.</p>
                    <a class="primary-btn" href="/register">Try for free</a>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <section class="section-footer">
            <div class="container">
                <div class="card">
                    <div class="footer-col footer-left">
                        <h3 class="logo">
                            Tiny<span>Script</span>
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    </footer>
</body>

</html>