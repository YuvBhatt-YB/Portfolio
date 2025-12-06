
"use client"
import gsap from "gsap"
import { SplitText } from "gsap/all";
import Link from "next/link";
import { useEffect, useRef, useState } from "react"
import { MdArrowOutward } from "react-icons/md";
import { LiaWindowCloseSolid } from "react-icons/lia";

import { navTypeStore, preLoaderStore } from "@/store/store";

gsap.registerPlugin(SplitText)
export default function MenuOverlay({isOpen,toggleMenu}: {isOpen:boolean,toggleMenu: () => void}){
    const firstHalf = useRef<HTMLDivElement>(null)
    const secondHalf = useRef<HTMLDivElement>(null)
    const overlay = useRef<HTMLDivElement>(null)
    const tl = useRef<GSAPTimeline | null>(null)
    const pendingPath = useRef<string | null>(null)
    const setNavType = navTypeStore((state) => state.setNavType)
    const setPendingPath = navTypeStore((state) => state.setPendingPath)
    const navigateTo = (id: string): void => {
        const currentPath = window.location.pathname
        
        if(currentPath === "/") {
            pendingPath.current = `#${id}`
        }else{
            pendingPath.current = `/?section=${id}`
        }
        
        toggleMenu()
    }
    
    useEffect(()=>{
        if(!firstHalf || !secondHalf) return 
        tl.current = gsap.timeline({
            paused:true,
            onReverseComplete:() => {
                gsap.set(overlay.current,{visibility:"hidden"})
                document.body.style.overflow = "auto"
                if(pendingPath.current){
                    if(pendingPath.current.startsWith("#")){
                        const el = document.querySelector(pendingPath.current)
                        if(el){
                            el.scrollIntoView({
                                behavior:"smooth",
                                block:"center",
                                inline:"center"
                            })
                        }
                    }else{
                        setPendingPath(pendingPath.current)
                        setNavType("menu-in")
                
                    }
                pendingPath.current = null
                }
            }
        })
        tl.current.to([firstHalf.current,secondHalf.current],{
                    width:"50%",
                    duration:2,
                    ease:"power3.inOut"
        }).fromTo(".menuContent",{
            yPercent:100
        },{
            yPercent:0,
            duration:0.5,
            stagger:{
                amount:0.25,
                ease:"power3.inOut"
            }
            
        }).fromTo(".menuContentSecond",{
            yPercent:100
        },{
            yPercent:0,
            duration:0.7,
            stagger:{
                amount:0.4,
                ease:"power3.inOut"
            }
            
        },"-=0.4")
    },[])
    useEffect(()=>{
        if(!tl.current) return
        if(isOpen){
            gsap.set(overlay.current,{visibility:"visible"})
            document.body.style.overflow = "hidden"
            tl.current.play()
        }else{
            tl.current.reverse()
        }
    },[isOpen])
    useEffect(()=>{
        if(!isOpen) return 
        const menuContainers = document.querySelectorAll(".menuContainer")
        const splitInstances: any[] = []
        const timelines: GSAPTimeline[] = []
        const playHandlers: (()=>void)[] = []
        const leaveHandlers: (()=>void)[] = []
        menuContainers.forEach((container) => {
            const topMenuTxt = container.querySelector(".topMenuTxt")
            const bottomMenuTxt = container.querySelector(".bottomMenuTxt")
            const arr = container.querySelector(".arr")

            const topMenuChars = new SplitText(topMenuTxt,{type:"chars"})
            const bottomMenuChars = new SplitText(bottomMenuTxt,{type:"chars"})

            gsap.set(arr,{rotate:0})

            splitInstances.push(topMenuChars,bottomMenuChars)

            const timeline = gsap.timeline({paused:true})

            timeline.to(topMenuChars.chars,{
                yPercent:-100,
                duration:0.3,
                stagger:{
                    amount:0.1,
                    ease:"power1.inOut"
                }
            }).to(bottomMenuChars.chars,{
                yPercent:-100,
                duration:0.3,
                stagger:{
                    amount:0.1,
                    ease:"power1.inOut"
                }
            },"-=0.2").to(arr,{
                rotate:"90deg",
                duration:0.5,
                ease:"power3.out"
            },"-=0.2")
            
            timelines.push(timeline)

            const handlePlay = () => timeline.play()
            const handleLeave = () => timeline.reverse()
            
            playHandlers.push(handlePlay)
            leaveHandlers.push(handleLeave)

            container.addEventListener("mouseenter",handlePlay)
            container.addEventListener("mouseleave",handleLeave)
        })

        return () => {
            splitInstances.forEach(inst => inst.revert())
            timelines.forEach(tl => tl.kill())
            menuContainers.forEach((container,i) => {
                container.removeEventListener("mouseenter",playHandlers[i])
                container.removeEventListener("mouseleave",leaveHandlers[i])
            })
        }
    },[isOpen])
    return (
        <div ref={overlay} className={` fixed  z-42 w-dvw h-dvh overflow-hidden invisible  ${isOpen ? "pointer-events-auto" : "pointer-events-none"} `}>
            <div className=" relative w-full h-full">
                <div ref={firstHalf} className=" absolute top-0 left-0 h-full w-0 bg-foreground">
                    <div className=" absolute inset-0 noise-menu"></div>
                </div>
                <div ref={secondHalf} className=" absolute top-0 right-0 h-full w-0 bg-foreground">
                    <div className=" absolute inset-0 noise-menu"></div>
                </div>
                <div  className="  absolute w-full h-full p-4 md:p-8 lg:p-12 ">
                    
                        <div className="  w-full h-full flex flex-col justify-between ">
                            <div className="  w-full  py-1 flex justify-end">
                                <div className=" leading-none overflow-hidden ">
                                    <button  className=" text-white text-3xl md:text-5xl menuContent hover:cursor-pointer " onClick={toggleMenu}><LiaWindowCloseSolid /></button>
                                </div>
                            </div>
                            <div className="  w-full  flex flex-col lg:flex-row gap-4 lg:gap-8 flex-1 pt-12">
                                <div className=" uppercase font-switzer text-background ">
                                    <div className=" overflow-hidden ">
                                        <p className="menuContent text-sm md:text-base">[ discover ]</p>
                                    </div>
                                </div>
                                <div  className=" flex-1  ">
                                    <div  className=" w-full  flex flex-col gap-3 group  transition-opacity  duration-300 ease-in-out">
                                        <div className="  overflow-hidden ">
                                            <div className="  flex text-background text-5xl md:text-8xl lg:text-9xl menuContainer transition-opacity duration-300 ease-in-out group-hover:opacity-40 opacity-100 hover:opacity-100 menuContentSecond ">
                                                <button onClick={() => navigateTo("home")} className=" flex-1 text-start cursor-pointer font-bebas  inline-block  overflow-hidden relative">
                                                    <span className=" topMenuTxt">home</span>
                                                    <span className=" block absolute bottomMenuTxt">home</span>
                                                </button>
                                                <div>
                                                    <MdArrowOutward className=" arr " />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="  overflow-hidden">
                                            <div className="  flex text-background text-5xl md:text-8xl  lg:text-9xl menuContainer transition-opacity duration-300 ease-in-out group-hover:opacity-40 opacity-100 hover:opacity-100  menuContentSecond ">
                                                <button onClick={() => navigateTo("about")} className=" flex-1 text-start cursor-pointer font-bebas  inline-block   overflow-hidden relative">
                                                    <span className=" topMenuTxt">about</span>
                                                    <span className=" block absolute bottomMenuTxt">about</span>
                                                </button>
                                                <div>
                                                    <MdArrowOutward className=" arr " />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="  overflow-hidden">
                                            <div className="  flex text-background text-5xl md:text-8xl  lg:text-9xl menuContainer transition-opacity duration-300 ease-in-out group-hover:opacity-40 opacity-100 hover:opacity-100  menuContentSecond ">
                                                <button onClick={() => navigateTo("projects")} className=" flex-1 text-start cursor-pointer font-bebas  inline-block   overflow-hidden relative">
                                                    <span className=" topMenuTxt">projects</span>
                                                    <span className=" block absolute bottomMenuTxt">projects</span>
                                                </button>
                                                <div>
                                                    <MdArrowOutward className=" arr " />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="  overflow-hidden">
                                            <div className="  flex text-background text-5xl md:text-8xl  lg:text-9xl menuContainer transition-opacity duration-300 ease-in-out group-hover:opacity-40 opacity-100 hover:opacity-100  menuContentSecond ">
                                                <button onClick={() => navigateTo("contact")} className=" flex-1 text-start cursor-pointer font-bebas  inline-block   overflow-hidden relative">
                                                    <span className=" topMenuTxt">contact</span>
                                                    <span className=" block absolute bottomMenuTxt">contact</span>
                                                </button>
                                                <div>
                                                    <MdArrowOutward className=" arr " />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" w-full flex flex-col md:flex-row gap-2 lg:gap-8 ">
                                <div className=" uppercase font-switzer text-background  pr-3">
                                    <div className=" overflow-hidden">
                                        <p className=" menuContent">[ socials ]</p>
                                    </div>
                                </div>
                                <div  className=" flex font-switzer gap-4 text-base  flex-1 md:justify-end md:text-xl ">
                                    <div className=" overflow-hidden">
                                        <div className=" menuContentSecond">
                                            <Link href={""} className=" cursor-pointer   group " >
                                            <span className=" text-background ">Linkedln</span>
                                            <div className=" h-1 w-0  bg-background transition-all duration-300 group-hover:w-full"></div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="  overflow-hidden">
                                        <div className=" menuContentSecond">
                                            <Link href={""} className=" cursor-pointer   group " >
                                            <span className=" text-background ">Github</span>
                                            <div className=" h-1 w-0  bg-background transition-all duration-300 group-hover:w-full"></div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="  overflow-hidden">
                                        <div className=" menuContentSecond">
                                            <Link href={""} className=" cursor-pointer   group " >
                                            <span className=" text-background ">Instagram</span>
                                            <div className=" h-1 w-0  bg-background transition-all duration-300 group-hover:w-full"></div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className=" overflow-hidden">
                                        <div className=" menuContentSecond">
                                            <Link href={""} className=" cursor-pointer   group " >
                                            <span className=" text-background ">X</span>
                                            <div className=" h-1 w-0  bg-background transition-all duration-300 group-hover:w-full"></div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}