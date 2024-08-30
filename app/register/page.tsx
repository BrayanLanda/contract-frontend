import RegisterForm from "../_components/RegisterForm";

export const metadata = {
    title: "Login",
  };
  
  export default function Page() {
    return (
      <div className="flex flex-col gap-10 mt-10 items-center">
        <h2 className="text-3xl font-semibold">
          Register
        </h2>
        <RegisterForm />
      </div>
    );
  }