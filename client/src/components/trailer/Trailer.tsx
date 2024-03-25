import React from "react";
import { Link } from "react-router-dom";
import { DrawerClose } from "../ui/drawer";
import CloseIcon from "@/assets/icon/CloseIcon";
import { cn } from "@/lib/utils";
type Props = {};

const Trailer = (props: Props) => {
    return (
        <div className="bg-white text-[#333] p-6   w-full">
            <div className="flex justify-between border-b">
                <h1 className="uppercase text-2xl  font-normal">
                    Trailer - <span>Mai</span>
                </h1>
                <DrawerClose>
                    <CloseIcon />
                </DrawerClose>
            </div>
            <div className={cn('mt-3')}>
                <iframe
                    width="100%"
                    height="410"
                    src="https://www.youtube.com/embed/EX6clvId19s?si=97Fh0t-8hl0Iw24Y"
                    title="YouTube video player"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default Trailer;
