// app/page.tsx
"use client"

import { useEffect, useState } from "react";

interface Artifact {
  id: number;
  name: string;
  size_in_bytes: number;
  url: string;
  archive_download_url: string;
  expired: boolean;
  created_at: string;
  expires_at: string;
  workflow_run: WorkflowRun
}

interface WorkflowRun {
  id: number;
  repository_id: number;
  head_repository_id: number;
  head_branch: string;
  head_sha: string;
}

const fetchArtifacts = async (): Promise<Artifact[]> => {
  const res = await fetch("/sy1/sideload/api/artifacts"); // Replace with your API route
  if (!res.ok) throw new Error("Failed to fetch artifacts");
  return res.json();
};

const Home = () => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArtifacts()
      .then(setArtifacts)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [])

  const downloadArtifact = async (artifactId: number) => {
    console.log(artifactId);
    
    try {
      const res = await fetch(`/sy1/sideload/api/artifacts/download?id=${artifactId}`);

      if (!res.ok) throw new Error("Failed to fetch download URL");

      window.location.href = res.url; // Redirect user to the download URL
    } catch (error) {
      alert("Download failed. Check console for details.");
      console.error("Download Error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-black">📂 Artifact Versions</h2>

      {loading ? (
        <p className="text-gray-500">Loading artifacts...</p>
      ) : (
        <ul className="space-y-4">
          {artifacts?.toSorted((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())?.map((artifact) => {
            const isExpired = new Date(artifact.expires_at) < new Date();
            return (
              <li
                key={artifact.id}
                className="p-4 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-200"
              >
                <div>
                  <div className="flex flex-row space-x-2 items-center">
                    <h3 className="font-semibold text-lg text-black">{artifact.name}</h3>
                    <div className="bg-blue-200 px-1 rounded border border-blue-600 h-fit">
                      <p className="text-blue-600 font-bold text-xs">{artifact.workflow_run.head_branch}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    📅 Created: {new Date(artifact.created_at).toLocaleDateString()}
                  </p>
                  <p className={`text-sm ${isExpired ? "text-red-500" : "text-green-500"}`}>
                    ⏳ {isExpired ? "Expired" : `Expires in: ${new Date(artifact.expires_at).toLocaleDateString()}`}
                  </p>
                </div>
                <button
                  onClick={() => downloadArtifact(artifact.id)}
                  className={`px-4 py-2 rounded text-white ${
                    isExpired ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  disabled={isExpired}
                >
                  ⬇ Download APK <span>({(artifact.size_in_bytes / 1000000).toFixed(2)} MB)</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  )
}

export default Home;
