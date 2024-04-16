import next from "next";
import { NextResponse } from "next/server";

export const middleware = (request: Request) => {
  console.log("middleware", request.url);
  return NextResponse.next();
};
