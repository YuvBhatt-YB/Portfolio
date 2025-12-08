"use client"

import { projects } from "@/app/data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import TransitionLink from "../TransitionLink";

gsap.registerPlugin(SplitText)
export default function ProjectComponent(){
    const imageContainer = useRef<HTMLDivElement>(null)
    const targetY = useRef<number>(0)
    const mouseX  = useRef<number>(0)
    const mouseY = useRef<number>(0)
    const followerX = useRef<number>(0)
    const followerY = useRef<number>(0)
    const [index,setIndex] = useState<number>(0)
    const zCounter = useRef<number>(0)
    const [images,setImages] = useState<HTMLElement[]>([])
    const mouse = useRef<HTMLDivElement>(null)
    const rootRef = useRef<HTMLDivElement>(null)
    const running = useRef<boolean>(false)
    
    const followImage = () => {
        if(window.innerWidth < 1024) return
        if(!imageContainer.current) return
        const current = gsap.getProperty(imageContainer.current,"y") as number
        const next = current + (targetY.current - current) * 0.1
        gsap.set(imageContainer.current,{y: next})
    }
    const followMouse = () => {
        if(window.innerWidth < 1024) return
        if(!mouse.current) return
        followerX.current += (mouseX.current - followerX.current) * 0.12
        followerY.current += (mouseY.current - followerY.current) * 0.12
        gsap.set(mouse.current,{
            x:followerX.current + 45,
            y:followerY.current + 10,
            force3D:true
        })
    }
    const startTicker = () => {
        if(running.current) return
        running.current = true
        gsap.ticker.add(followImage)
        gsap.ticker.add(followMouse)

    }

    const stopTicker = () => {
        if(!running.current) return
        running.current = false
        gsap.ticker.remove(followImage)
        gsap.ticker.remove(followMouse)
    }
    
    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if(!rootRef.current) return
        const rect = e.currentTarget.getBoundingClientRect()
        let offsetY = (e.clientY - rect.top) - 200
        targetY.current = offsetY
        mouseX.current = e.clientX - rect.left - 25
        mouseY.current = e.clientY - rect.top - 25
        
    }
    const handleEnter = () => {
        if(!imageContainer.current || !mouse.current) return

        startTicker()
        
        gsap.set(imageContainer.current,{visibility:"visible"})
        gsap.to(mouse.current,{
            scale:1,
            duration:0.3,
            ease:"power3.out"
        })
        gsap.to(imageContainer.current,{
            height:"500px",
            duration:1,
            ease:"circ.out"
        })
    }
    const handleLeave = () => {
        if(!imageContainer.current || !mouse.current) return
        
        stopTicker()

        gsap.to(mouse.current,{
            scale:0,
            duration:0.25,
            ease:"power3.out"
        })
        gsap.to(imageContainer.current,{
            height:0,
            duration:1,
            ease:"circ.out"
        })
    }
    useLayoutEffect(()=>{
        if(!rootRef.current) return

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add("(min-width: 1024px)",()=> {
            const images = gsap.utils.toArray(".images") as HTMLElement[]
            setImages(images)

            gsap.set(images,{
                y:"100%",
                zIndex:0
            })
            })
        
            return () => mm.revert()
        },rootRef)
        return () => ctx.revert()
    },[])
    useEffect(()=>{
        if(images.length === 0) return
        const incoming = images[index]
        if(!incoming) return
        gsap.set(incoming,{
            zIndex:zCounter.current++,
            y:"100%"
        })

        gsap.to(incoming,{
            y:"0%",
            duration:1,
            ease:"power2.out"
        })
    },[index,images])
    useLayoutEffect(()=>{
        if(!rootRef.current) return
        const ctx = gsap.context(() => {
          const mm = gsap.matchMedia()
          mm.add("(min-width:1360px)", () => {
            const containers = gsap.utils.toArray(".container") as HTMLElement[];
            if (containers.length === 0) return;
            containers.forEach((container, i) => {
              const topTxt = container.querySelector(".topTxt");
              const bottomTxt = container.querySelector(".bottomTxt");
              const techStack =
                container.parentElement?.querySelector(".tech-stack");

              
              if (!bottomTxt || !topTxt || !techStack) return;

              let topChars:any = null
              let bottomChars:any = null
              
              const timeline = gsap.timeline({ paused: true });

              const initSplitTextandTimeline = async() => {
                await document.fonts.ready

                if(!topChars){
                    topChars = SplitText.create(topTxt,{type:"chars"})
                    bottomChars = SplitText.create(bottomTxt,{type:"chars"})
                    const rect = topTxt.getBoundingClientRect();
                    const techRect = techStack.getBoundingClientRect();

                    const targetX = rect.left - techRect.left + rect.width + 30;
                    timeline.to(topChars.chars, {
                        yPercent: -100,
                        duration: 0.3,
                        stagger: {
                            amount: 0.1,
                            ease: "power1.inOut",
                        },
                    }).to(bottomChars.chars,{
                        yPercent: -100,
                        duration: 0.3,
                        stagger: {
                            amount: 0.1,
                            ease: "power1.inOut",
                        },
                    },"-=0.2").to(
                  techStack,
                  {
                    x: targetX,
                    justifyContent: "start",
                    duration: 0.5,
                    ease: "power3.out",
                  },
                  "-=0.2"
                );
                }
              }
              const handlePlay = async() => {
                await initSplitTextandTimeline()
                setIndex(i);
                requestAnimationFrame(() => timeline.play());
              };
              const handleRemove = () => {
                timeline.reverse();
              };

              container.addEventListener("mouseenter", handlePlay);
              container.addEventListener("mouseleave", handleRemove);

              return () => {
                container.removeEventListener("mouseenter", handlePlay);
                container.removeEventListener("mouseleave", handleRemove);
              };
            });
          });

          return () => mm.revert();
        },rootRef);
        
        return () => ctx.revert()
        
    },[])
    
    return (
        <div className="  w-full  mt-12 relative" ref={rootRef}>
            
            <div  className=" relative flex flex-col  group transition-opacity duration-300 ease-in-out    " onMouseMove={(e) => handleMove(e)} onMouseEnter={handleEnter} onMouseLeave={handleLeave}  >
                <div ref={imageContainer} className=" w-[clamp(300px,40vw,500px)]  h-0 overflow-hidden absolute right-0 [@media(min-width:1540px)]:-right-[10%]  origin-top rounded-3xl invisible hidden lg:block z-39 will-change-transform">
                    <div className=" w-full h-full  relative rounded-3xl ">
                        {projects.map((project,i) => (
                            <div key={i} className=" w-full h-full   absolute top-0 images rounded-3xl will-change-transform  backface-hidden ">
                                <Image fill src={project.project_img}  alt="project image" className=" object-cover rounded-3xl" priority={i === 0} loading={i === 0 ? "eager" : "lazy"} />
                            </div>
                        ))}
                        
                
                    </div>
                </div>
                {projects.map((project,i) => (
                    <div key={i} className="   flex py-4  relative opacity-100 transition-opacity  duration-300 ease-in-out group-hover:opacity-40 hover:opacity-100 will-change-transform  ">
                        <TransitionLink  href={`project/${(i+1)}`} className="  relative w-full  flex flex-col lg:flex-row items-start gap-2 cursor-pointer ">
                            <div className=" container relative overflow-hidden inline-block ">
                                <span  className=" relative topTxt text-8xl md:text-9xl text-foreground font-bebas ">{project.project_name}</span>
                                <span  className="  absolute top-full left-0 bottomTxt text-8xl md:text-9xl text-foreground font-bebas ">{project.project_name}</span>
                            </div>
                            <div className=" text-sm font-switzer  flex flex-wrap gap-1 w-full lg:w-1/3 items-start justify-start lg:justify-end relative -z-10 tech-stack px-1 md:px-0 ">
                                {project.stack.map((s,i) => (
                                    <span key={i} className=" bg-secondary h-6  px-2 ">{s}</span>
                                ))}
                                
                            </div>
                        </TransitionLink>
                        
                    </div>
                ))}
                <div ref={mouse} className=" absolute top-0 left-0 w-20 h-20 bg-secondary rounded-full pointer-events-none will-change-transform scale-0 hidden lg:block ">
                    <div className=" flex items-center justify-center w-full h-full relative">
                        <MdArrowOutward className=" text-2xl" />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}