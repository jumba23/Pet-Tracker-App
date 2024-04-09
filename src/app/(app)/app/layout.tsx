import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import { Toaster } from "@/components/ui/sonner";
import PetContextProvider from "@/context/pet-context-provider";
import { SearchContextProvider } from "@/context/search-context-provider";
import prisma from "@/lib/db";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const response = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );

  // API call to fetch pets
  // if (!response.ok) {
  //   throw new Error("Failed to fetch pets");
  // }
  // const pets: Pet[] = await response.json();
  // console.log(data);

  // DB data
  const pets = await prisma.pet.findMany();

  return (
    <>
      <BackgroundPattern />

      <div className="flex flex-col max-w-[1050px] px-4 mx-auto min-h-screen">
        <AppHeader />

        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>

        <AppFooter />
      </div>

      <Toaster position="top-right" />
    </>
  );
};

export default Layout;
