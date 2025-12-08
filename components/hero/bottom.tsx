
"use client"
import Image from "next/image";
import Button from "../ui/button";
import { navTypeStore, preLoaderStore } from "@/store/store";
import {  useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText)
export default function Bottom(){
    const isLoaded = preLoaderStore(state => state.isLoaded)
    const t1 = useRef<HTMLDivElement>(null)
    const t2 = useRef<HTMLDivElement>(null)
    const bottomCnt = useRef<HTMLDivElement>(null)
    const navType = navTypeStore(state => state.navType)
    const hasAnimatedRef = useRef<boolean>(false)
    useGSAP(async(ctx)=>{
      
      if(navType !== "initial") {
            gsap.set([t1.current,t2.current,"#line",bottomCnt.current],{visibility:"visible"})
            return
      }
      if(!isLoaded){
            gsap.set([t1.current,t2.current,"#line",bottomCnt.current],{visibility:"hidden"})
            return
      }
      if(hasAnimatedRef.current) return
      hasAnimatedRef.current = true
      await document.fonts.ready
      await new Promise(res => requestAnimationFrame(res))
      const t1Split = SplitText.create(t1.current,{type:"words"})
      const t2Split = SplitText.create(t2.current,{type:"words"})
      gsap.set([t1.current,t2.current,"#line",bottomCnt.current],{visibility:"visible"})
      gsap.set(bottomCnt.current,{opacity:0})
      gsap.set(t1Split.words,{y:300})
      gsap.set(t2Split.words,{y:400})
      gsap.set("#line",{width:0})
      gsap.set(bottomCnt.current,{opacity:0})
      const timeline = gsap.timeline()
      timeline.to(t1Split.words,{
        y:0,
        duration:1,
        delay:0.5,
        stagger:{
          amount:0.15,
          from:"start",
          ease:"bounce.in"
        }
      }).to(t2Split.words,{
        y:0,
        duration:1,
        stagger:{
          amount:0.15,
          from:"start",
          ease:"bounce.in"
        }
      },"-=0.2").to("#line",{
        width:"500px",
        duration:1,
        ease:"power3.in"
      },"-=0.5").to(bottomCnt.current,{
        opacity:1,
        duration:0.5,
        ease:"power1.in"
      })

      
      return () => {
        t1Split.revert()
        t2Split.revert()
      }
      
    },[isLoaded,navType])
    return (
      <div className=" ">
        <div className="flex flex-col lg:flex-row justify-between items-start ">
          <div className="  uppercase font-bebas text-3xl w-full lg:max-w-lg lg:text-7xl pt-10 lg:pt-20 relative ">
            <div  className=" relative  overflow-hidden">
              <span ref={t1} className=" invisible">Code. Design. </span>
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 noise-small-overlay"/>
              </div>
            <div  className="  relative overflow-hidden">
              <span ref={t2} className=" invisible">Create Experiences.</span>
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 noise-small-overlay"/>
              </div>
          </div>
          <div ref={bottomCnt} className=" flex flex-col gap-4 pt-5 lg:pt-20   invisible">
            <div className=" font-switzer text-sm md:text-base">
              <p>A full stack developer and designer focused on </p>
              <p>building seamless, purposeful digital experiences.</p>
              <p>I combine clean design with precise engineering </p>
              <p>to craft products that not only work flawlessly </p>
              <p>but feel effortless to use.</p>
            </div>
            <div className=" flex gap-4">
              <Button content="let's collaborate" href="/" variant="animate" />
              <Button content="hire me" href="/" />
            </div>
          </div>
        </div>
        <div id="line" className="h-4 hidden md:block w-[500px] bg-foreground mt-4 invisible relative">
          <div className=" noise-square absolute inset-0"></div>
        </div>
      </div>
    );
}