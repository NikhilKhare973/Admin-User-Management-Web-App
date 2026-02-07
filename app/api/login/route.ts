import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Find user in Database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 2. Check if user exists AND password matches
    // (Note: In a real app, we would use bcrypt to hash passwords, but for this beginner assignment, plain text is fine)
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    // 3. Login Successful! Return the user's role.
    return NextResponse.json({
      message: "Login successful",
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
