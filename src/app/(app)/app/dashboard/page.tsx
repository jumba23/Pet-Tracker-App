import Branding from "@/components/branding";
import Stats from "@/components/stats";

const Page = () => {
  return (
    <main>
      <div className="flex justify-between items-center text-white py-8">
        <Branding />
        <Stats />
      </div>

      <div>
        <SearchForm />
        <ContentBlock>
          <PetList />
        </ContentBlock>
        <ContentBlock>
          <PetDetails />
        </ContentBlock>
      </div>
    </main>
  );
};

export default Page;
