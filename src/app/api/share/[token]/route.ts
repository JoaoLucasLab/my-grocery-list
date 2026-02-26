import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function toApiItem(item: { id: string; name: string; quantity: number; checked: boolean; createdAt: Date }) {
  return {
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    checked: item.checked,
    createdAt: item.createdAt.getTime(),
  };
}

/** GET /api/share/[token] – return list items if token is valid (read-only share) */
export async function GET(
  _request: Request,
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
    const items = await prisma.groceryItem.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(items.map(toApiItem));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to load list" }, { status: 500 });
  }
}
