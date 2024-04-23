import { DeleteIcon, EditIcon } from "lucide-react";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
    useDeleteTimeShowMutation,
    useGetTimeShowListQuery,
} from "@/services/timeshow/timeshows.services";
import { deleteTimeShow, loadTimeShowList } from "@/services/timeshow/timeshowsSlices";
import { toastError, toastSuccess } from "@/hook/Toast";
import { Link } from "react-router-dom";

interface Timeshow {
    id: number,
    id_room: string,
    name: string,
    seat_quantities: string
}

const TrailerListPage = () => {

    const dispatch = useAppDispatch();
    const timeshowState = useAppSelector(
        (state) => state.timeshows.timeshows
    );

    console.log(timeshowState);

    const {
        data: timeshow,
        isSuccess: isTimeShowListSuccess,
    } = useGetTimeShowListQuery([]);

    const [deleteTimeShowApi] = useDeleteTimeShowMutation();

    useEffect(() => {
        dispatch(loadTimeShowList(timeshow?.data));
    }, [dispatch, timeshow, isTimeShowListSuccess]);


    const tHead = ["STT", "Phòng chiếu", "Giờ chiếu", "Số lượng loại ghế", "Tình Trạng", ""];

    function convertString(str: string) {
        if(typeof str !== 'string'){
            return;
        }else{
            const regex = /(\d+)/g;
            const matches = str.match(regex);
    
            const convertedStr = `Ghế thường: ${matches?.[0]} cái, Ghế vip: ${matches?.[1]} cái, Ghế đôi: ${matches?.[2]} cái`;
            
            return convertedStr;
        }
        
    }


    const handleDeleteTimeShow = async (id: string | number) => {
        try {
          await deleteTimeShowApi(id).unwrap().then(() => {
            dispatch(deleteTimeShow(id))
          }).then(() => {
            toastSuccess('Xóa timeshow thành công')
          })
        } catch (error) {
          toastError('Xóa timeshow thất bại')
        }
      };
    return (
        <div>
            <div className="mx-auto mt-1">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-2xl font-semibold leading-6 text-gray-900">
                                Danh sách thời gian chiếu
                            </h1>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <button
                                type="button"
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <Link
                                    to="/admin/time-show/add"
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}
                                >
                                    Thêm thời gian chiếu
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flow-root overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                            {timeshow?.data?.map((item: Timeshow, index: number) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-3 text-base font-medium text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        Phòng chiếu {item?.id_room}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        {item?.name}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        {convertString(item?.seat_quantities)}
                                    </td>
                                    <td className="relative py-2 pl-3 text-right text-base font-medium flex">
                                        <Link
                                            to={`/admin/time-show/edit/${item?.id}`}
                                            className="text-indigo-600 hover:text-indigo-900  p-2 mr-5 cursor-pointer"
                                        >
                                            <EditIcon />
                                        </Link>
                                        <div
                                            onClick={() =>
                                                handleDeleteTimeShow(item.id!)
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
                </div>
            </div>
            </div>
        </div>
    );
};

export default TrailerListPage;
