// import { DrawerClose } from "../ui/drawer";
// import CloseIcon from "@/assets/icon/CloseIcon";
// import { cn } from "@/lib/utils";

// const Trailer = ({ trailer, name }: any) => {  
//     return (
//         <div className="bg-white text-[#333] p-6   w-full">
//             <div className="flex justify-between border-b">
//                 <h1 className="uppercase text-2xl  font-normal">
//                     Trailer - <span>{name}</span>
//                 </h1>
//                 <DrawerClose>
//                     <CloseIcon />
//                 </DrawerClose>
//             </div>
//             <div className={cn('mt-3')}>
//                 <iframe
//                     width="100%"
//                     height="410"
//                     src={trailer}
//                     title="YouTube video player"
//                     frameBorder={0}
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                     allowFullScreen
//                 ></iframe>
//             </div>
//         </div>
//     );
// };

// export default Trailer;



import { DrawerClose } from "../ui/drawer";
import CloseIcon from "@/assets/icon/CloseIcon";
import { cn } from "@/lib/utils";

interface TrailerProps {
    trailer: string;
    name: string;
}

const Trailer: React.FC<TrailerProps> = ({ trailer, name }) => {  
    return (
        <div className="bg-white text-[#333] p-6   w-full">
            <div className="flex justify-between border-b">
                <h1 className="uppercase text-2xl  font-normal">
                    Trailer - <span>{name}</span>
                </h1>
                <DrawerClose>
                    <CloseIcon />
                </DrawerClose>
            </div>
            <div className={cn('mt-3')}>
                <iframe
                    width="100%"
                    height="410"
                    src={trailer}
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


