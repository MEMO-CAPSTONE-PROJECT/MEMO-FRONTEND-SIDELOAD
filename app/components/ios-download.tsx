"use client";

export default function IOSDownload() {
    const installIPA = () => {
        window.location.href = "itms-services://?action=download-manifest&url=https://capstone24.sit.kmutt.ac.th/sy1/sideload/downloads/Memo.plist";
    }
    const installConfig = () => {
        window.location.href = "https://capstone24.sit.kmutt.ac.th/sy1/sideload/downloads/Memo.mobileconfig";
    }

    return (
        <div className="flex flex-col gap-y-4 text-center p-5">
            <button onClick={installIPA} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Install iOS App
            </button>
            <button onClick={installConfig} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Install Configuration Profile
            </button>
        </div>
    )
}