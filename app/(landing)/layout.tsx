import { Spotlight } from "../components/spotlight";
import { NavbarLanding } from "./_components/index";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-[calc(100vh)] rounded-md relative bg-backrground dark:bg-[#121212]">
      <NavbarLanding />
      <main className="h-full">{children}</main>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
    </div>
  );
}
