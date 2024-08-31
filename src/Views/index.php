<!DOCTYPE html>
<html lang="en" class="scroll-smooth font-sans text-base leading-normal text-text bg-background transition-all duration-300">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TinyScript</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="./css/styles.css">
    <script src="https://accounts.google.com/gsi/client" async defer></script>
</head>

<body>
    <script>
        function handleCredentialResponse(response) {
            const token = response.credential;
            fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_token: token
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        localStorage.setItem('auth_token', data.auth_token);
                        window.location.reload(); // Reload the page instead of redirecting
                    } else {
                        console.error('Login failed:', data.message);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    </script>
    <div id="g_id_onload"
        data-client_id="772670371516-3e9qpq3d0r9pm9tsndr6035qr2flak7q.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleCredentialResponse"
        data-auto_prompt="false">
    </div>
    <div>
        <nav class="sticky top-0 z-10 py-1 border-b-2 border-card backdrop-blur-sm">
            <div class="container mx-auto flex justify-between items-center h-12">
                <div class="flex items-center">
                    <a class="text-lg font-normal text-primary" href="/">
                        Tiny<span class="font-bold">Script</span>
                    </a>
                </div>
                <div>
                    <button onClick="toggleLoginModal()" class="px-4 py-2 bg-primary text-background rounded-lg hover:opacity-90 transition duration-300">Login / Register</button>
                </div>
            </div>
        </nav>

        <main>
            <section class="py-16">
                <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-card rounded-lg p-8 flex items-center">
                        <div>
                            <h1 class="text-3xl font-bold mb-2">Your AI-powered coding assistant for seamless development.</h1>
                            <p class="text-lg mb-6">From squashing bugs to building features—when you're in a bind, TinyScript is here to help.</p>
                            <button @click.prevent="showLoginModal = true" class="inline-flex items-center px-4 py-2 bg-primary text-background rounded-lg hover:opacity-90 transition duration-300" href="/app">
                                <span>Get started for free</span>
                                <i class="fa-solid fa-chevron-right ml-2"></i>
                            </button>
                        </div>
                    </div>
                    <div>
                        <div class="bg-card text-primary font-mono rounded-lg p-4 h-[400px] flex flex-col justify-between">
                            <div class="overflow-y-auto whitespace-pre-wrap flex-grow mb-2"></div>
                            <div>
                                <input disabled type="text" placeholder="|" class="w-full bg-background border-none p-2 text-primary font-mono text-sm outline-none rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="py-16">
                <div class="container mx-auto">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div class="bg-card rounded-lg p-5 text-text">
                            <div class="flex items-center mb-4">
                                <i class="fa-solid fa-code text-lg border-2 border-primary rounded-lg p-4 mr-4"></i>
                                <h3 class="text-xl font-bold">Effortless coding assistance.</h3>
                            </div>
                            <p>TinyScript speeds up your workflow by providing smart, context-aware code suggestions, so you can focus on building.</p>
                        </div>
                        <div class="bg-card rounded-lg p-5 text-text">
                            <div class="flex items-center mb-4">
                                <i class="fa-solid fa-brain text-lg border-2 border-primary rounded-lg p-4 mr-4"></i>
                                <h3 class="text-xl font-bold">Reduce cognitive load.</h3>
                            </div>
                            <p>Let TinyScript handle repetitive coding tasks, giving you more mental space to solve complex problems.</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-card rounded-lg p-5 text-text">
                            <div class="flex items-center mb-4">
                                <i class="fa-solid fa-code-branch text-lg border-2 border-primary rounded-lg p-4 mr-4"></i>
                                <h3 class="text-xl font-bold">Code with confidence.</h3>
                            </div>
                            <p>TinyScript helps you catch errors and improve code quality, reducing bugs before they reach production.</p>
                        </div>
                        <div class="bg-card rounded-lg p-5 text-text">
                            <div class="flex items-center mb-4">
                                <i class="fa-solid fa-terminal text-lg border-2 border-primary rounded-lg p-4 mr-4"></i>
                                <h3 class="text-xl font-bold">Stay in the flow.</h3>
                            </div>
                            <p>Maintain momentum in your coding sessions with TinyScript's on-demand guidance, keeping interruptions to a minimum.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="pricing" class="py-16">
                <div class="container mx-auto">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-card rounded-lg p-5 text-text">
                            <div class="mb-4">
                                <h2 class="text-2xl font-bold text-primary">Pro Plan</h2>
                                <h3 class="text-lg">Monthly</h3>
                                <h2 class="text-2xl font-bold">$20<span class="text-base font-normal">/monthly</span></h2>
                                <p>Perfect for trying out TinyScript without a long-term commitment.</p>
                            </div>
                            <div class="bg-card rounded-lg p-4 text-center">
                                <form method="POST" action="/app/create-checkout-session">
                                    <input type="hidden" name="price_id" value="price_1PrjsIGq5NXltWyk0fLJlUR2">
                                    <button type="submit" class="w-full px-4 py-2 bg-primary text-background rounded-lg hover:opacity-90 transition duration-300">Get started</button>
                                </form>
                            </div>
                        </div>
                        <div class="bg-card rounded-lg p-5 text-text border border-primary">
                            <div class="mb-4">
                                <h2 class="text-2xl font-bold text-primary">Pro Plan (6+ months free)</h2>
                                <h3 class="text-lg">Yearly</h3>
                                <h2 class="text-2xl font-bold">$100<span class="text-base font-normal">/yearly</span></h2>
                                <p>Best value for committed developers looking to save in the long run.</p>
                            </div>
                            <div class="bg-card rounded-lg p-4 text-center">
                                <form method="POST" action="/app/create-checkout-session">
                                    <input type="hidden" name="price_id" value="price_1PrjsIGq5NXltWyklZBGeHCR">
                                    <button type="submit" class="w-full px-4 py-2 bg-primary text-background rounded-lg hover:opacity-90 transition duration-300">Get started</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="faq" class="py-16">
                <div class="container mx-auto">
                    <div class="bg-card rounded-lg p-8 text-text">
                        <div class="mb-8">
                            <h2 class="text-3xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
                            <p>Here are some of our FAQs. If you have any other questions you'd like answered please feel free to email us.</p>
                        </div>
                        <div class="border-l border-primary pl-4 space-y-4">
                            <div>
                                <h3 class="text-lg font-bold text-primary mb-1">What is TinyScript?</h3>
                                <p>TinyScript is an AI-powered coding assistant designed to help developers write code more efficiently. Whether you're debugging, building new features, or just need a second pair of eyes.</p>
                            </div>
                            <div>
                                <h3 class="text-lg font-bold text-primary mb-1">How do I use TinyScript?</h3>
                                <p>Using TinyScript is simple! Just click on the "Try now" button on the homepage, and you'll be redirected to the app. From there, you can begin coding with the assistance of TinyScript.</p>
                            </div>
                            <div>
                                <h3 class="text-lg font-bold text-primary mb-1">Can I save my chats?</h3>
                                <p>Yes, you can save your chats. TinyScript allows you to keep a record of your coding sessions, so you can easily refer back to previous conversations whenever needed.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <section class="py-16">
                <div class="container mx-auto">
                    <div class="bg-card rounded-lg p-8 text-center">
                        <h2 class="text-3xl font-bold mb-2">Ready to supercharge your coding?</h2>
                        <p class="italic mb-8">Sign up today and elevate your development skills with TinyScript.</p>
                        <a class="inline-block px-4 py-2 bg-primary text-background rounded-lg hover:opacity-90 transition duration-300" href="/register">Try for free</a>
                    </div>
                </div>
            </section>

            <!-- Login Modal -->
            <div id="loginModal" class="hidden fixed inset-0 bg-background bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-background p-8 rounded-lg max-w-md w-full">
                    <h2 class="text-2xl font-bold mb-6">Login / Register</h2>
                    <div class="space-y-6">
                        <!-- Google Sign In -->
                        <div class="g_id_signin flex justify-center"
                            data-type="standard"
                            data-shape="rectangular"
                            data-theme="outline"
                            data-text="signin_with"
                            data-size="large"
                            data-logo_alignment="left">
                        </div>

                        <div class="relative">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-text"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-2 bg-background text-text">Or continue with</span>
                            </div>
                        </div>

                        <!-- Email/Password Form -->
                        <form class="space-y-4">
                            <div>
                                <label for="email" class="block text-sm font-medium text-text">Email</label>
                                <input type="email" id="email" name="email" required class="mt-1 block w-full px-3 py-2 bg-background border border-text rounded-md text-text placeholder-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                            </div>
                            <div>
                                <label for="password" class="block text-sm font-medium text-text">Password</label>
                                <input type="password" id="password" name="password" required class="mt-1 block w-full px-3 py-2 bg-background border border-text rounded-md text-text placeholder-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-primary focus:ring-primary border-text rounded bg-background">
                                    <label for="remember-me" class="ml-2 block text-sm text-text">Remember me</label>
                                </div>
                                <div class="text-sm">
                                    <a href="#" class="font-medium text-primary hover:text-accent">Forgot your password?</a>
                                </div>
                            </div>
                            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-text bg-secondary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                Continue with email
                            </button>
                        </form>
                    </div>
                    <button onClick="toggleLoginModal()" class="mt-6 text-text hover:text-primary">Close</button>
                </div>
            </div>
        </main>

        <footer>
            <section class="py-8">
                <div class="container mx-auto">
                    <div class="bg-card rounded-lg p-6 flex justify-center">
                        <h3 class="text-lg font-normal text-primary">
                            Tiny<span class="font-bold">Script</span>
                        </h3>
                    </div>
                </div>
            </section>
        </footer>
    </div>

    <script>
        function toggleLoginModal() {
            const modal = document.getElementById('loginModal');
            modal.classList.toggle('hidden');
        }
    </script>
</body>

</html>