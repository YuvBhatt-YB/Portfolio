"use client"
import Link from "next/link";

export default function Footer(){
    return (
        <div className=" w-full  bg-foreground relative">
            <div className=" noise-square absolute inset-0"></div>
            <div className=" max-width mx-auto ">
                <div className="  flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between py-5 md:py-10  px-4  [@media(min-width:1180px)]:px-0">
                    <div>
                        <p className=" font-switzer font-semibold text-background">© 2025  Yuv Bhatt. All rights reserved.</p>
                    </div>
                    <div className=" font-switzer font-semibold flex gap-8 text-background relative">
                        <Link href={""} className=" cursor-pointer  group" >
                        <span>Linkeden</span>
                        <div className=" h-1 w-0  bg-background transition-all duration-300 group-hover:w-full"></div>
                        </Link>
                        <Link href={""} className=" cursor-pointer  group" >
                        <span>Github</span>
                        <div className=" h-1 w-0  bg-background transition-all duration-300 group-hover:w-full"></div>
                        </Link>
                        <Link href={""} className=" cursor-pointer  group" >
                        <span>Instagram</span>
                        <div className=" h-1 w-0  bg-background transition-all duration-300 group-hover:w-full"></div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}