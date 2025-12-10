import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/hero-stats
export async function GET() {
  try {
    const stats = await prisma.heroStat.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching hero stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero stats" },
      { status: 500 }
    );
  }
}

// POST /api/admin/hero-stats
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const stat = await prisma.heroStat.create({
      data: {
        value: body.value,
        label: body.label,
        order: body.order || 0,
      },
    });
    
    return NextResponse.json(stat, { status: 201 });
  } catch (error) {
    console.error("Error creating hero stat:", error);
    return NextResponse.json(
      { error: "Failed to create hero stat" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/hero-stats
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    const stat = await prisma.heroStat.update({
      where: { id: body.id },
      data: {
        value: body.value,
        label: body.label,
        order: body.order,
      },
    });
    
    return NextResponse.json(stat);
  } catch (error) {
    console.error("Error updating hero stat:", error);
    return NextResponse.json(
      { error: "Failed to update hero stat" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/hero-stats
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
    
    await prisma.heroStat.delete({
      where: { id: parseInt(id) },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting hero stat:", error);
    return NextResponse.json(
      { error: "Failed to delete hero stat" },
      { status: 500 }
    );
  }
}
