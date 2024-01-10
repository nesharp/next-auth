import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin-ext"],
  weight: ["600"],
});
interface HeaderProps {
  label: string;
}
export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex w-full flex-col gap-y-4 items-center justify-centers">
      <h1 className={cn(font.className, "text-3xl font-semibold")}> 🔐Auth</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
