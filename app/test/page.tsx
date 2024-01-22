import { db } from "@/lib/db";

const Page = async () => {
  const test = await db.user.findMany();
  console.log(test);
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
