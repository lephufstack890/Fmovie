import { DeleteIcon, EditIcon } from "lucide-react";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useAppDispatch} from "@/app/hooks";
import {
    useDeleteSeatMutation,
    useGetSeatListQuery,
} from "@/services/seats/seats.services";
import { deleteSeat, loadSeatList } from "@/services/seats/seatsSlices";
import { toastError, toastSuccess } from "@/hook/Toast";
import Pagination from "@/components/pagination/Pagination";
import "./index.scss";

interface seat {
    id: number,
    room: {
        name: string
    },
    nameRow: string,
    seats_type: {
        name: string
    },
    seatStatus: string
}

const SeatsPage = () => {

    const [activeTab, setActiveTab] = useState("Ghế chưa đặt");
    const [status, setStatus] = useState('chưa đặt')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10; 

    const dispatch = useAppDispatch();

    const tHead = ["STT", "Tên phòng", "Tên ghế","Kiểu ghế", "Trạng thái", "Tác vụ"];

    const {
        data: seat,
        isSuccess: isSeatListSuccess,
    } = useGetSeatListQuery({ page: currentPage, status });

    const totalPages = seat?.seats?.last_page;

    const [deleteSeatApi] = useDeleteSeatMutation();

    useEffect(() => {
        if (seat) {
            dispatch(loadSeatList(seat?.seats));
        }
    }, [dispatch, isSeatListSuccess, seat]);

    const handleGetSeat = (status: string, active: string) => {
        setActiveTab(active)
        setStatus(status)
        setCurrentPage(1);
    }

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
    }

    const getSTT = (index: number) => {
        return (currentPage - 1) * itemsPerPage + index + 1;
    }

    const handleDelete = async (id: string | number) => {
        try {
          await deleteSeatApi(id).unwrap().then(() => {
            dispatch(deleteSeat(id))
          }).then(() => {
            toastSuccess('Xóa ghế thành công')
          })
        } catch (error) {
          toastError('Xóa ghế thất bại')
        }
      };
    return (
        <div>
            <div className="mx-auto mt-1">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-2xl font-semibold leading-6 text-gray-900">
                                Danh sách ghế
                            </h1>
                        </div>
                    </div>
                    <ul className="list-seats__nav flex justify-center">
                        <li
                            onClick={() => handleGetSeat("chưa đặt","Ghế chưa đặt")}
                            className={`nav-item ${
                                activeTab === "Ghế chưa đặt" ? "active" : ""
                            }`}
                        >
                            Ghế chưa đặt
                        </li>
                        <li
                            onClick={() => handleGetSeat("đang giữ","Ghế đang giữ")}
                            className={`nav-item ${
                                activeTab === "Ghế đang giữ" ? "active" : ""
                            }`}
                        >
                            Ghế đang giữ
                        </li>
                        <li
                            onClick={() => handleGetSeat("đã bán","Ghế đã bán")}
                            className={`nav-item ${
                                activeTab === "Ghế đã bán" ? "active" : ""
                            }`}
                        >
                            Ghế đã bán
                        </li>
                    </ul>
                </div>

                <div className="mt-8 flow-root overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {seat?.seats?.data?.length > 0 ? (
                        <table className="w-full text-left ">
                            <thead className="bg-white">
                                <tr className="border-t border-b">
                                    {tHead.map((item, index) => (
                                        <th
                                            key={index}
                                            scope="col"
                                            className=" py-3 px-3 text-left text-base font-semibold text-gray-900"
                                        >
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {seat?.seats?.data?.map((item: seat, index: number) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-2 px-3 text-base font-medium text-gray-900">
                                            {getSTT(index)}
                                        </td>
                                        <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                            {item?.room?.name}
                                        </td>
                                        <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                            {item?.nameRow}{item?.id}
                                        </td>
                                        <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                            {item?.seats_type?.name}
                                        </td>
                                        <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                            {item?.seatStatus}
                                        </td>
                                        <td className="relative py-2 pl-3 text-right text-base font-medium flex">
                                            <Link
                                                to={`/admin/seat/edit/${item?.id}`}
                                                className="text-indigo-600 hover:text-indigo-900  p-2 mr-5 cursor-pointer"
                                            >
                                                <EditIcon />
                                            </Link>
                                            <div
                                                onClick={() =>
                                                    handleDelete(item.id!)
                                                }
                                                className="p-2 text-red-400 cursor-pointer"
                                            >
                                                <DeleteIcon />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <h3 style={{ textAlign: 'center' }}>Hiện tại không có ghế nào!</h3>
                    )}
                    { seat?.seats?.total > 10 && 
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
                    }
                </div>
            </div>
            </div>
        </div>
    );
};

export default SeatsPage;
