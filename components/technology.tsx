"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useLayoutEffect } from "react";

export default function Technology(){
    useGSAP(()=>{
        gsap.from(".circ-left",{
            y:-100,
            duration:7,
            repeat:-1,
            yoyo:true,
            ease:"sine.inOut"
        })
        gsap.to(".circ-right",{
            y:250,
            duration:7,
            repeat:-1,
            yoyo:true,
            ease:"sine.inOut"
        })
    },[])
    return (
        <div className=" relative flex   overflow-hidden [@media(min-width:1360px)]:overflow-visible ">
            <div className="hidden lg:block w-[140px] h-[140px] rounded-full bg-foreground absolute top-2/3 left-[-10%] circ-left">
            <div className=" noise-circle absolute inset-0 rounded-full "></div>
            </div>
            <div className="hidden lg:block  w-[70px] h-[70px] rounded-full bg-foreground absolute top-1/6 right-[-5%] circ-right">
            <div className=" noise-circle absolute inset-0 rounded-full "></div>
            </div>
            <div className="  flex flex-col w-full gap-8 md:gap-18 ">
                <div className=" font-bebas text-6xl sm:text-8xl  lg:text-[clamp(6rem,8vw,8rem)] ">
                <div className=" flex flex-col lg:flex-row items-center justify-center lg:gap-4 relative  ">
                    <p className=" relative leading-none ">technologies
                        <span className=" hidden lg:block absolute  lg:w-[clamp(150px,40vw,600px)] h-[34px]"><Image fill src={"/underline.svg"} alt="underline" /></span>
                    </p>
                    <p className=" leading-none whitespace-nowrap">i work with</p>
                    <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 noise-overlay"
                    />
                </div>
            </div>
            <div className="  flex-1 flex items-center px-2 lg:px-0  ">
                <div className="  w-full h-full flex items-center justify-center  py-8 lg:py-[clamp(2rem,4vw,4.5rem)]  ">
                    <div className="  relative grid grid-cols-3 sm:grid-cols-4 grid-rows-4 gap-2 ">
                        <div className=" border-2 border-[#e9e5e3] hover:border-foreground transition-colors ease-in-out duration-300 rounded-md p-4 md:py-10 md:px-20 flex flex-col items-center">
                            <div className=" relative w-[50px] h-[50px] ">
                                <Image src={"/html.svg"} fill alt="html" />
                            </div>
                            <p className=" font-switzer  text-center mt-1 text-foreground">HTML</p>
                        </div>
                        <div className=" border-2 border-[#e9e5e3] hover:border-foreground transition-colors ease-in-out duration-300 rounded-md p-4 md:py-10 md:px-20  flex flex-col items-center">
                            <div className=" relative w-[50px] h-[50px] ">
                                <Image src={"/css.svg"} fill alt="css" />
                            </div>
                            <p className=" font-switzer  text-center mt-1 text-foreground">CSS</p>
                        </div>
                        <div className=" border-2 border-[#e9e5e3] hover:border-foreground transition-colors ease-in-out duration-300 rounded-md p-4 md:py-10 md:px-20  flex flex-col items-center">
                            <div className=" relative w-[50px] h-[50px] ">
                                <Image src={"/js.svg"} fill alt="html" />
                            </div>
                            <p className=" font-switzer  text-center mt-1 text-foreground">Javascript</p>
                        </div>
                        <div className=" border-2 border-[#e9e5e3] hover:border-foreground transition-colors ease-in-out duration-300 rounded-md p-4 md:py-10 md:px-20  flex flex-col items-center">
                            <div className=" relative w-[50px] h-[50px] ">
                                <Image src={"/ts.svg"} fill alt="html" />
                            </div>
                            <p className=" font-switzer  text-center mt-1 text-foreground">Typescript</p>
                        </div>
                        <div className=" border-2 border-[#e9e5e3] hover:border-foreground transition-colors ease-in-out duration-300 rounded-md p-4 md:py-10 md:px-20  flex flex-col items-center">
                            <div className=" relative w-[50px] h-[50px] ">
                                <Image src={"/react.svg"} fill alt="html" />
                            </div>
                            <p className=" font-switzer  text-center mt-1 text-foreground">React</p>
                        </div>
                        <div className=" border-2 border-[#e9e5e3] hover:border-foreground transition-colors ease-in-out duration-300 rounded-md p-4 md:py-10 md:px-20  flex flex-col items-center">
                            <div className=" relative w-[50px] h-[50px] ">
                                <Image src={"/nextjs.svg"} fill alt="html" />
                            </div>
                            <p className=" font-switzer  text-center mt-1 text-foreground">Next.js</p>
                        </div>
                        <div className=" border-2 border-[#e9e5e3] hover:border-foreground transition-colors ease-in-out duration-300 rounded-md p-4 md:py-10 md:px-20  flex flex-col items-center">
                            <div className=" relative w-[50px] h-[50px] ">
                                <Image src={"/nodejs.svg"} fill alt="html" />
                            </div>
                            <p className=" font-switzer  text-center mt-1 text-foreground">Node.js</p>
                        </div>
                        <div className=" border-2 border-[#e9e5e3] hover:border-foreground transition-colors ease-in-out duration-300 rounded-md p-4 md:py-10 md:px-20  flex flex-col items-center">
                            <div className=" relative w-[50px] h-[50px] ">
                                <Image src={"/express.svg"} fill alt="html" />
                            </div>
                            <p className=" font-switzer  text-center mt-1 text-foreground">Express.js</p>
                        </div>
                        <div className=" border-2 border-[#e9e5e3] hover:border-foreground transition-colors ease-in-out duration-300 rounded-md p-4 md:py-10 md:px-20  flex flex-col items-center">
                            <div className=" relative w-[50px] h-[50px] ">
                                <Image src={"/postgresql.svg"} fill alt="html" />
                            </div>
                            <p className=" font-switzer  text-center mt-1 text-foreground">PostgreSQL</p>
                        </div>
                        <div className=" border-2 border-[#e9e5e3] hover:border-foreground transition-colors ease-in-out duration-300 rounded-md p-4 md:py-10 md:px-20  flex flex-col items-center">
                            <div className=" relative w-[50px] h-[50px] ">
                                <Image src={"/mongodb.svg"} fill alt="html" />
                            </div>
                            <p className=" font-switzer  text-center mt-1 text-foreground">MongoDB</p>
                        </div>
                        <div className=" border-2 border-[#e9e5e3] hover:border-foreground transition-colors ease-in-out duration-300 rounded-md p-4 md:py-10 md:px-20  flex flex-col items-center">
                            <div className=" relative w-[50px] h-[50px] ">
                                <Image src={"/prisma.svg"} fill alt="html" />
                            </div>
                            <p className=" font-switzer  text-center mt-1 text-foreground">Prisma</p>
                        </div>
                        <div className=" border-2 border-[#e9e5e3] hover:border-foreground transition-colors ease-in-out duration-300 rounded-md p-4 md:py-10 md:px-20  flex flex-col items-center">
                            <div className=" relative w-[50px] h-[50px] ">
                                <Image src={"/redis.svg"} fill alt="html" />
                            </div>
                            <p className=" font-switzer  text-center mt-1 text-foreground">Redis</p>
                        </div>
                        <div className=" border-2 border-[#e9e5e3] hover:border-foreground transition-colors ease-in-out duration-300 rounded-md p-4 md:py-10 md:px-20  flex flex-col items-center">
                            <div className=" relative w-[50px] h-[50px] ">
                                <Image src={"/docker.svg"} fill alt="html" />
                            </div>
                            <p className=" font-switzer  text-center mt-1 text-foreground">Docker</p>
                        </div>
                        <div className=" border-2 border-[#e9e5e3] hover:border-foreground transition-colors ease-in-out duration-300 rounded-md p-4 md:py-10 md:px-20  flex flex-col items-center">
                            <div className=" relative w-[50px] h-[50px] ">
                                <Image src={"/python.svg"} fill alt="html" />
                            </div>
                            <p className=" font-switzer  text-center mt-1 text-foreground">Python</p>
                        </div>
                        <div className=" border-2 border-[#e9e5e3] hover:border-foreground transition-colors ease-in-out duration-300 rounded-md p-4 md:py-10 md:px-20  flex flex-col items-center">
                            <div className=" relative w-[50px] h-[50px] ">
                                <Image src={"/wordpress.svg"} fill alt="html" />
                            </div>
                            <p className=" font-switzer  text-center mt-1 text-foreground">Wordpress</p>
                        </div>
                        <div className=" border-2 border-[#e9e5e3] hover:border-foreground transition-colors ease-in-out duration-300 rounded-md p-4 md:py-10 md:px-20  flex flex-col items-center">
                            <div className=" relative w-[50px] h-[50px] ">
                                <Image src={"/figma.svg"} fill alt="html" />
                            </div>
                            <p className=" font-switzer  text-center mt-1 text-foreground">Figma</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}