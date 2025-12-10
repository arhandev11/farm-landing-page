import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET /api/admin/site-config
export async function GET() {
  try {
    let config = await prisma.siteConfig.findFirst();
    
    if (!config) {
      // Create default config if none exists
      config = await prisma.siteConfig.create({
        data: {
          id: 1,
          name: "Teras Farm",
          tagline: "Menghubungkan Petambak Udang dengan Pasar yang Adil",
          description: "Platform B2B yang menghubungkan petambak udang Indonesia dengan pembeli secara langsung, transparan, dan berkelanjutan.",
          email: "info@terasfarm.com",
          whatsapp: "6281234567890",
          address: "Jakarta, Indonesia",
        },
      });
    }
    
    return NextResponse.json(config);
  } catch (error) {
    console.error("Error fetching site config:", error);
    return NextResponse.json(
      { error: "Failed to fetch site config" },
      { status: 500 }
    );
  }
}

// PUT /api/admin/site-config
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    const config = await prisma.siteConfig.upsert({
      where: { id: 1 },
      update: {
        name: body.name,
        tagline: body.tagline,
        description: body.description,
        email: body.email,
        whatsapp: body.whatsapp,
        address: body.address,
        instagram: body.instagram,
        facebook: body.facebook,
      },
      create: {
        id: 1,
        name: body.name,
        tagline: body.tagline,
        description: body.description,
        email: body.email,
        whatsapp: body.whatsapp,
        address: body.address,
        instagram: body.instagram,
        facebook: body.facebook,
      },
    });
    
    return NextResponse.json(config);
  } catch (error) {
    console.error("Error updating site config:", error);
    return NextResponse.json(
      { error: "Failed to update site config" },
      { status: 500 }
    );
  }
}
