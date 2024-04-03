import Branding from "@/components/branding";
import ContentBlock from "@/components/content-block";
import PetDetails from "@/components/pet-details";
import PetList from "@/components/pet-list";
import SearchForm from "@/components/search-form";
import Stats from "@/components/stats";

const Page = () => {
  return (
    <main>
      <div className="flex justify-between items-center text-white py-8">
        <Branding />
        <Stats />
      </div>

      <div className="grid grid-cols-3 grid-rows-[45px_1rf]">
        <div className="row-start-1 row-span-1 col-start-1 col-span-1">
          <SearchForm />
        </div>
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
