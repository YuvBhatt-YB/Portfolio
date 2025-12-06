"use client"

import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

import Image from "next/image"
import { useEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger)
export default function ProjectSlider({sliderImages}:{sliderImages: string[]}){
    const projectSliderRef = useRef<HTMLDivElement>(null)
    const sliderRef = useRef<HTMLDivElement>(null)
    const progressBar = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        const isMd = window.innerWidth < 768
        console.log(window.innerWidth)
        console.log(sliderRef.current?.offsetWidth)
        if(!projectSliderRef.current) return
        if(!sliderRef.current) return
        
        const amountToScroll =  sliderRef.current?.offsetWidth - window.innerWidth + 64
        const ctx = gsap.context(() => {
            gsap.to(sliderRef.current,{
                x:-amountToScroll,
                scrollTrigger:{
                    trigger:projectSliderRef.current,
                    start:"top 10%",
                    end:"+="+ amountToScroll,
                    scrub:2,
                    pin:true
                }
            })
            gsap.to(progressBar.current,{
                width:"100%",
                scrollTrigger:{
                    trigger:projectSliderRef.current,
                    start:"top 10%",
                    end:"+="+ amountToScroll,
                    scrub:1,
                    onUpdate:(self) => {
                        gsap.to(".progress",{
                            opacity: self.progress > 0 && self.progress < 1 ? 1 : 0,
                            duration:0.3,
                            ease:"power2.out"
                        })
                    }
                }
            })
        })

        return () => ctx.revert()
    },[])
    return (
        <div ref={projectSliderRef} className="   h-[90dvh] px-2 md:px-8 flex  items-center overflow-x-hidden  relative">
            <div ref={sliderRef} className="  flex gap-4  ">
                {sliderImages.map((img,i) => (
                    <div key={i} >
                        <div className=" w-[600px] md:w-[1200px] relative aspect-4/3 md:aspect-video ">
                            <Image alt="slider image" src={img} fill className=" object-cover"   />
                        </div>
                    </div>
                ))}
            </div>
            <div  className=" progress w-[95%] h-2 absolute bottom-10 bg-[#e1e1e1] opacity-0    ">
                <div ref={progressBar} className=" w-0 h-full bg-foreground ">
                </div>
            </div>
        </div>
    )
}