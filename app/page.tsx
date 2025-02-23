import IOSDownload from "@/app/components/ios-download";

export default function Home() {
  return (
    <div className="flex  flex-col justify-center items-center w-screen h-screen bg-slate-100">
        <h1 className="text-black font-bold">Download memo application</h1>
        <IOSDownload/>
    </div>
  );
}
