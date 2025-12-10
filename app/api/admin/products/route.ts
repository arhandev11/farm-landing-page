import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { order: "asc" },
    });
    // Parse sizes JSON string back to array for each product
    const productsWithParsedSizes = products.map((p) => ({
      ...p,
      sizes: JSON.parse(p.sizes),
    }));
    return NextResponse.json(productsWithParsedSizes);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/admin/products
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const product = await prisma.product.create({
      data: {
        slug: body.slug,
        name: body.name,
        description: body.description,
        season: body.season,
        sizes: JSON.stringify(body.sizes),
        order: body.order || 0,
      },
    });
    
    return NextResponse.json({
      ...product,
      sizes: JSON.parse(product.sizes),
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/products
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    const product = await prisma.product.update({
      where: { id: body.id },
      data: {
        slug: body.slug,
        name: body.name,
        description: body.description,
        season: body.season,
        sizes: JSON.stringify(body.sizes),
        order: body.order,
      },
    });
    
    return NextResponse.json({
      ...product,
      sizes: JSON.parse(product.sizes),
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/products
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
    
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
