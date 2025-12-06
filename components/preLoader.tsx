"use client"

import { navTypeStore, preLoaderStore } from "@/store/store"
import { useGSAP } from "@gsap/react"

import gsap from "gsap"
import { SplitText } from "gsap/all"
import { useEffect, useRef } from "react"

gsap.registerPlugin(SplitText)
export default function PreLoader({onComplete}:{onComplete:()=>void}){
    let currentCount = 0
    
    const counterRef = useRef<HTMLParagraphElement | null>(null)
    const preLoaderRef = useRef<HTMLDivElement | null>(null)
    const navType = navTypeStore((state) => state.navType)
    useEffect (()=> {
        document.documentElement.classList.add("no-scroll")
        document.body.classList.add("no-scroll")
        
        window.scrollTo(0, 0)
        gsap.set(preLoaderRef.current,{visibility:"visible"})
        let split = SplitText.create("#loading",{type:"chars"})
        const timeline = gsap.timeline({defaults: {ease:"power4.inOut"}})
        const isMobile = window.innerWidth < 1000
        
        const updateCount = () => {
            let random = Math.floor((Math.random() * 10)) + 1 
            let delay = Math.floor((Math.random() * 200)) + 50
            currentCount += random
            if (currentCount > 100) currentCount = 100

            if(counterRef.current){
                counterRef.current.innerText = currentCount.toString()
            }
            
            if(currentCount < 100) {
                setTimeout(updateCount,delay)
            }else{
                timeline.to("#loaderText",{
                    x:400,
                    duration:1

                }).to(split.chars,{
                    y:400,
                    duration:0.5,
                    stagger:0.05,
                },"-=0.5").to("#textY,#textB",{
                    scale:isMobile ? 4 : 6,
                    stagger:0.1,
                    x: (i) => isMobile ? (i === 0 ? -50 : 30) :(i === 0 ? -180 : 120) ,
                    ease:"power3.out"
                }).to("#textY,#textB",{
                    y: (i) => i === 0 ? -900 : 900,
                    duration:1.2,
                    ease:"power3.out"
                }).to(preLoaderRef.current,{
                    height:0,
                    duration:1.2,
                    ease:"power2.inOut",
                    onComplete:()=> {
                        gsap.set(preLoaderRef.current,{visibility:"hidden"})
                        document.documentElement.classList.remove("no-scroll")
                        document.body.classList.remove("no-scroll")
                    }
                },"-=0.5").add(()=> onComplete(),"-=0.5")
            }
        }
        updateCount()

    },[])
    return (
        <div  ref={preLoaderRef} className=" fixed inset-0 bg-foreground box-border flex flex-col justify-end z-99 overflow-hidden  ">
            <div className=" absolute inset-0 noise-menu"></div>
            <div className="  text-background  absolute inset-0 flex items-center justify-center gap-0.5 text-4xl md:text-8xl font-switzer font-black ">
                <h1 id="textY">Y</h1>
                <h1 id="textB">B</h1>
            </div>
            <div className="p-2  md:p-8 ">
                <div className=" text-background flex justify-between items-end ">
                        <div id="loading" className="text-4xl md:text-6xl uppercase font-bebas">loading</div>
                        <p id="loaderText" ref={counterRef} className=" text-6xl md:text-9xl font-bebas   leading-none">0</p>
                </div>
            </div>
        </div>
    )
}