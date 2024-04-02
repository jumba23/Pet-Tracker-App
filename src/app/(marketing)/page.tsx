import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="Pet Tracker App Preview"
        width={519}
        height={472}
      />

      <div>
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Manage your <span className="font-extrabold"> pet daycare </span> with
          ease
        </h1>
      </div>
    </main>
  );
}
