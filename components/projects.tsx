"use client"

import Image from "next/image"
import ProjectComponent from "./projects/ProjectComponent"


export default function Projects(){
    

    return (
        <div id="projects" className=" w-full   mt-4 sm:mt-0 py-12 ">
            <div className=" max-width mx-auto h-full px-2 [@media(min-width:1180px)]:px-0 ">
                <div >
                    <p className=" relative font-bebas text-5xl md:text-7xl lg:text-8xl inline-block ">recent projects
                        <span className=" hidden md:block absolute w-[238px] h-[93px] left-[-3%]  top-1/2 ">
                            <Image fill alt="underline" src={"/underline.svg"} />
                        </span>
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 noise-overlay"
                        />
                    </p>
                </div>
                <div>
                    <ProjectComponent />
                </div>
            </div>
        </div>
    )
}