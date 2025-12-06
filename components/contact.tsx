"use client"

import Image from "next/image"
import Form from "./contact/form"
import { useGSAP } from "@gsap/react"
import gsap, { wrapYoyo } from "gsap"
import { useLayoutEffect } from "react"

export default function Contact(){
    useGSAP(()=>{
        gsap.from("#contact-circ1",{
            y:-100,
            duration:7,
            repeat:-1,
            yoyo:true,
            ease:"sine.inOut"
        })
        gsap.from("#contact-circ2",{
            y:100,
            duration:7,
            repeat:-1,
            yoyo:true,
            ease:"sine.inOut"
        })
    },[])
    return (
        <div id="contact" className=" relative overflow-hidden  ">
            <div id="contact-circ1" className=" hidden [@media(min-width:1540px)]:block absolute top-1/2 w-[300px] h-[300px] bg-foreground rounded-full left-[-10%]">
            <div className=" noise-circle absolute inset-0 rounded-full "></div></div>
            <div id="contact-circ2" className=" hidden lg:block absolute top-1/8 w-[150px] h-[150px] bg-foreground rounded-full right-[-5%]">
            <div className=" noise-circle absolute inset-0 rounded-full "></div></div>
            <div className=" max-width mx-auto ">
                <div >
                    <div className=" relative  mt-5 lg:mt-10 -z-10   ">
                        <div className=" hidden md:block absolute w-[50px] h-[50px] left-[24%] top-[-15%]">
                            <Image src={"/highlight.svg"} fill alt="highlight" />
                        </div>
                        <div className=" font-bebas text-foreground text-6xl md:text-7xl lg:text-9xl  w-full  relative flex justify-center  ">
                            <div className="  px-2 md:px-0   inline-block relative ">
                                <div className=" noise-text absolute inset-0 "></div>
                                <span  >get in touch ..</span>
                                
                            </div>
                            
                        </div>
                        <div className="  font-switzer  text-sm md:text-base  w-full">
                            <p className=" px-2 md:px-0 text-center">Contact me directly at <span className=" underline decoration-2">yuvbhatt@gmail.com</span> or through this form.</p>
                        </div>
                    </div>
                    <div className="  w-full">
                        <Form />
                    </div>
                </div>
            </div>
        </div>
    )
}