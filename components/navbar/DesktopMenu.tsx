"use client"
import { IoIosMenu } from "react-icons/io";
import Button from "../ui/button";
import { usePathname } from "next/navigation"
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger)
export default function DesktopMenu({toggleMenu}:{toggleMenu: () => void}){
    const navRef = useRef<HTMLDivElement>(null)
    const pathname = usePathname()
    
    useEffect(()=>{
        const trigger = document.querySelector(".hero") || document.querySelector(".project-hero")
        
        if(!trigger) return
        if(!navRef.current) return
        
        gsap.set(navRef.current,{paddingTop:32,paddingBottom:32})

        ScrollTrigger.create({
            id:"desktopMenu",
            trigger:trigger,
            start:"top top",
            end:"+=1",
            scrub:true,
            onUpdate:(self) => {
                let progress = self.progress

                gsap.to(navRef.current,{
                    paddingTop:32 - progress * 24,
                    paddingBottom:32 - progress * 24,
                    duration:0.5,
                    ease:"power3.out"
                })
            }
        })

        return () => {
            ScrollTrigger.getById("desktopMenu")?.kill()
        }
    },[pathname])
    
    return (
        <div  className="  w-full  fixed top-0  backdrop-blur-xl  bg-background/10 border-b border-background/20 z-40 px-2 [@media(min-width:1180px)]:px-0  ">
            <div ref={navRef} className="  max-width mx-auto text-foreground flex justify-between items-center px-2 lg:px-0  " style={{paddingTop:"32px",paddingBottom:"32px"}}>
                <div >
                    <Link href={"/"}><h1 className=" uppercase font-semibold text-2xl font-switzer">yuv bhatt<span className=" inline-block  w-1 h-1 bg-foreground"></span></h1></Link>
                </div>
                <div className=" flex items-center gap-6">
                    <Button content="resume" href="/resume" variant="animate" />
                    <button onClick={toggleMenu} className=" relative group  hover:cursor-pointer    ">
                        <div className="absolute inset-0 bg-transparent rounded-full group-hover:bg-foreground transition-all duration-300 ease-in-out group-hover:scale-150"></div>
                        <IoIosMenu className="relative text-3xl  group-hover:text-background"  />
                    </button>
                </div>
            </div>
        </div>
    )
}