import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const url = new URL(req.url);
  const artifactId = url.searchParams.get("id");

  if (!artifactId) {
    return NextResponse.json({ error: "Artifact ID is required" }, { status: 400 });
  }

  const API_URL = `https://api.github.com/repos/MEMO-CAPSTONE-PROJECT/MEMO-FRONTEND-MOBILE/actions/artifacts/${artifactId}/zip`;

  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch download URL" }, { status: 500 });
  }

  return NextResponse.redirect(res.url);
}
