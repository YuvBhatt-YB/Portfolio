"use client"
export const dynamic = "force-dynamic";
import Image from "next/image";
import PreLoader from "@/components/preLoader";
import Hero from "@/components/hero";
import About from "@/components/about";
import AboutHeading from "@/components/ui/aboutHeading";
import Technology from "@/components/technology";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import { navTypeStore, preLoaderStore } from "@/store/store";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
export default function Home() {
  const {isLoaded,setIsLoaded} = preLoaderStore()
  const navType = navTypeStore((state) => state.navType)
  const params = useSearchParams()
  const section = params.get("section")
  useEffect(() => {
    if(navType === "initial"){
      setIsLoaded(false)
    }else{
      setIsLoaded(true)
    }
  },[])
  useEffect(() => {
    if(navType !== "none") return
    if(!section) return
    const el = document.querySelector(`#${section}`)
    if(!el) return
    el.scrollIntoView({
          behavior:"smooth",
          block:"center",
          inline:"center"
    })
    setTimeout(()=>{
      window.history.replaceState(null,"","/")
    },500)
  },[navType])
  return (
    <>
      {navType === "initial" && <PreLoader onComplete={()=>setIsLoaded(true)} />}
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
