import H1 from "@/components/h1";

const Page = () => {
  return (
    <main>
      <div className="flex justify-between items-center text-white py-8">
        <section>
          <H1>
            Pet<span className="font-semibold">Stay</span>
          </H1>
          <p>Manage your pet daycare with ease.</p>
        </section>
        <section>
          <p className="text-2xl font-bold leading-6">2</p>
          <p className="opacity-80">Current Guests</p>
        </section>
      </div>
    </main>
  );
};

export default Page;
