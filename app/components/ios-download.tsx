"use client";

export default function IOSDownload() {
    const downloadIPA = () => {
        window.location.href = "itms-services://?action=download-manifest&url=https://capstone24.sit.kmutt.ac.th//sy1/sideload/downloads/Memo.plist";
    }

    return (
        <div className="text-center p-5">
            <button onClick={downloadIPA} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Install iOS App
            </button>
        </div>
    )
}