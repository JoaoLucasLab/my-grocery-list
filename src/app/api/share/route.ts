import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

/** POST /api/share – create a share link and return the URL */
export async function POST(request: Request) {
  try {
    const token = crypto.randomBytes(16).toString("base64url");
    await prisma.shareLink.create({
      data: { token },
    });
    return NextResponse.json({ token });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create share link" }, { status: 500 });
  }
}
