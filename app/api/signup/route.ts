import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    // 2. Create the new user
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        role: "USER", // Default role is always USER
        isVerified: false, // New users are not verified by default
      },
    });

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
