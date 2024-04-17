import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import SignOutBtn from "@/components/sign-out-btn";
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

  // ================ EXAMPLE ================
  // instead of creating this function in server actions component, we can create the function here
  // you cannot do this in a Client component such as SignOutBtn
  // const logout = async () => {
  //   "use server";
  //   await signOut();
  // };

  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>

      <ContentBlock className="h-[500px] flex flex-col gap-3 items-center justify-center">
        <p>Logged in as {session.user.email}</p>

        <SignOutBtn />
      </ContentBlock>
    </main>
  );
};

export default Page;
