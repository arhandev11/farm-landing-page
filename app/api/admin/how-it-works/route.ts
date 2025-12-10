import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/how-it-works
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    
    const steps = await prisma.howItWorksStep.findMany({
      where: type ? { type } : undefined,
      orderBy: [{ type: "asc" }, { order: "asc" }],
    });
    return NextResponse.json(steps);
  } catch (error) {
    console.error("Error fetching how-it-works steps:", error);
    return NextResponse.json(
      { error: "Failed to fetch how-it-works steps" },
      { status: 500 }
    );
  }
}

// POST /api/admin/how-it-works
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const step = await prisma.howItWorksStep.create({
      data: {
        type: body.type,
        step: body.step,
        icon: body.icon,
        title: body.title,
        description: body.description,
        order: body.order || 0,
      },
    });
    
    return NextResponse.json(step, { status: 201 });
  } catch (error) {
    console.error("Error creating how-it-works step:", error);
    return NextResponse.json(
      { error: "Failed to create how-it-works step" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/how-it-works
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    const step = await prisma.howItWorksStep.update({
      where: { id: body.id },
      data: {
        type: body.type,
        step: body.step,
        icon: body.icon,
        title: body.title,
        description: body.description,
        order: body.order,
      },
    });
    
    return NextResponse.json(step);
  } catch (error) {
    console.error("Error updating how-it-works step:", error);
    return NextResponse.json(
      { error: "Failed to update how-it-works step" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/how-it-works
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
    
    await prisma.howItWorksStep.delete({
      where: { id: parseInt(id) },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting how-it-works step:", error);
    return NextResponse.json(
      { error: "Failed to delete how-it-works step" },
      { status: 500 }
    );
  }
}
