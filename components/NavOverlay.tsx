"use client"


import { navTypeStore } from "@/store/store"
import gsap from "gsap"
import { useRouter } from "next/navigation"

import { useCallback, useEffect, useRef } from "react"


export default function NavOverlay(){
    const navOverlayRef = useRef<HTMLDivElement>(null)
    const navType = navTypeStore((state) => state.navType)
    const setNavType = navTypeStore((state) => state.setNavType)
    const pendingPath = navTypeStore((state) => state.pendingPath)
    const setPendingPath = navTypeStore((state) => state.setPendingPath)
    
    const router = useRouter()
    useEffect(()=>{
        if(navType === "menu-in"){
            gsap.set(navOverlayRef.current,{visibility:"visible"})
            document.documentElement.classList.add("no-scroll")
            document.body.classList.add("no-scroll")
            gsap.set("#l1",{yPercent:100})
            gsap.set("#l2",{yPercent:100})
            const tl = gsap.timeline({
                ease:"expo.in",
                onComplete: () => {
                    if(pendingPath){
                        router.push(pendingPath)
                        setPendingPath(null)
                    }
                    setNavType("menu-out")
                }
            })
            tl.to("#l2",{
                yPercent:0,
                duration:0.8,
                force3D:"true",
                
            })
            tl.to("#l1",{
                yPercent:0,
                duration:0.8,
                force3D:"true",
                
            },"-=0.3")

        }
        if(navType === "menu-out") {
            const tl = gsap.timeline({
            ease:"expo.out",
            onComplete:() => { 
                gsap.set(navOverlayRef.current,{visibility:"hidden",pointerEvents:"none"})
                document.documentElement.classList.remove("no-scroll")
                document.body.classList.remove("no-scroll")
                gsap.set("#l1",{yPercent:100})
                gsap.set("#l2",{yPercent:100})
                setNavType("none")
            }
            })
            tl.to("#l1",{
                yPercent:-100,
                duration:0.8,
                force3D:"true",
                
            })
            tl.to("#l2",{
                yPercent:-100,
                duration:0.8,
                force3D:"true",
                
            },"-=0.3")
        }
    },[navType])
    return (
        <div ref={navOverlayRef} className=" fixed inset-0  z-9998 overflow-hidden  " style={{visibility:"hidden"}}>
            <div className=" relative w-full h-full">
                <div id="l1" className=" bg-foreground absolute inset-0 will-change-transform z-10">
                    <div className=" absolute inset-0 noise-menu"></div>
                </div>
                <div id="l2" className=" bg-secondary inset-0 absolute will-change-transform z-9 ">
                    <div className=" absolute inset-0 noise-menu"></div>
                </div>
            </div>
        </div>
    )
}