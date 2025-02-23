import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

// Route for serving the memo_config.mobileconfig file
export async function GET() {
  // Define the file path for the .mobileconfig file
  const filePath = path.join(process.cwd(), "public", "downloads", "Memo.mobileconfig");

  try {
    // Read the file content
    const fileContents = await fs.readFile(filePath);

    // Return the file with the appropriate headers
    return new NextResponse(fileContents, {
      headers: {
        "Content-Type": "application/x-apple-aspen-config", // MIME type for mobile config files
        "Content-Disposition": "attachment; filename=memo_config.mobileconfig", // Forces download with specified filename
      },
    });
  } catch {
    // Handle error if file is not found
    return new NextResponse("File not found", { status: 404 });
  }
}
