"use client"
import { preLoaderStore } from "@/store/store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Image from "next/image";
gsap.registerPlugin(SplitText)
export default function About(){
    
    useGSAP(()=>{
        (async() => {
        await document.fonts.ready
        await new Promise(res => requestAnimationFrame(res))
        const texts = gsap.utils.toArray(".texts") as HTMLElement[]
        const texts2 = gsap.utils.toArray(".texts2") as HTMLElement[]
        const mainAboutTl = gsap.timeline({
            scrollTrigger:{
                trigger:".aboutSection",
                start:"top 80%",
                end:"top 20%",
                scrub:true,
                toggleActions:"play play reverse reverse",
            }
        })
        const secondAboutTl = gsap.timeline({
            scrollTrigger:{
                trigger:".aboutSection2",
                start:"top 80%",
                end:"top 20%",
                scrub:true,
                toggleActions:"play play reverse reverse",
            }
        })
        texts.forEach(text => {
            const splitAboutText = SplitText.create(text,{type:"chars",tag:"span",position:"static"})
            
            const textTl = gsap.timeline()

            textTl.from(splitAboutText.chars,{
                color:"#8e8c8b",
                duration:0.3,
                stagger:0.02
            })

            mainAboutTl.add(textTl)
        })
        texts2.forEach(text => {
            const splitAboutText2 = SplitText.create(text,{type:"chars",tag:"span",position:"static"})
            const textTl2 = gsap.timeline()
            textTl2.from(splitAboutText2.chars,{
                color:"#8e8c8b",
                duration:0.3,
                stagger:0.02
            })
            secondAboutTl.add(textTl2)
        })
        gsap.to("#circ1",{
            scale:1,
            duration:0.8,
            ease:"sine.in",
            scrollTrigger:{
                trigger:".circTrigger",
                start:"top 80%",
                end:"bottom 20%",
                invalidateOnRefresh:true
            }
        })
        gsap.to("#circ2",{
            scale:1,
            duration:0.8,
            ease:"sine.in",
            scrollTrigger:{
                trigger:".circ2Trigger",
                start:"top 80%",
                end:"bottom 20%",
                invalidateOnRefresh:true
            }
        })
        gsap.to(".parallax-image",{
            yPercent:-20,
            ease:"sine.inOut",
            scrollTrigger:{
                trigger:".parallax-container",
                start:"top bottom",
                end:"bottom top",
                scrub:true
            }
        })
        })()
        
        
    },[])
    return(
        <div className=" px-2  [@media(min-width:1180px)]:px-0 aboutSection   ">
            <div className="  grid sm:grid-cols-2 items-start  gap-4  ">
                <div className=" flex flex-row lg:flex-col justify-between " >
                    <div className="  uppercase font-bebas text-[clamp(1.7rem,3.5vw,3rem)]   space-y-1 md:space-y-2 flex flex-col items-start justify-start  w-ful leading-tight ">
                        <div className=" texts inline! whitespace-normal!">I’m Yuv Bhatt, a full stack developer and designer who enjoys making the web look good and work even better.</div>
                        <div className=" texts inline! whitespace-normal! mt-4">
                            I craft clean,purposeful digital experiences  using React, Next.js, TypeScript, and a touch of GSAP to make interfaces feel alive.
                        </div>
                    </div>
                    <div className=" lg:flex  justify-end circTrigger ">
                        <div id="circ1" className="hidden relative lg:block md:w-[100px] md:h-[100px] lg:w-[197px] lg:h-[197px] bg-foreground rounded-full mt-[clamp(20px,5vw,128px)] lg:mr-12 scale-0">
                            <div className=" noise-circle absolute inset-0 rounded-full "></div>
                        </div>
                    </div>
                </div>
                <div className=" mt-4 sm:mt-0 flex justify-end ">
                    
                    <div className=" relative w-full sm:w-[420px] md:w-[612px] lg:w-[612px] aspect-3/4 rounded-[20px]  overflow-hidden parallax-container ">
                        <div className=" parallax-image w-full h-full relative">
                            <Image 
                                src={"/about.jpg"}
                                fill
                                alt="profile image"
                                className=" object-cover rounded-[20px]"
                                sizes="100vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className=" aboutSection2">
                <div  className="  uppercase font-bebas text-[clamp(1.6rem,2.3vw,2.5rem)]  py-10 lg:py-32 lg:flex lg:items-center lg:justify-between lg:gap-10">
                    <div   >
                        <div className="texts2 inline! whitespace-normal!">On the backend, I build scalable systems with Node.js, Express, Python, and Flask, backed by PostgreSQL and Redis all neatly containerized with Docker. I love turning ideas into fast, reliable, and user focused  products that blend design and engineering seamlessly.</div> 
                    </div>
                    <div className=" hidden lg:flex  flex-1 items-center justify-center circ2Trigger ">
                        <div id="circ2" className=" relative w-[120px] h-[120px] bg-foreground rounded-full scale-0">
                            <div className=" noise-circle absolute inset-0 rounded-full "></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}