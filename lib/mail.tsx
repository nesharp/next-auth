import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/two-factor?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your login",
    react: TwoFactorAuthTemplate({ link: confirmLink }),
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `http://localhost:3000/auth/verify?token=${token}`;
  const emailResponse = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Please verify your email",
    react: MessageTemplate({ link: confirmationLink }),
  });
  if (emailResponse.error) {
    console.log("Error while sending email: ", emailResponse.error);
  }
};
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/change-password?token=${token}`;
  const emailResponse = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    react: PasswordResetTemplate({ link: resetLink }),
  });
  if (emailResponse.error) {
    console.log("Error while sending email: ", emailResponse.error);
  }
};
const TwoFactorAuthTemplate = ({ link }: { link: string }) => {
  return (
    <div>
      <div
        style={{
          maxWidth: "32rem",
          margin: "2.5rem auto",
          backgroundColor: "white",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "0.5rem",
        }}
      >
        <div style={{ padding: "1.5rem" }}>
          <h1
            style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1F2937" }}
          >
            Confirm your login
          </h1>
          <p style={{ color: "#4B5563", marginTop: "1rem" }}>Hi [User Name],</p>
          <p style={{ color: "#4B5563", marginTop: "0.5rem" }}>
            We received a login attempt from your account. Please enter the
            verification code below to proceed with the login.
          </p>
          <a href={link} style={{ display: "block", marginTop: "1.5rem" }}>
            <button
              style={{
                width: "100%",
                backgroundColor: "#2563EB",
                color: "white",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                transition: "background-color 0.3s",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#1D4ED8")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#2563EB")
              }
            >
              Confirm
            </button>
          </a>
          <p
            style={{
              color: "#6B7280",
              marginTop: "1rem",
              fontSize: "0.875rem",
            }}
          >
            If you did not request this login, please ignore this email or
            contact support.
          </p>
          <p
            style={{
              color: "#6B7280",
              marginTop: "0.5rem",
              fontSize: "0.875rem",
            }}
          >
            Regards,
            <br />
            nesharp team
          </p>
        </div>
      </div>
    </div>
  );
};

const PasswordResetTemplate = ({ link }: { link: string }) => {
  return (
    <div>
      <div
        style={{
          maxWidth: "32rem",
          margin: "2.5rem auto",
          backgroundColor: "white",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "0.5rem",
        }}
      >
        <div style={{ padding: "1.5rem" }}>
          <h1
            style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1F2937" }}
          >
            Reset Your Password
          </h1>
          <p style={{ color: "#4B5563", marginTop: "1rem" }}>Hi [User Name],</p>
          <p style={{ color: "#4B5563", marginTop: "0.5rem" }}>
            We received a request to reset your password. Please click the
            button below to proceed with the reset.
          </p>
          <a href={link} style={{ display: "block", marginTop: "1.5rem" }}>
            <button
              style={{
                width: "100%",
                backgroundColor: "#2563EB",
                color: "white",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                transition: "background-color 0.3s",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#1D4ED8")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#2563EB")
              }
            >
              Reset Password
            </button>
          </a>
          <p
            style={{
              color: "#6B7280",
              marginTop: "1rem",
              fontSize: "0.875rem",
            }}
          >
            If you did not request a password reset, you can safely ignore this
            email.
          </p>
          <p
            style={{
              color: "#6B7280",
              marginTop: "0.5rem",
              fontSize: "0.875rem",
            }}
          >
            Regards,
            <br />
            nesharp team
          </p>
        </div>
      </div>
    </div>
  );
};

//TODO: move this to a separate file and change file extension to .ts
const MessageTemplate = ({ link }: { link: string }) => {
  return (
    <div>
      <div
        style={{
          maxWidth: "32rem",
          margin: "2.5rem auto",
          backgroundColor: "white",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "0.5rem",
        }}
      >
        <div style={{ padding: "1.5rem" }}>
          <h1
            style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1F2937" }}
          >
            Verify Your Email
          </h1>
          <p style={{ color: "#4B5563", marginTop: "1rem" }}>Hi [User Name],</p>
          <p style={{ color: "#4B5563", marginTop: "0.5rem" }}>
            Thank you for signing up! Please click the button below to verify
            your email address.
          </p>
          <a href={link} style={{ display: "block", marginTop: "1.5rem" }}>
            <button
              style={{
                width: "100%",
                backgroundColor: "#2563EB",
                color: "white",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                transition: "background-color 0.3s",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#1D4ED8")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#2563EB")
              }
            >
              Verify Email
            </button>
          </a>
          <p
            style={{
              color: "#6B7280",
              marginTop: "1rem",
              fontSize: "0.875rem",
            }}
          >
            If you did not create an account, no further action is required.
          </p>
          <p
            style={{
              color: "#6B7280",
              marginTop: "0.5rem",
              fontSize: "0.875rem",
            }}
          >
            Regards,
            <br />
            nesharp team
          </p>
        </div>
      </div>
    </div>
  );
};
