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
    </main>
  );
}
