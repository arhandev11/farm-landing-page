import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/community-programs
export async function GET() {
  try {
    const programs = await prisma.communityProgram.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(programs);
  } catch (error) {
    console.error("Error fetching community programs:", error);
    return NextResponse.json(
      { error: "Failed to fetch community programs" },
      { status: 500 }
    );
  }
}

// POST /api/admin/community-programs
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const program = await prisma.communityProgram.create({
      data: {
        icon: body.icon,
        title: body.title,
        description: body.description,
        order: body.order || 0,
      },
    });
    
    return NextResponse.json(program, { status: 201 });
  } catch (error) {
    console.error("Error creating community program:", error);
    return NextResponse.json(
      { error: "Failed to create community program" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/community-programs
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    const program = await prisma.communityProgram.update({
      where: { id: body.id },
      data: {
        icon: body.icon,
        title: body.title,
        description: body.description,
        order: body.order,
      },
    });
    
    return NextResponse.json(program);
  } catch (error) {
    console.error("Error updating community program:", error);
    return NextResponse.json(
      { error: "Failed to update community program" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/community-programs
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
    
    await prisma.communityProgram.delete({
      where: { id: parseInt(id) },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting community program:", error);
    return NextResponse.json(
      { error: "Failed to delete community program" },
      { status: 500 }
    );
  }
}
