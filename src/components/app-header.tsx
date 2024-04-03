import Link from "next/link";
import Logo from "./logo";

const routes = [
  {
    label: "Dashboard",
    path: "/app/dashboard",
  },
  {
    label: "Account",
    path: "/app/account",
  },
];

const AppHeader = () => {
  return (
    <header className="flex justify-between">
      <Logo />

      <nav>
        <ul className="flex gap-2">
          {routes.map((route) => (
            <li key={route.path}>
              <Link href={route.path}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
