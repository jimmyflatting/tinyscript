import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const { data } = await req.json();

    return NextResponse.json({ message: "Hello World" });
}