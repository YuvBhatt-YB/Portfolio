"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Link from "next/link"
import { useEffect, useRef } from "react"

export default function Button(
    {
        content,
        href,
        variant
    }:
    {
        content: string,
        href:string,
        variant?: string
    }){
    const btnRef = useRef<HTMLAnchorElement>(null)
    const topRef = useRef<HTMLSpanElement>(null)
    const btmRef = useRef<HTMLSpanElement>(null)
    useEffect(()=>{
        if(!variant || variant !== "animate") return
        const timeline = gsap.timeline({paused:true})
        timeline.to(topRef.current,{
            yPercent:-100,
            duration:0.3,
            ease:"power1.inOut"
        }).to(btmRef.current,{
            yPercent:-100,
            duration:0.3,
            ease:"power1.inOut"
        })
        const handleEnter = ()=> timeline.play()
        const handleLeave = ()=> timeline.reverse()
        btnRef?.current?.addEventListener("mouseenter",handleEnter)
        btnRef?.current?.addEventListener("mouseleave",handleLeave)
        return () => {
            btnRef?.current?.removeEventListener("mouseenter",handleEnter)
            btnRef?.current?.removeEventListener("mouseleave",handleLeave)
        }
    },[])
    const classValue = variant === "animate" ? "transition-colors duration-200 ease-in-out text-foreground border-foreground hover:bg-foreground hover:text-background hover:border-none " : " text-background bg-foreground border-none"
    return (
        <Link href={href} ref={btnRef} id="btn" className={`uppercase border font-switzer h-8 px-2 md:px-2   rounded-sm  relative  overflow-hidden ${classValue} `} >
            <span  ref={topRef} className="text-sm md:text-base  h-full flex items-center justify-center ">{content}</span>
            <span  ref={btmRef} className="text-sm md:text-base  absolute h-full top-full flex items-center justify-center ">{content}</span>
        </Link>
    )
}