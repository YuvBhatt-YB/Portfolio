"use client"
import gsap from "gsap"
import { useEffect, useRef } from "react"

export default function Form(){
    const sendBtn = useRef<HTMLButtonElement>(null)
    const topTxt = useRef<HTMLSpanElement>(null)
    const btmTxt = useRef<HTMLSpanElement>(null)

    useEffect(()=>{
        const timeline = gsap.timeline({paused:true})
        timeline.to(topTxt.current,{
            yPercent:-100,
            duration:0.3,
            ease:"power1.inOut"
        })
        timeline.to("#bgDiv",{
            height:"100%",
            duration:0.4,
            ease:"sine.inOut"
        },"-=0.2")
        timeline.to(btmTxt.current,{
            yPercent:-100,
            duration:0.3,
            ease:"power1.inOut"
        },"-=0.1")
        const handlePlay = () => timeline.play()
        const handleLeave = () => timeline.reverse()

        sendBtn?.current?.addEventListener("mouseenter",handlePlay)
        sendBtn?.current?.addEventListener("mouseleave",handleLeave)

        return () => {
            sendBtn?.current?.removeEventListener("mouseenter",handlePlay)
            sendBtn?.current?.removeEventListener("mouseleave",handleLeave)
        }
        
    },[])
    return (
        <div className="  md:mx-10 lg:mx-20 py-10 flex flex-col gap-5 px-2  relative">
            <div className=" font-switzer flex flex-col gap-2">
                <p className=" text-foreground">Name</p>
                <input type="text" placeholder="Yuv Bhatt" className=" border-2 border-[#666362] w-full rounded-md py-2 md:py-3 px-2 focus:outline-none" />
            </div>
            <div className=" font-switzer flex flex-col gap-2">
                <p className=" text-foreground">Email</p>
                <input type="email" placeholder="yuv@gmail.com" className=" border-2 border-[#666362] w-full rounded-md py-2 md:py-3 px-2 focus:outline-none" />
            </div>
            <div className=" font-switzer flex flex-col gap-2">
                <p className=" text-foreground">Message</p>
                <textarea rows={10} className="border-2 border-[#666362] w-full rounded-md py-2 md:py-3 px-2 focus:outline-none resize-none" placeholder="Hello! What's up?"></textarea>
            </div>
            <div className="  flex justify-end">
                <button ref={sendBtn} className=" relative font-bebas bg-foreground  text-xl md:text-3xl  h-10 md:h-14 px-6 md:px-12 rounded-sm overflow-hidden cursor-pointer">
                    <div className=" noise-square absolute inset-0"></div>
                    <span ref={topTxt} className=" relative   h-full text-background flex items-center z-40">send it</span>
                    <span ref={btmTxt} className=" relative  h-full text-foreground flex items-center z-40">send it</span>
                    <div id="bgDiv" className=" w-full bg-secondary absolute bottom-0 left-0 rounded-sm">
                        <div className=" noise-square absolute inset-0"></div>
                    </div>
                </button>
            </div>
        </div>
    )
}