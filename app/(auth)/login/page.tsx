import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="relative bg-gradient-to-bl from-blue-600 via-transparent dark:from-blue-950 dark:via-transparent">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}
