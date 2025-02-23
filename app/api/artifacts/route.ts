import { NextResponse } from "next/server";

export async function GET() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const API_URL = "https://api.github.com/repos/MEMO-CAPSTONE-PROJECT/MEMO-FRONTEND-MOBILE/actions/artifacts";

  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!res.ok) return NextResponse.json({ error: "Failed to fetch artifacts" }, { status: 500 });

  const data = await res.json();
  return NextResponse.json(data.artifacts);
}
