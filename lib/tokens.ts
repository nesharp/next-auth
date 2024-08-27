import { v4 as uuid } from "uuid";
import { db } from "./db";

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await db.verificationToken.findFirst({
    where: { email },
  });
  // const updatedToken = await db.verificationToken.upsert({
  //   where: { id: existingToken?.id },
  //   update: { token, expires },
  //   create: { token, expires, email },
  // });
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }
  const newToken = await db.verificationToken.create({
    data: { token, expires, email },
  });
  return newToken;
};
