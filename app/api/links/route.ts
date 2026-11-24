import { NextResponse } from "next/server";
import { getAllLinks, createLink } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const links = getAllLinks();
    return NextResponse.json({ success: true, links });
  } catch (error) {
    console.error("Failed to fetch links:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch links" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, error: "Destination URL is required." },
        { status: 400 }
      );
    }

    const result = createLink({ url });
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, link: result.link }, { status: 201 });
  } catch (error) {
    console.error("Error creating link:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
