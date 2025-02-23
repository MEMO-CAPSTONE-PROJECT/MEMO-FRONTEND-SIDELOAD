import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

// Route for serving the Memo.plist file
export async function GET() {
  // Define the file path for the .plist file
  const filePath = path.join(process.cwd(), "public", "downloads", "Memo.plist");

  try {
    // Check if the file exists
    const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
    if (!fileExists) {
      return new NextResponse("File not found", { status: 404 });
    }

    // Read the file content
    const fileContents = await fs.readFile(filePath);

    // Return the file with the appropriate headers
    return new NextResponse(fileContents, {
      headers: {
        "Content-Type": "application/x-plist", // MIME type for .plist
        "Content-Disposition": "attachment; filename=Memo.plist", // Forces download with specified filename
      },
    });
  } catch (error) {
    // Handle error if file is not found
    return new NextResponse("File not found", { status: 404 });
  }
}
