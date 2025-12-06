"use client"
export default function Overlay(){
    return (
        <div id="transition-overlay" className=" fixed inset-0 pointer-events-none z-9999  overflow-hidden  invisible">
            <div className="   h-1/2 flex overflow-hidden row-1-container relative ">
            
            <div className="row1 bg-foreground  flex-1 relative ">
                <div className=" absolute inset-0 noise-menu"></div>
            </div>
            <div className="row1 bg-foreground  flex-1 relative ">
                <div className=" absolute inset-0 noise-menu"></div>
            </div>
            <div className="row1 bg-foreground  flex-1 relative ">
                <div className=" absolute inset-0 noise-menu"></div>
            </div>
            <div className="row1 bg-foreground  flex-1 relative ">
                <div className=" absolute inset-0 noise-menu"></div>
            </div>
            </div>
            <div className="   h-1/2 flex overflow-hidden row-2-container relative ">
            <div className="row2  bg-foreground  flex-1 relative ">
                <div className=" absolute inset-0 noise-menu"></div>
            </div>
            <div className="row2 bg-foreground  flex-1 relative ">
                <div className=" absolute inset-0 noise-menu"></div>
            </div>
            <div className="row2 bg-foreground  flex-1 relative ">
                <div className=" absolute inset-0 noise-menu"></div>
            </div>
            <div className="row2  bg-foreground flex-1 relative ">
                <div className=" absolute inset-0 noise-menu"></div>
            </div>
            </div>
        </div>
    )
}