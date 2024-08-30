<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TinyScript</title>
    <link rel="stylesheet" href="./css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="./js/landing.js"></script>
</head>

<body class="bg-background text-text">
    <nav class="sticky top-0 backdrop-blur-sm border-b-2 border-card">
        <div class="container mx-auto flex justify-between items-center h-12 px-4">
            <div class="flex items-center">
                <a class="text-[22px] font-normal text-primary" href="/">
                    Tiny<span class="font-bold">Script</span>
                </a>
            </div>
            <div>
                <?php if (isset($_SESSION['user_id'])): ?>
                    <a class="mr-2 text-primary" href="/logout">Logout</a>
                    <a class="bg-primary text-background px-4 py-2 rounded-[0.5rem] hover:opacity-90 transition duration-300" href="/app">Dashboard</a>
                <?php else: ?>
                    <a class="mr-2 text-primary" href="/login">Login</a>
                    <a class="bg-primary text-background px-4 py-2 rounded-[0.5rem] hover:opacity-90 transition duration-300" href="/register">Sign Up</a>
                <?php endif; ?>
            </div>
        </div>
    </nav>
    <main>
        <section class="flex flex-col justify-center items-center h-[60vh]">
            <h1 class="text-5xl mb-4">404</h1>
            <p class="text-2xl mb-4">Page not found.</p>

            <a class="bg-primary text-background px-4 py-2 rounded-[0.5rem] hover:scale-105 transition duration-300" href="/">Go back to the home page</a>
        </section>
    </main>
    <footer>
        <section class="py-8">
            <div class="container mx-auto">
                <div class="bg-card rounded-[0.5rem] p-6 flex justify-center">
                    <h3 class="text-[22px] font-normal text-primary">
                        Tiny<span class="font-bold">Script</span>
                    </h3>
                </div>
            </div>
        </section>
    </footer>
</body>

</html>