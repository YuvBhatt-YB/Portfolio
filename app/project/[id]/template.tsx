"use client"

import { projectLoaderStore } from "@/store/store"
import gsap from "gsap"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

export default function Template({children}:{children: React.ReactNode}){
    const pathname = usePathname()
    const setIsLoaded = projectLoaderStore(state => state.setIsLoaded)
    
    useEffect(()=> {
        if(!pathname.startsWith("/project")){
            gsap.set("#transition-overlay",{visibility:"hidden"})
            return
        }
        
        
        gsap.set("#transition-overlay",{visibility:"visible"})
        
        document.documentElement.classList.add("no-scroll")
        document.body.classList.add("no-scroll")
        window.scrollTo(0, 0)
        const tl = gsap.timeline()

        tl.to(".row1",{
            yPercent:-100,
            duration:0.7,
            stagger:0.1,
            ease:"power4.out",
            force3D:true,
            onComplete: () => {
                gsap.set(".row1",{visibility:"hidden"})
            }
        })
        tl.to(".row2",{
            yPercent:100,
            duration:0.7,
            stagger:0.1,
            ease:"power4.out",
            force3D:true,
            onComplete:() => {
                gsap.set(".row1",{clearProps:"transform"})
                gsap.set(".row2",{clearProps:"transform"})
                gsap.set("#transition-overlay",{visibility:"hidden"})
                gsap.set(".row2",{visibility:"hidden"})
            }
        },"-=0.5").add(()=> setIsLoaded(true))
    },[pathname])
    return (
        <>
        {children}
        </>
       
    )
}