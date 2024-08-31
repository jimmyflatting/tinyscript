import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getUserFromSessionToken } from '@/lib/auth';
import { generateAIResponse } from '@/lib/replicate';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get('session_token')?.value;
  const user = await getUserFromSessionToken(sessionToken);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const chatHistory = await prisma.item.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ chatHistory });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const sessionToken = req.cookies.get('session_token')?.value;
  const user = await getUserFromSessionToken(sessionToken);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  try {
    // Create user message
    const userMessage = await prisma.item.create({
      data: {
        name: message,
        userId: user.id,
        isUserMessage: true,
      },
    });

    // Generate AI response
    const aiResponse = await generateAIResponse(message);
    //const randomResponse = ["Hello, how are you?", "I am fine, thank you for asking.", "What is your name?", "My name is AI.", "I am AI, nice to meet you.", "How can I help you today?", "What is your favorite color?", "My favorite color is blue.", "What is your favorite food?", "My favorite food is pizza."];
    // This array contains a collection of code snippets in various programming languages.
    // Each snippet demonstrates a different programming concept or common function.
    // const randomResponse = [
    //   "Here's a Python function that greets a person:\n```python\ndef greet(name):\n    return f'Hello, {name}!'\n```",
    //   "This TypeScript function adds two numbers:\n```typescript\nfunction add(a: number, b: number): number {\n    return a + b;\n}\n```",
    //   "A JavaScript function to check if a number is even:\n```javascript\nfunction isEven(num) {\n    return num % 2 === 0;\n}\n```",
    //   "A recursive Python function to calculate factorial:\n```python\ndef factorial(n):\n    if n == 0 or n == 1:\n        return 1\n    else:\n        return n * factorial(n-1)\n```",
    //   "A TypeScript function that reverses a string:\n```typescript\nfunction reverseString(str: string): string {\n    return str.split('').reverse().join('');\n}\n```",
    //   "A concise JavaScript arrow function for multiplication:\n```javascript\nconst multiply = (a, b) => a * b;\n```",
    //   "A Python function to check if a string is a palindrome:\n```python\ndef is_palindrome(s):\n    return s == s[::-1]\n```",
    //   "A TypeScript function to find the maximum value in an array:\n```typescript\nfunction findMax(arr: number[]): number {\n    return Math.max(...arr);\n}\n```",
    //   "A JavaScript function that counts vowels in a string:\n```javascript\nfunction countVowels(str) {\n    return (str.match(/[aeiou]/gi) || []).length;\n}\n```",
    //   "A Python generator function for Fibonacci sequence:\n```python\ndef fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n```"
    // ];
    // These code snippets serve as examples and can be used to demonstrate
    // various programming concepts to users interacting with the AI.
    // const aiResponse = randomResponse[Math.floor(Math.random() * randomResponse.length)];
    // Create AI message
    const aiMessage = await prisma.item.create({
      data: {
        name: aiResponse,
        userId: user.id,
        isUserMessage: false,
      },
    });

    let remainingCredits = user.credits;

    if (user.subscriptionStatus !== 'active') {
      remainingCredits = Math.max(0, user.credits - 1);
      await prisma.user.update({
        where: { id: user.id },
        data: { credits: remainingCredits },
      });
    }

    return NextResponse.json({ 
      userMessageId: userMessage.id, 
      aiMessageId: aiMessage.id, 
      aiResponse,
      remainingCredits 
    });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
