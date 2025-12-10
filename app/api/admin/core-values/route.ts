import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/core-values
export async function GET() {
  try {
    const values = await prisma.coreValue.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(values);
  } catch (error) {
    console.error("Error fetching core values:", error);
    return NextResponse.json(
      { error: "Failed to fetch core values" },
      { status: 500 }
    );
  }
}

// POST /api/admin/core-values
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const value = await prisma.coreValue.create({
      data: {
        icon: body.icon,
        title: body.title,
        description: body.description,
        order: body.order || 0,
      },
    });
    
    return NextResponse.json(value, { status: 201 });
  } catch (error) {
    console.error("Error creating core value:", error);
    return NextResponse.json(
      { error: "Failed to create core value" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/core-values
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    const value = await prisma.coreValue.update({
      where: { id: body.id },
      data: {
        icon: body.icon,
        title: body.title,
        description: body.description,
        order: body.order,
      },
    });
    
    return NextResponse.json(value);
  } catch (error) {
    console.error("Error updating core value:", error);
    return NextResponse.json(
      { error: "Failed to update core value" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/core-values
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }
    
    await prisma.coreValue.delete({
      where: { id: parseInt(id) },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting core value:", error);
    return NextResponse.json(
      { error: "Failed to delete core value" },
      { status: 500 }
    );
  }
}
