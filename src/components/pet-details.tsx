"use client";

import { usePetContext } from "@/lib/hooks";
import Image from "next/image";

const PetDetails = () => {
  const { selectedPet } = usePetContext();

  return (
    <section className="h-full w-full">
      <div className="flex items-center bg-white px-8 py-5 border-b border-black/[0.08]">
        <Image
          src={selectedPet?.imageUrl}
          alt="Selected pet image"
          width={75}
          height={75}
          className="w-[75px] h-[75px] rounded-full object-cover"
        />
        <h2 className="text-3xl font-semibold leading-7 ml-5">
          {selectedPet?.name}
        </h2>
      </div>

      <div></div>
    </section>
  );
};

export default PetDetails;
