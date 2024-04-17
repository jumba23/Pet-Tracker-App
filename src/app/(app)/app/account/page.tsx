import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import auth from "@/middleware";

const Page = async () => {
  const session = await auth();
  if (!session?.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>

      <ContentBlock className="h-[500px] flex items-center justify-center">
        <p>Logged in as {session?.user.email}</p>
      </ContentBlock>
    </main>
  );
};

export default Page;
