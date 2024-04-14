import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
} from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";
import MovieIcon from "../../assets/icon/MovieIcon";
import HomeIcon from "../../assets/icon/HomeIcon";
import MovieType from "../../assets/icon/MovieType";
import CinemaIcon from "@/assets/icon/CinemaIcon";
import VoucherIcon from "@/assets/icon/VoucherIcon";

interface Children {
    name: string;
    href: string;
    current?: boolean;
}
interface SubNav {
    name: string;
    href?: string;
    icon:
        | React.ForwardRefExoticComponent<
              Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
                  title?: string | undefined;
                  titleId?: string | undefined;
              } & React.RefAttributes<SVGSVGElement>
          >
        | any;
    current: boolean;
    children?: Children[];
}

const navigation: SubNav[] = [
    { name: "Dashboard", href: "/admin", icon: HomeIcon, current: true },
    {
        name: "Phim",
        icon: MovieIcon,
        current: false,
        children: [
            { name: "Danh sách ", href: "/admin/movie" },
            { name: "Thêm phim", href: "/admin/movie/add" },
        ],
    },
    {
        name: "Thể Loại",
        icon: MovieType,
        current: false,
        href: 'movie-type'
    },
    // {
    //     name: "Rạp Phim",
    //     icon: CinemaIcon,
    //     current: false,
    //     href: 'cinema'
    // },

    {
        name: "Phòng chiếu",
        icon: MovieIcon,
        current: false,
        children: [
            { name: "Danh sách ", href: "/admin/room" },
            { name: "Thêm phòng chiếu", href: "/admin/room/add" },
        ],
    },

    // {
    //     name: "Voucher",
    //     icon: VoucherIcon,
    //     current: false,
    //     href: 'voucher'
        
    // },

    {
        name: "Trailer",
        icon: MovieIcon,
        current: false,
        children: [
            { name: "Danh sách ", href: "/admin/trailer" },
            { name: "Thêm trailer", href: "/admin/trailer/add" },
        ],
    },

    {
        name: "Ghế",
        icon: CalendarIcon,
        current: false,
        children: [
            { name: "Danh sách ", href: "/admin/seat" },
            // { name: "Thêm ghế", href: "/admin/seat/add" },
        ],
    },

    {
        name: "Thời gian chiếu",
        icon: MovieIcon,
        current: false,
        children: [
            { name: "Danh sách ", href: "/admin/time-show" },
            { name: "Thêm thời gian chiếu", href: "/admin/time-show/add" },
        ],
    },

    {
        name: "Ngày chiếu",
        icon: MovieIcon,
        current: false,
        children: [
            { name: "Danh sách ", href: "/admin/day-movie" },
            { name: "Thêm ngày chiếu", href: "/admin/day-movie/add" },
        ],
    },

    
    


    // {
    //     name: "Projects",
    //     icon: FolderIcon,
    //     current: false,
    //     children: [
    //         { name: "GraphQL API", href: "#" },
    //         { name: "iOS App", href: "#" },
    //         { name: "Android App", href: "#" },
    //         { name: "New Customer Portal", href: "#" },
    //     ],
    // },
    // { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
    // {
    //     name: "Documents",
    //     href: "#",
    //     icon: DocumentDuplicateIcon,
    //     current: false,
    // },
    // { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];

function classNames(...classes: (string | boolean)[]): string {
    return classes.filter(Boolean).join(" ");
}

const SideBar = () => {
    return (
        <>
            <div className="flex grow flex-col gap-y-5 h-full overflow-y-hidden border-r border-gray-200 bg-white px-2">
                <div className="flex items-center justify-center h-16 shrink-0 ">
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul
                        role="list"
                        className="flex flex-1 flex-col gap-y-7 px-0"
                    >
                        <li>
                            <ul role="list" className="space-y-1 px-0">
                                {navigation.map((item) => (
                                    <li key={item.name}>
                                        {!item.children ? (
                                            <Link
                                                to={item.href!}
                                                className={classNames(
                                                    item.current
                                                        ? "bg-gray-50"
                                                        : "hover:bg-gray-50",
                                                    "group flex  gap-x-3 rounded-md p-2 text-sm leading-6 no-underline   font-semibold text-gray-700"
                                                )}
                                            >
                                                <item.icon
                                                    className="h-6 w-6 shrink-0 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </Link>
                                        ) : (
                                            <Disclosure as="div">
                                                {({ open }) => (
                                                    <>
                                                        <Disclosure.Button
                                                            className={classNames(
                                                                item.current
                                                                    ? "bg-gray-50"
                                                                    : "hover:bg-gray-50",
                                                                "flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700"
                                                            )}
                                                        >
                                                            <item.icon
                                                                className="h-6 w-6 shrink-0 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                            {item.name}
                                                            <ChevronRightIcon
                                                                className={classNames(
                                                                    open
                                                                        ? "rotate-90 text-gray-500"
                                                                        : "text-gray-400",
                                                                    "ml-auto h-5 w-5 shrink-0"
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        </Disclosure.Button>
                                                        <Disclosure.Panel
                                                            as="ul"
                                                            className="mt-1 px-2"
                                                        >
                                                            {item.children?.map(
                                                                (subItem) => (
                                                                    <li
                                                                        key={
                                                                            subItem.name
                                                                        }
                                                                    >
                                                                        {/* 44px */}

                                                                        <Link
                                                                            className={classNames(
                                                                                subItem.current
                                                                                    ? "bg-gray-50"
                                                                                    : "hover:bg-gray-50",
                                                                                "block rounded-md no-underline py-2 pr-2 pl-9 text-sm  leading-6 text-gray-700"
                                                                            )}
                                                                            to={
                                                                                subItem.href
                                                                            }
                                                                        >
                                                                            {" "}
                                                                            {
                                                                                subItem.name
                                                                            }
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            )}
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </li>
                        {/* if setting */}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default SideBar;
