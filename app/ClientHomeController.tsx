"use client"
import Image from "next/image";
import PreLoader from "@/components/preLoader";
import { navTypeStore, preLoaderStore } from "@/store/store";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
export default function ClientHomeController() {
    const {isLoaded,setIsLoaded} = preLoaderStore()
    const navType = navTypeStore((state) => state.navType)
    const params = useSearchParams()
    const section = params.get("section")
    useEffect(() => {
        if(navType === "initial"){
            setIsLoaded(false)
        }else{
            setIsLoaded(true)
        }
    },[])
    useEffect(() => {
        if(navType !== "none") return
        if(!section) return
        const el = document.querySelector(`#${section}`)
        if(!el) return
        el.scrollIntoView({
            behavior:"smooth",
            block:"center",
            inline:"center"
        })
        setTimeout(()=>{
            window.history.replaceState(null,"","/")
        },500)
    },[navType])

    return (
        <>
            {navType === "initial" && <PreLoader onComplete={()=>setIsLoaded(true)} />}
        </>
    )
}