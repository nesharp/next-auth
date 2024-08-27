import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `http://localhost:3000/auth/verify?token=${token}`;
  const emailResponse = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [email],
    subject: "Please verify your email",
    react: MessageTemplate({ link: confirmationLink }),
  });
  if (emailResponse.error) {
    console.log("Error while sending email: ", emailResponse.error);
  }
};
//TODO: move this to a separate file and change file extension to .ts
const MessageTemplate = ({ link }: { link: string }) => {
  return (
    <div>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg mt-10">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Verify Your Email
          </h1>
          <p className="text-gray-600 mt-4">Hi [User Name],</p>
          <p className="text-gray-600 mt-2">
            Thank you for signing up! Please click the button below to verify
            your email address.
          </p>
          <a href={link} className="block mt-6">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Verify Email
            </button>
          </a>
          <p className="text-gray-500 mt-4 text-sm">
            If you did not create an account, no further action is required.
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            Regards,
            <br />
            nesharp team
          </p>
        </div>
      </div>
    </div>
  );
};
