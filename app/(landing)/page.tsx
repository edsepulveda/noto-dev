"use client";

import { Header, Footer, Hero } from "./_components/index";

export default function Home() {
  return (
    <main className="pointer-events-auto flex min-h-screen flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <section>
          <Header />
        </section>
        <section className="w-full">
          <Hero />
        </section>
      </div>
      <Footer />
    </main>
  );
}
