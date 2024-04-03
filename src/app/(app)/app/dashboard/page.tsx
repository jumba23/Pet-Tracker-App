const Page = () => {
  return (
    <main>
      <div className="flex justify-between items-center text-white py-8">
        <section className="text-medium text-2xl leading-6">
          <h1>
            Pet<span className="font-semibold">Stay</span>
          </h1>
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
