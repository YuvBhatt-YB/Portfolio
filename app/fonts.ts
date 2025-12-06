import localFont from "next/font/local"

export const bebas = localFont({
    src: "./fonts/BebasNeue-Regular.woff2",
    variable: "--font-bebas"
})

export const switzer = localFont({
    src: [
        {
            path:"./fonts/Switzer-Regular.otf",
            weight:"400",
            style:"normal"
        },
        {
            path:"./fonts/Switzer-Semibold.otf",
            weight:"600",
            style:"normal"
        },
        {
            path:"./fonts/Switzer-Bold.otf",
            weight:"700",
            style:"normal"
        },
        {
            path:"./fonts/Switzer-Black.otf",
            weight:"900",
            style:"normal"
        }
    ],
    variable:"--font-switzer"
})

export const striper = localFont({
    src: "./fonts/Striper-Regular.otf",
    variable: "--font-striper"
})