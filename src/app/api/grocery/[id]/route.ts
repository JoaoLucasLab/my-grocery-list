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

/** PATCH /api/grocery/[id] – update one item */
export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await _request.json();
    const data: { name?: string; quantity?: number; checked?: boolean } = {};
    if (body?.name !== undefined) data.name = String(body.name).trim();
    if (body?.quantity !== undefined) data.quantity = Math.max(1, Number(body.quantity) || 1);
    if (body?.checked !== undefined) data.checked = Boolean(body.checked);

    const item = await prisma.groceryItem.update({
      where: { id },
      data,
    });
    return NextResponse.json(toApiItem(item));
  } catch (e) {
    if (e && typeof e === "object" && "code" in e && e.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error(e);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

/** DELETE /api/grocery/[id] – delete one item */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.groceryItem.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    if (e && typeof e === "object" && "code" in e && e.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error(e);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
