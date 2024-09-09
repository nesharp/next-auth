import { Card, CardFooter, CardHeader } from "../ui/card";
import { Header } from "@/components/auth/header";
import { BackButton } from "./back-button";
import { CardWrapper } from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { AuthRoutes } from "@/routes";
export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref={AuthRoutes.LOGIN}
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
