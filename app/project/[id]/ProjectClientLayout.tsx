"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function ProjectClientLayout({children}:{children: React.ReactNode}){
    return (
        <div className=" overflow-x-hidden">
            {children}
        </div>
    )
}