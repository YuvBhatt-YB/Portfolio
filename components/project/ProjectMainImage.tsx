"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger)
export default function ProjectMainImage({mainImage}:{mainImage: string}){
    useGSAP((context)=>{
        const isMobile = window.innerWidth < 768
        gsap.to(".projectParallaxImage",{
            yPercent:isMobile ? 10 : 30,
            ease:"sine.inOut",
            scrollTrigger:{
                trigger:".projectParallaxContainer",
                start:"top 40%",
                end:"bottom top",
                scrub:true
            }
        })
    })
    return (
        <div className="  h-[60vh] lg:min-h-dvh relative projectParallaxContainer overflow-hidden ">
            <Image src={`${mainImage}`} alt="demo" fill className=" object-cover object-center  projectParallaxImage" />
        </div>
    )
}