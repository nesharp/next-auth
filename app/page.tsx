import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
const font = Poppins({ subsets: ["latin"], weight: ["600"] });
export default function Home() {
  return (
    <main className="flex  h-screen flex-col items-center justify-center text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6">
        <h1
          className={cn(
            font.className,
            "text-6xl font-semibold text-white drop-shadow-md"
          )}
        >
          🔐Auth
        </h1>
        <p className="text-white text-lg">A simple auth service</p>
        <div>
          <LoginButton>
            <Button variant={"secondary"} className="" size={"lg"}>
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
