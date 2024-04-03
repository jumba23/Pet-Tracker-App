import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <BackgroundPattern />

      <AppHeader />
      {children}
      <AppFooter />
    </>
  );
};

export default Layout;
