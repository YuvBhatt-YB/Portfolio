"use client"
import Link from "next/link";
import TransitionLink from "../TransitionLink";
type ProjectData = {
    pId: number,
    project_name: string,
    project_img:string,
    project_main_img:string,
    slider_imgs: string[],
    stack: string[],
    role_description: string
}
export default function ProjectFooter({remainingProjects}: {remainingProjects: ProjectData[]}){
    return(
        <div className=" max-width  mx-auto px-2 [@media(min-width:1180px)]:px-0 ">
            <div className=" w-full h-20 sm:h-30 flex items-center justify-center ">
                <div className="  font-bebas text-xl sm:text-2xl flex items-center justify-center  gap-4 sm:gap-8  group transition-opacity duration-300 ease-in-out  ">
                    {remainingProjects.map((project,i) => (
                        <TransitionLink key={i} href={`${project.pId}`} className=" opacity-100 transition-all duration-300 ease-in-out group-hover:opacity-40 hover:opacity-100 hover:text-3xl hover:cursor-pointer ">{project.project_name}</TransitionLink>
                    ))}
                </div>
            </div>
        </div>
    )
}