"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import { IoMdArrowForward } from "react-icons/io";

gsap.registerPlugin(SplitText)
export default function ProjectContent({roleDescription}: {roleDescription: string}){
    const roleRef = useRef<HTMLParagraphElement>(null)
    const roleTextRef = useRef<HTMLParagraphElement>(null)
    const btnWrapperRef = useRef<HTMLDivElement>(null)
    
    useLayoutEffect(()=>{
        gsap.to(".pCirc1",{
            x:-25,
            duration:5,
            repeat:-1,
            yoyo:true,
            ease:"sine.inOut"
        })
        gsap.to(".pCirc2",{
            x:-15,
            duration:6,
            repeat:-1,
            delay:0.5,
            yoyo:true,
            ease:"sine.inOut"
        })
    },[])
    useEffect(()=>{
        if(!btnWrapperRef.current) return
        const btns = btnWrapperRef.current.querySelectorAll(".btns")
        const listeners : Array<() => void> = []
        btns.forEach((btn) => {
            const btnTimeline = gsap.timeline({paused:true})
            const layer1 = btn.querySelector(".layer1")
            const layer2 = btn.querySelector(".layer2")
            const btnArr = btn.querySelector(".btnArr")
            btnTimeline.to(layer1,{
                yPercent:-100,
                duration:1,
                ease:"power3.out",
            }).to(layer2,{
                yPercent:-133,
                duration:1,
                ease:"power3.out",
            },"-=0.8").to(btnArr,{
                rotate:"-45deg",
                duration:0.5,
                ease:"power3.out"
            },"-=0.4")

            const handlePlay = () => btnTimeline.play()
            const handleLeave = () => btnTimeline.reverse()

            btn.addEventListener("mouseenter",handlePlay)
            btn.addEventListener("mouseleave",handleLeave)


            listeners.push(() => {
                btn.removeEventListener("mouseenter",handlePlay)
                btn.removeEventListener("mouseleave",handleLeave)
            })
        })

        return () => {
            listeners.forEach((cleanup) => cleanup())
        }
    },[])
    return (
        <div className="  max-width mx-auto mt-12 md:mt-24  px-2 [@media(min-width:1180px)]:px-0    ">
            <div className="  w-full flex flex-col sm:flex-row gap-10 sm:gap-0 justify-between">
                <div className=" relative">
                    <p ref={roleRef} className=" font-bebas text-5xl md:text-6xl lg:text-[64px] leading-none  relative text-foreground   ">my role
                        <span className=" absolute w-[130px] md:w-[175px] h-6 -bottom-5 left-0   "><Image src={"/role-underline.svg"} fill alt="underline" /></span>
                    </p>
                    <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 noise-overlay"
                    />
                </div>
                <div className="  w-full sm:w-1/2 font-switzer text-base sm:text-xl lg:text-2xl text-foreground">
                    <p ref={roleTextRef}  className=" whitespace-normal block ">{roleDescription}</p>
                </div>
            </div>
            <div  className="  grid sm:grid-cols-2 py-8 md:py-14 lg:py-20  ">
                <div className="  relative hidden sm:block ">
                    <div className=" w-[50px] h-[50px] md:w-[100px] md:h-[100px] rounded-full  bg-foreground absolute top-5 md:top-10 right-50 pCirc1 ">
                        <div className=" noise-circle absolute inset-0 rounded-full "></div>
                    </div>
                    <div className=" hidden md:block w-[50px] h-[50px] rounded-full  bg-foreground absolute -top-40 left-30 pCirc2 ">
                        <div className=" noise-circle absolute inset-0 rounded-full "></div>
                    </div>
                </div>
                <div className=" flex justify-end ">
                    <div ref={btnWrapperRef}  className="  flex gap-12 lg:gap-24 ">
                        <Link href={"/"}  className=" h-[100px] w-[100px]  md:h-[150px] md:w-[150px] lg:h-[180px] lg:w-[180px] inline-block rounded-full  bg-foreground btns relative overflow-hidden  ">
                            <div className=" w-full h-full flex items-center justify-center relative">
                                <div className=" noise-circle absolute inset-0 rounded-full "></div>
                                <div className=" flex items-center gap-1 text-base md:text-2xl text-background  relative ">
                                <p className=" relative z-10">Github</p>
                                <span  className=" relative z-10"><IoMdArrowForward className=" btnArr " /></span>
                                </div>
                            </div>
                            <div  className=" w-full h-full absolute bg-secondary rounded-full layer1  ">
                                <div className=" noise-circle absolute inset-0 rounded-full "></div>
                            </div>
                            <div  className=" w-full h-full absolute bg-[#2C3E50] rounded-full top-60 layer2 ">
                                <div className=" noise-circle absolute inset-0 rounded-full "></div>
                            </div>
                        </Link>
                        <Link href={"/"} className=" bg-foreground h-[100px] w-[100px]  md:h-[150px] md:w-[150px] lg:h-[180px] lg:w-[180px] inline-block rounded-full btns relative overflow-hidden ">
                            
                            <div className=" w-full h-full flex items-center justify-center relative">
                                <div className=" noise-circle absolute inset-0 rounded-full "></div>
                                <div className=" flex items-center gap-1 text-base md:text-2xl  text-background  relative ">
                                <p className=" relative z-10">Visit Site</p>
                                <span className=" z-10"><IoMdArrowForward className=" btnArr " /></span>
                                </div>
                            </div>
                            <div  className=" w-full h-full absolute bg-secondary rounded-full layer1  ">
                                <div className=" noise-circle absolute inset-0 rounded-full "></div>
                            </div>
                            <div  className=" w-full h-full absolute bg-[#2C3E50] rounded-full top-60 layer2 ">
                                <div className=" noise-circle absolute inset-0 rounded-full "></div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}