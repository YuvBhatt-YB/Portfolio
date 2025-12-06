"use client"
import { GiHamburgerMenu } from "react-icons/gi";
import Button from "../ui/button";
import { IoIosMenu } from "react-icons/io";
import Link from "next/link";

export default function MobileMenu({toggleMenu}:{toggleMenu: () => void}){
    return (
        <div className="  w-full  fixed top-0 backdrop-blur-xl  bg-background/10 border-b border-background/20 z-40 ">
            <div className=" max-width mx-auto text-foreground flex justify-between items-center py-4 md:py-6 px-2   ">
                <div >
                    <Link href={"/"}><h1 className=" uppercase font-semibold md:text-2xl font-switzer">yuv bhatt<span className=" inline-block w-0.5 h-0.5 md:w-1 md:h-1 bg-foreground"></span></h1></Link>
                </div>
                <div className=" flex items-center gap-3 md:gap-6">
                    <Button content="resume" href="/resume" variant="animate" />
                    <button onClick={toggleMenu} className=" relative  ">
                        <IoIosMenu className=" text-3xl"  />
                    </button>
                </div>
            </div>
        </div>
    )
}