import Logo from "@/components/logo";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[#5DC9A8] min-h-screen flex xl:flex-row flex-col items-center justify-center gap-10">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="Pet Tracker App Preview"
        width={519}
        height={472}
      />

      <div>
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Manage your <span className="font-extrabold"> pet daycare </span> with
          ease
        </h1>
        <p className="text-2xl font-medium max-w-[600px]">
          Use Pet Tracker to easily keep track of pets under your care. Get a
          lifetime access for $299.
        </p>
        <div className="mt-10">
          <button>Sign Up</button>
        </div>
      </div>
    </main>
  );
}
