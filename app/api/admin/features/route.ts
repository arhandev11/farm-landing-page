import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/features
export async function GET() {
  try {
    const features = await prisma.feature.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(features);
  } catch (error) {
    console.error("Error fetching features:", error);
    return NextResponse.json(
      { error: "Failed to fetch features" },
      { status: 500 }
    );
  }
}

// POST /api/admin/features
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const feature = await prisma.feature.create({
      data: {
        icon: body.icon,
        title: body.title,
        description: body.description,
        order: body.order || 0,
      },
    });
    
    return NextResponse.json(feature, { status: 201 });
  } catch (error) {
    console.error("Error creating feature:", error);
    return NextResponse.json(
      { error: "Failed to create feature" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/features
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    const feature = await prisma.feature.update({
      where: { id: body.id },
      data: {
        icon: body.icon,
        title: body.title,
        description: body.description,
        order: body.order,
      },
    });
    
    return NextResponse.json(feature);
  } catch (error) {
    console.error("Error updating feature:", error);
    return NextResponse.json(
      { error: "Failed to update feature" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/features
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
    
    await prisma.feature.delete({
      where: { id: parseInt(id) },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting feature:", error);
    return NextResponse.json(
      { error: "Failed to delete feature" },
      { status: 500 }
    );
  }
}
