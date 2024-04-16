import { NextResponse } from "next/server";

export const middleware = (request: Request) => {
  console.log("middleware", request.url);
  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};