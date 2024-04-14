import { Input } from "./ui/input";
import { Label } from "./ui/label";

const AuthForm = () => {
  return (
    <form>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" />
      </div>
    </form>
  );
};

export default AuthForm;
