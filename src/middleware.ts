// import { NextResponse } from "next/server";

import { auth } from "./lib/auth";

// export const middleware = (request: Request) => {
//   console.log("middleware", request.url);
//   return NextResponse.next();
// };

export default auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
