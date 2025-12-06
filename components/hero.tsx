"use client"
import { preLoaderStore } from "@/store/store";
import Bottom from "./hero/bottom";
import Heading from "./hero/heading";

export default function Hero(){
    const isLoaded = preLoaderStore(state => state.isLoaded)
    return (
        <div id="home" className=" lg:min-h-dvh  px-2 [@media(min-width:1180px)]:px-0 pt-20 md:pt-24 lg:pt-28  ">
            <Heading />
            <Bottom />
        </div>
    )
}