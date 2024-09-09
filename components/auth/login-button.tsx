"use client";

import { AuthRoutes } from "@/routes";
import { useRouter } from "next/navigation";

interface AuthButtonProps {
  children: React.ReactNode;
  mode?: "redirect" | "modal";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild = false,
}: AuthButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push(AuthRoutes.LOGIN);
  };
  if (mode === "modal") {
    return <span>TODO: Make modal</span>;
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
