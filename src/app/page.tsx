import { SceneLayer } from "@/components/scene/SceneLayer";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Archive } from "@/components/sections/Archive";
import { Stack } from "@/components/sections/Stack";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SceneLayer />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Work />
        <Archive />
        <Stack />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
