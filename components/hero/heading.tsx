"use client"

import { navTypeStore, preLoaderStore } from "@/store/store"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"
import { useRef } from "react"

gsap.registerPlugin(SplitText)
export default function Heading(){
    const isLoaded = preLoaderStore(state => state.isLoaded)
    const navType = navTypeStore(state => state.navType)
    const hasAnimatedRef = useRef<boolean>(false)
    useGSAP(async(context)=>{
        
        

        if(navType !== "initial") {
            gsap.set(["#f1","#f2",".small-txt"],{visibility:"visible"})
            return
        }
        if(!isLoaded){
            gsap.set(["#f1","#f2",".small-txt"],{visibility:"hidden"})
            return
        }
        if(hasAnimatedRef.current) return
        hasAnimatedRef.current = true

        await document.fonts.ready
        await new Promise(res => requestAnimationFrame(res))
        const f1Text = SplitText.create("#f1",{type:"chars"})
        const f2Text = SplitText.create("#f2",{type:"chars"})
        gsap.set(["#f1","#f2",".small-txt"],{visibility:"visible"})
        gsap.set([f1Text.chars,f2Text.chars],{y:400})
        gsap.set("#d1",{width:0})
        gsap.set(".small-txt",{opacity:0})
        const timeline = gsap.timeline()
        timeline.to(f1Text.chars,{
            y:0,
            duration:1,
            stagger:{
                amount:0.2,
                from:"center",
                ease:"bounce.in"
            }
        },"-=0.2").to(f2Text.chars,{
            y:0,
            duration:1,
            stagger:{
                amount:0.15,
                from:"center",
                ease:"bounce.in"
            }
        },"-=0.5").to("#d1",{
            width:"400px",
            duration:1,
            ease:"power3.in"
        },"-=0.5").to(".small-txt",{
        opacity:1,
        duration:0.5,
        ease:"power1.in"
        })
        
        return () => {
            f1Text.revert()
            f2Text.revert()
        }

    },[isLoaded,navType])
    return (
        <div className="  hero ">
            <div className=" text-sm md:text-base  flex justify-end uppercase font-switzer font-normal  text-foreground small-txt invisible ">
                
                <span>[ 2025 ]</span>
            </div>
            <div className=" py-4 lg:py-2  text-foreground">
                <div className=" flex items-center justify-between">
                    <div className=" relative inline-block overflow-hidden">
                        <span id="f1" className=" font-switzer font-bold text-[clamp(3rem,8vw,9.375rem)] m-0  -ml-1 lg:-ml-2 leading-12 md:leading-[clamp(30px,8vw,128px)] lg:leading-[clamp(90px,11vw,180px)]   invisible  ">Full Stack</span>
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 noise-overlay"
                        />
                    </div>
                    <div id="d1" className=" h-4 lg:h-8 w-[400px] bg-foreground hidden md:block relative">
                        <div className=" noise-square absolute inset-0"></div>
                    </div>
                </div>
                <div className=" relative overflow-hidden pb-5  md:pb-[clamp(20px,1vw,40px)] lg:pb-[clamp(10px,3vw,56px)]  m-0 -ml-1 sm:-ml-1 md:-ml-1.5 lg:-ml-[clamp(8px,0.6vw,24px)] "  >
                    <span id="f2" className=" font-switzer font-bold  text-[clamp(4rem,13vw,16rem)]  leading-16 sm:leading-24  md:leading-32 lg:leading-extra     invisible  overflow-hidden" >Developer</span>
                    <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 noise-overlay"
                    />
                    </div>
            </div>
            <div className="text-sm md:text-base  flex justify-start uppercase font-switzer font-normal   text-foreground small-txt invisible ">
                <span>[ currently in tbd ]</span>
            </div>
        </div>
    )
}