import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { login } from "@/actions/actions";

type AuthFormProps = {
  type: "login" | "signUp";
};

const AuthForm = ({ type }: AuthFormProps) => {
  return (
    <form
      action={login} // ACTION attribute comes with some progressive enhancements
      // onSubmit={(e) => {
      //   e.preventDefault();
      // }}
    >
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" />
      </div>

      <div className="mb-4 mt-2 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" />
      </div>

      <Button>{type === "login" ? "Log in" : "Sign up"}</Button>
    </form>
  );
};

export default AuthForm;
