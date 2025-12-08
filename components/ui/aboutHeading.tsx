"use client"
import { preLoaderStore } from "@/store/store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { IoArrowForwardSharp } from "react-icons/io5";
gsap.registerPlugin(ScrollTrigger)
export default function AboutHeading(){
    const containerRef = useRef<HTMLDivElement>(null)
    const tweenRef = useRef<GSAPTween>(null)
    const currentDirection = useRef(1)
    useGSAP(()=>{
        const items = gsap.utils.toArray(".marqueeItem") as HTMLElement[]
        
        tweenRef.current = gsap.to(items,{
            xPercent:-100,
            ease:"none",
            duration:60,
            repeat:-1,
            modifiers:{
                xPercent: gsap.utils.wrap(-100,0)
            }
        })
        ScrollTrigger.create({
            trigger:containerRef.current,
            start:"top 70%",
            end:"bottom 10%",
            onUpdate:(self)=> {
                tweenRef?.current?.timeScale(self.direction === 1 ? 1: -1)

                if(self.direction !== currentDirection.current){
                    currentDirection.current = self.direction
                    gsap.to(".arrow",{
                        rotation:self.direction === 1 ? 180 : 0,
                        duration:0.6,
                        ease:"power2.out"
                    })
                }
            }
        })
    },[])
    return (
        <div id="about" ref={containerRef} className="  text-4xl md:text-7xl lg:text-8xl font-switzer font-semibold text-background bg-foreground uppercase relative  py-8 flex px-2 overflow-hidden mt-8  ">
            <div className=" noise-square absolute inset-0"></div>
            {[...Array(2)].map((_,i) => (
                <div key={i} className="   flex shrink-0 marqueeItem">
                    {[...Array(7)].map((_,j) => (
                        <div key={j} className="   flex">
                            <p>About myself</p>
                            <p   className=" px-8 arrow rotate-180"><IoArrowForwardSharp /></p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}