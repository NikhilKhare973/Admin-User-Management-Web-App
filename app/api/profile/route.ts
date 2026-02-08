import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// This is the API route for updating the user's password. It expects a PUT request with a JSON body containing the user ID and the new password.
// PUT - /api/profile
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, password } = body;

    // Update the password for this specific user ID
    await prisma.user.update({
      where: { id },
      data: { password },
    });

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating password" },
      { status: 500 },
    );
  }
}
