"use client"


import Navbar from "./navbar"

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import Overlay from "./Overlay"
import NavOverlay from "./NavOverlay"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"


gsap.registerPlugin(ScrollTrigger)
export default function ClientLayout({children}:Readonly<{children: React.ReactNode}>){
    const lenisRef = useRef<Lenis | null>(null)
    const tickerCallback = useRef<((time:number) => void)| null>(null)
    
    useEffect(()=>{
        const lenis = new Lenis()
        lenisRef.current = lenis
        lenis.on("scroll",ScrollTrigger.update)
        
        tickerCallback.current = (time:number) => {
            lenis.raf(time*1000)
        }
        gsap.ticker.add(tickerCallback.current)

        gsap.ticker.lagSmoothing(0)

        return () => {
            if(tickerCallback.current) gsap.ticker.remove(tickerCallback.current)
            lenis.destroy()
        }
    },[])
    return (
        <>
        
        <Navbar />
        <Overlay />
        <NavOverlay />
        {children}
        </>
    )
}