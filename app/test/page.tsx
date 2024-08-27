import { auth } from "@/auth";
import { db } from "@/lib/db";
const Page = async () => {
  const test = await db.user.findMany();
  return (
    <div>
      <h1>Test Page</h1>
      {test?.map((t) => (
        <div key={t.id}>{t.password}</div>
      ))}
    </div>
  );
};
export default Page;
