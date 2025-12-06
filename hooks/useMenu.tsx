
import { useState } from "react";

export default function useMenu(){

    const [isOpen,setIsOpen] = useState(false)
    
    const toggleMenu = () => setIsOpen(!isOpen)
    const closeMenu = () => setIsOpen(false)

    return {
        isOpen,
        toggleMenu,
        closeMenu
    }
}