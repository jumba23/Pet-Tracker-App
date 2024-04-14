import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";

const Login = () => {
  return (
    <main>
      <H1>Login Page</H1>

      <AuthForm />

      <p>
        No account yet?{" "}
        <a href="/sign-up" className="text-blue-500">
          Sign up
        </a>
      </p>
    </main>
  );
};

export default Login;
