import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex items-center justify-center gap-10">
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
        <p>
          Use Pet Tracker to easily keep track of pets under your care. Get a
          lifetime access for $299.
        </p>
      </div>
    </main>
  );
}
