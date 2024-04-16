import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

const Login = () => {
  return (
    <main>
      <H1 className="mb-5 text-center">Login Page</H1>

      <AuthForm type="login" />

      <p className="mt-6 text-sm text-zinc-500">
        No account yet?{" "}
        {/* <a href="/sign-up" className="text-blue-500">
          Sign up
        </a> */}
        {/* Replace the anchor tag with the Link component. Link component will pre-fetch */}
        <Link href="/signup" className="font-medium">
          Sign up
        </Link>
      </p>
    </main>
  );
};

export default Login;
