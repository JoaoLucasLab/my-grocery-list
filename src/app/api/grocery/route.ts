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

/** GET /api/grocery – list all items */
export async function GET() {
  try {
    const items = await prisma.groceryItem.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(items.map(toApiItem));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

/** POST /api/grocery – create one item */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const quantity = Math.max(1, Number(body?.quantity) || 1);
    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }
    const item = await prisma.groceryItem.create({
      data: { name, quantity },
    });
    return NextResponse.json(toApiItem(item));
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
