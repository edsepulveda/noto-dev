import Image from "next/image";
import HeroLogo from "@/public/notes-landing.svg";

export function Hero() {

  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[350px] h-[350px] md:w-[400px] md:h-[400px]">
          <Image
            src={HeroLogo}
            fill
            className="object-contain"
            alt="landing page logo"
          />
        </div>
      </div>
    </div>
  );
}
