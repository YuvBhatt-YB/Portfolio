"use client"


import Navbar from "./navbar"

import { useEffect } from "react"
import Lenis from "lenis"
import Overlay from "./Overlay"
import NavOverlay from "./NavOverlay"



export default function ClientLayout({children}:Readonly<{children: React.ReactNode}>){
    
    useEffect(()=>{
        const lenis = new Lenis()
        function raf(time: any){
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
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