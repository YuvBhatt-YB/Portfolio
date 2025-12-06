"use client"

import { projectLoaderStore } from "@/store/store"
import gsap from "gsap"
import { ScrollTrigger, SplitText } from "gsap/all"

import { useEffect, useRef } from "react"

gsap.registerPlugin(SplitText)
gsap.registerPlugin(ScrollTrigger)
export default function ProjectHeader({projectTitle,projectStacks}:
    {projectTitle: string,projectStacks : string[]}){
    const projectTitleRef = useRef<HTMLDivElement>(null)
    const projectHeader = useRef<HTMLDivElement>(null)
    const isLoaded = projectLoaderStore(state => state.isLoaded)
    
    useEffect(()=>{
        if(!isLoaded) {
            return
        }
        
        const projectTitleChars = SplitText.create(projectTitleRef.current,{type:"chars"})
        gsap.set([projectTitleRef.current,".stack"],{visibility:"visible"})
        gsap.set(projectTitleChars.chars,{y:400})
        const timelineOne = gsap.timeline()
        timelineOne.to(projectTitleChars.chars,{
            y:0,
            duration:1,
            stagger:{
                amount:0.4,
                ease:"power3.out"
            }
        }).to(".stack",{
            opacity:1,
            duration:1,
            stagger:{
                amount:0.3,
                ease:"power3.in"
            }
        },"-=0.5").to(projectHeader.current,{
            height:"500px",
            duration:1,
            ease:"sine.out",
            onComplete: () => {
                ScrollTrigger.refresh()
                document.documentElement.classList.remove("no-scroll")
                document.body.classList.remove("no-scroll")
            }
        })
       
        timelineOne.play()
    },[isLoaded])



    return (
        <>
        <div ref={projectHeader} className="  pt-20 lg:pt-28 max-width mx-auto h-dvh flex items-end  pb-12 px-2 [@media(min-width:1180px)]:px-0 ">
            <div className="  w-full flex flex-col sm:flex-row justify-between items-start gap-4 lg:gap-0 lg:items-center  project-hero   ">
                <div className="  w-full">
                    <div  className=" uppercase font-bebas text-8xl md:text-9xl lg:text-[180px] leading-none text-foreground  overflow-hidden relative ">
                        <span ref={projectTitleRef} className="invisible ">{projectTitle}</span>
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 noise-overlay"
                        />
                    </div>
                </div>
                <div className=" flex w-full lg:max-w-1/3 flex-wrap gap-x-2  gap-y-2 justify-start  items-start font-switzer text-[18px] ">
                    {projectStacks.map((tech,i) => (
                        <div key={i} className=" border border-[#8e8c8b] px-6 h-8 md:h-10  rounded-[20px] text-foreground flex items-center justify-center stack invisible opacity-0 ">
                            <p className="uppercase text-sm md:text-base">{tech}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
        
    )
}