import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { logIn, signUp } from "@/actions/actions";

type AuthFormProps = {
  type: "login" | "signUp";
};

const AuthForm = ({ type }: AuthFormProps) => {
  return (
    <form
      action={type === "login" ? logIn : signUp} // ACTION attribute comes with some progressive enhancements
    >
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" id="email" required maxLength={50} />
      </div>

      <div className="mb-4 mt-2 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          required
          maxLength={50}
        />
      </div>

      <Button>{type === "login" ? "Log in" : "Sign up"}</Button>
    </form>
  );
};

export default AuthForm;
