import { DeleteIcon, EditIcon } from "lucide-react";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
    useDeleteTrailerMutation,
    useGetTrailerListQuery,
} from "@/services/trailer/trailers.services";
import { deleteTrailer, loadTrailerList } from "@/services/trailer/trailersSlices";
import { toastError, toastSuccess } from "@/hook/Toast";
import { Link } from "react-router-dom";

const TrailerListPage = () => {

    const dispatch = useAppDispatch();
    const trailerState = useAppSelector(
        (state) => state.trailers.trailers
    );

    const {
        data: trailer,
        isLoading: isTrailerListLoading,
        isSuccess: isTrailerListSuccess,
    } = useGetTrailerListQuery([]);

    const [deleteTrailerApi, { isError: isDeleteTrailerError }] =
    useDeleteTrailerMutation();

    useEffect(() => {
        dispatch(loadTrailerList(trailer?.data));
    }, [isTrailerListSuccess]);


    const tHead = ["STT", "Link Trailer", "Thời gian", "Tác vụ", ""];


    const handleDeleteTrailer = async (id: string | number) => {
        try {
          await deleteTrailerApi(id).unwrap().then(() => {
            dispatch(deleteTrailer(id))
          }).then(() => {
            toastSuccess('Xóa trailer thành công')
          })
        } catch (error) {
          toastError('Xóa trailer thất bại')
        }
      };
    return (
        <div>
            <div className="mx-auto mt-1">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-2xl font-semibold leading-6 text-gray-900">
                                Danh sách trailer
                            </h1>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <button
                                type="button"
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <Link
                                    to="/admin/trailer/add"
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}
                                >
                                    Thêm trailer
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
                            {trailerState?.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-3 text-base font-medium text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        {item?.url}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        {item?.dateShow}
                                    </td>
                                    <td className="relative py-2 pl-3 text-right text-base font-medium flex">
                                        <Link
                                            to={`/admin/trailer/edit/${item?.id}`}
                                            className="text-indigo-600 hover:text-indigo-900  p-2 mr-5 cursor-pointer"
                                        >
                                            <EditIcon />
                                        </Link>
                                        <div
                                            onClick={() =>
                                                handleDeleteTrailer(item.id!)
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
