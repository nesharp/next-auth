import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const delayedResponse = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 3000);
  });
  console.log(delayedResponse);
  return NextResponse.json({ body: data });
};
