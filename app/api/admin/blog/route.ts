import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/blog
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    
    const articles = await prisma.blogArticle.findMany({
      where: {
        ...(category ? { category } : {}),
        ...(featured !== null ? { featured: featured === "true" } : {}),
      },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching blog articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog articles" },
      { status: 500 }
    );
  }
}

// POST /api/admin/blog
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const article = await prisma.blogArticle.create({
      data: {
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        category: body.category,
        date: body.date,
        readTime: body.readTime,
        featured: body.featured || false,
        image: body.image,
        published: body.published ?? true,
        order: body.order || 0,
      },
    });
    
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("Error creating blog article:", error);
    return NextResponse.json(
      { error: "Failed to create blog article" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/blog
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    const article = await prisma.blogArticle.update({
      where: { id: body.id },
      data: {
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        category: body.category,
        date: body.date,
        readTime: body.readTime,
        featured: body.featured,
        image: body.image,
        published: body.published,
        order: body.order,
      },
    });
    
    return NextResponse.json(article);
  } catch (error) {
    console.error("Error updating blog article:", error);
    return NextResponse.json(
      { error: "Failed to update blog article" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/blog
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
    
    await prisma.blogArticle.delete({
      where: { id: parseInt(id) },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog article:", error);
    return NextResponse.json(
      { error: "Failed to delete blog article" },
      { status: 500 }
    );
  }
}
