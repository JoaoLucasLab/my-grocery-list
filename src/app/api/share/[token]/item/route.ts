import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** PATCH /api/share/[token]/item – toggle item checked (requires valid share token) */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  try {
    const shareLink = await prisma.shareLink.findUnique({
      where: { token },
    });
    if (!shareLink) {
      return NextResponse.json({ error: "Invalid or expired link" }, { status: 404 });
    }
    const body = await request.json();
    const itemId = String(body?.itemId ?? "").trim();
    const checked = Boolean(body?.checked);
    if (!itemId) {
      return NextResponse.json({ error: "itemId is required" }, { status: 400 });
    }
    const item = await prisma.groceryItem.update({
      where: { id: itemId },
      data: { checked },
    });
    return NextResponse.json({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      checked: item.checked,
      createdAt: item.createdAt.getTime(),
    });
  } catch (e) {
    if (e && typeof e === "object" && "code" in e && e.code === "P2025") {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    console.error(e);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
