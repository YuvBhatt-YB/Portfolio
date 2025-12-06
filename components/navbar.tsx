"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Link from "next/link"
import Button from "./ui/button"
import { GiHamburgerMenu } from "react-icons/gi";
import MobileMenu from "./navbar/MobileMenu"
import DesktopMenu from "./navbar/DesktopMenu"
import MenuOverlay from "./navbar/MenuOverlay"
import useMenu from "@/hooks/useMenu"

export default function Navbar(){
    const {isOpen,toggleMenu} = useMenu()
    return (
        <>
        <MenuOverlay isOpen={isOpen} toggleMenu={toggleMenu} />
        <div className="block lg:hidden">
            <MobileMenu toggleMenu={toggleMenu} />
        </div>
        <div className="  hidden lg:block ">
            <DesktopMenu toggleMenu={toggleMenu} />
        </div>
        </>
    )
}