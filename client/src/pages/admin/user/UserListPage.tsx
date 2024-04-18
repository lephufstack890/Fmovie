import { DeleteIcon } from "lucide-react";
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
    useDeleteUserMutation,
    useGetUserListQuery,
} from "@/services/users/users.services";
import { deleteUser, loadUserList } from "@/services/users/usersSlices";
import { toastError, toastSuccess } from "@/hook/Toast";
import UserDetail from "@/pages/popup/user/UserDetail";

const UserListPage = () => {

    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [idUser, setIdUser] = useState(0);

    const dispatch = useAppDispatch();
    const userState = useAppSelector(
        (state) => state.users.users
    );

    const {
        data: user,
        isSuccess: isUserListSuccess,
    } = useGetUserListQuery([]);

    const [deleteUserApi, ] =
    useDeleteUserMutation();

    useEffect(() => {
        dispatch(loadUserList(user?.data));
    }, [isUserListSuccess]);

    const handlePopupOpen = (id: string | number) => {
        setIsOpenPopup(true);
        setIdUser(id);
    }

    const tHead = ["STT", "Họ và tên", "Email", "Số điện thoại", "Quyền", "Chi tiết", ""];


    const handleDeleteUser = async (id: string | number) => {
        try {
          await deleteUserApi(id).unwrap().then(() => {
            dispatch(deleteUser(id))
          }).then(() => {
            toastSuccess('Xóa user thành công')
          })
        } catch (error) {
          toastError('Xóa user thất bại')
        }
      };
    return (
        <div>
            <div className="mx-auto mt-1">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-2xl font-semibold leading-6 text-gray-900">
                                Danh sách User
                            </h1>
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
                            {userState?.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-3 text-base font-medium text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        {item?.name}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        {item?.email}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        {item?.phone_number}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        {item?.role}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        <div onClick={() => handlePopupOpen(item.id!)}>
                                            <button style={{ background: '#ccc', padding: '4px 12px', borderRadius: '6px' }}>Xem</button>
                                        </div>
                                    </td>
                                    <td className="relative py-2 pl-3 text-right text-base font-medium flex">
                                        <div
                                            onClick={() =>
                                                handleDeleteUser(item.id!)
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
            {isOpenPopup && <UserDetail setIsOpenPopup={setIsOpenPopup} idUser={idUser}/>}
            </div>
        </div>
    );
};

export default UserListPage;
