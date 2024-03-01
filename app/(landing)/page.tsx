'use client'

import { Header, Footer, Hero} from './_components/index'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Header />
        <Hero />
      </div>
      <Footer />
    </main>
  );
}
