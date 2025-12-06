"use client"

import { projectLoaderStore} from "@/store/store"
import gsap from "gsap"
import { useRouter } from "next/navigation"


export default function TransitionLink({href,className,children}:{href:string,className:string,children:React.ReactNode}){
    const router = useRouter()
    
    const setIsLoaded = projectLoaderStore((state) => state.setIsLoaded)
    const handleClick = (e:React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        
        document.documentElement.classList.add("no-scroll")
        document.body.classList.add("no-scroll")
        setIsLoaded(false)
        gsap.set(".row1, .row2", {
        clearProps: "all"   // reset transform
        })
        gsap.set("#transition-overlay",{visibility:"visible"})
        
        gsap.set(".row1",{yPercent:-100,visibility:"visible"})
        gsap.set(".row2",{yPercent:100,visibility:"visible"})

        const tl = gsap.timeline()

        tl.to(".row1",{
            yPercent:0,
            duration:0.7,
            stagger:0.1,
            ease:"power3.out",
            force3D:true,
        })
        tl.to(".row2",{
            yPercent:0,
            duration:0.7,
            stagger:0.1,
            ease:"power3.out",
            force3D:true,
        },"-=0.5")

        tl.call(()=>{
            router.push(href)
        })
    }
    return (
        <a onClick={handleClick} className={className}>
            {children}
        </a>
    )
}