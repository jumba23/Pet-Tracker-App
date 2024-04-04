"use client";

import { usePetContext } from "@/lib/hooks";
import Image from "next/image";

const PetDetails = () => {
  const { selectedPet } = usePetContext();

  return (
    <section className="flex flex-col h-full w-full">
      <TopBar pet={selectedPet} />

      <OtherInfo pet={selectedPet} />

      <section className="flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border border-black-[0.08]">
        {selectedPet?.notes}
      </section>
    </section>
  );
};

export default PetDetails;

const TopBar = ({ pet }) => {
  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-black/[0.08]">
      <Image
        src={pet?.imageUrl}
        alt="Selected pet image"
        width={75}
        height={75}
        className="w-[75px] h-[75px] rounded-full object-cover"
      />
      <h2 className="text-3xl font-semibold leading-7 ml-5">{pet?.name}</h2>
    </div>
  );
};

const OtherInfo = ({ pet }) => {
  return (
    <div className="flex justify-around py-10 px-5 text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{pet?.age}</p>
      </div>
    </div>
  );
};
