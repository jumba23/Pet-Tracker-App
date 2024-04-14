import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

const Login = () => {
  return (
    <main>
      <H1 className="mb-5 text-center">Sign Up</H1>

      <AuthForm />

      <p className="mt-6 text-sm text-zinc-500">
        Already have an account?{" "}
        {/* <a href="/sign-up" className="text-blue-500">
          Sign up
        </a> */}
        {/* Replace the anchor tag with the Link component. Link component will pre-fetch */}
        <Link href="/login" className="font-medium">
          Log in
        </Link>
      </p>
    </main>
  );
};

export default Login;
