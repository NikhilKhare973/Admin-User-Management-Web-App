import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // This imports the file you created earlier

// 1. GET: Fetch all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 },
    );
  }
}

// 2. POST: Create a new user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, role } = body;

    const newUser = await prisma.user.create({
      data: {
        email,
        password, // In a real app, you would hash this!
        role: role || "USER",
        isVerified: true,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}

// Add this at the bottom of app/api/users/route.ts

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json(); // Get the ID from the request
    await prisma.user.delete({
      where: { id }, // Tell Prisma which ID to delete
    });
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
  }
}

// Add this inside app/api/users/route.ts

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, email, password, role } = body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { email, password, role },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}
