

import Hero from "@/components/hero";
import About from "@/components/about";
import AboutHeading from "@/components/ui/aboutHeading";
import Technology from "@/components/technology";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import ClientHomeController from "./ClientHomeController";

export default function Home() {
  
  
  return (
    <>
      <ClientHomeController />
      <div className="  max-width mx-auto">
        <Hero />
      </div>
      <AboutHeading />
      <div className=" max-width mx-auto  mt-8 lg:mt-24">
        <About />
        <Technology />
      </div>
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
