import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/testimonials
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

// POST /api/admin/testimonials
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const testimonial = await prisma.testimonial.create({
      data: {
        name: body.name,
        location: body.location,
        quote: body.quote,
        order: body.order || 0,
      },
    });
    
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/testimonials
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    const testimonial = await prisma.testimonial.update({
      where: { id: body.id },
      data: {
        name: body.name,
        location: body.location,
        quote: body.quote,
        order: body.order,
      },
    });
    
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/testimonials
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
    
    await prisma.testimonial.delete({
      where: { id: parseInt(id) },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
