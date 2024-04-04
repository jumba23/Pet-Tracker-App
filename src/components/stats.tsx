"use client";

import { usePetContext } from "@/lib/hooks";

const Stats = () => {
  const { numberOfPets } = usePetContext();

  return (
    <section>
      <p className="text-2xl font-bold leading-6">{numberOfPets}</p>
      <p className="opacity-80">Current Guests</p>
    </section>
  );
};

export default Stats;
