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
                    <a class="primary-btn" href="/app">Dashboard</a>
                <?php else: ?>
                    <a class="secondary-btn" href="/login">Login</a>
                    <a class="primary-btn" href="/register">Sign Up</a>
                <?php endif; ?>
            </div>
        </div>
    </nav>
    <main>
        <section class="section-404">
            <h1>404</h1>
            <p>Page not found.</p>

            <a class="primary-btn" href="/">Go back to the home page</a>
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