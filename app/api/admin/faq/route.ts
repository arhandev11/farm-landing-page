import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/faq
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    
    const faqs = await prisma.fAQ.findMany({
      where: type ? { type } : undefined,
      orderBy: [{ type: "asc" }, { order: "asc" }],
    });
    return NextResponse.json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json(
      { error: "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}

// POST /api/admin/faq
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const faq = await prisma.fAQ.create({
      data: {
        type: body.type,
        question: body.question,
        answer: body.answer,
        order: body.order || 0,
      },
    });
    
    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return NextResponse.json(
      { error: "Failed to create FAQ" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/faq
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    const faq = await prisma.fAQ.update({
      where: { id: body.id },
      data: {
        type: body.type,
        question: body.question,
        answer: body.answer,
        order: body.order,
      },
    });
    
    return NextResponse.json(faq);
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return NextResponse.json(
      { error: "Failed to update FAQ" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/faq
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
    
    await prisma.fAQ.delete({
      where: { id: parseInt(id) },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return NextResponse.json(
      { error: "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}
