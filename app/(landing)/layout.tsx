import { Spotlight } from "../components/spotlight";
import { NavbarLanding } from "./_components/index";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full rounded-md relative">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <NavbarLanding />
      <main className="h-full pt-0 md:pt-20">{children}</main>
    </div>
  );
}
