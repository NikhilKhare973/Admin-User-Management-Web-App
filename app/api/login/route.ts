import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ------> This is the API Route that handles user login. It receives the email and password from the frontend, checks if the user exists in the database, and returns the user's role if the login is successful. <-------------------
// POST request - /api/login
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Find user in Database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 2. Check if user exists AND password matches
    // --> I store passwords in plain text, which is NOT recommended for production.
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
