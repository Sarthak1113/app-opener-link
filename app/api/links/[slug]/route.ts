import { NextResponse } from "next/server";
import { getLinkById, deleteLink } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const link = getLinkById(slug);

    if (!link) {
      return NextResponse.json(
        { success: false, error: "Link not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, link });
  } catch (error) {
    console.error("Error fetching link:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const success = deleteLink(slug);

    if (!success) {
      return NextResponse.json(
        { success: false, error: "Link not found or already deleted." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting link:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
