import { DeleteIcon } from "lucide-react";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
    useDeletePaymentMutation,
    useGetPaymentListQuery,
} from "@/services/payment/payments.services";
import { deletePayment, loadPaymentList } from "@/services/payment/paymentsSlices";
import { toastError, toastSuccess } from "@/hook/Toast";

const OrderListPage = () => {

    const dispatch = useAppDispatch();
    const paymentState = useAppSelector(
        (state) => state.payments.payments
    );

    const {
        data: payment,
        isSuccess: isPaymentListSuccess,
    } = useGetPaymentListQuery([]);

    const [deletePaymentApi, ] =
    useDeletePaymentMutation();

    useEffect(() => {
        dispatch(loadPaymentList(payment?.data));
    }, [isPaymentListSuccess]);

    function formatCurrency(amount: string | number) {
        let intAmount = parseInt(amount);
        let formattedAmount = intAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

        formattedAmount = formattedAmount.replace('₫', '') + ' VND';
    
        return formattedAmount;
    }

    const tHead = ["STT","Mã đơn hàng","Tên Khách","Số điện thoại", "Tên Phim", "Rạp chiếu", "Phòng chiếu", "Ngày chiếu", "Giờ chiếu", "Tổng tiền"];


    const handleDeleteUser = async (id: string | number) => {
        try {
          await deletePaymentApi(id).unwrap().then(() => {
            dispatch(deletePayment(id))
          }).then(() => {
            toastSuccess('Xóa đơn hàng thành công')
          })
        } catch (error) {
          toastError('Xóa đơn hàng thất bại')
        }
      };
    return (
        <div>
            <div className="mx-auto mt-1">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-2xl font-semibold leading-6 text-gray-900">
                                Danh sách đơn hàng
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
                            {paymentState?.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-3 text-base font-medium text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        {item?.order_code}
                                    </td>
                                    <td className="py-2 px-3 text-base font-medium text-gray-900">
                                        {item?.user?.name}
                                    </td>
                                    <td className="py-2 px-3 text-base font-medium text-gray-900">
                                        {item?.user?.phone_number}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        {item?.name_movie}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        {item?.name_cinemas}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        {item?.name_room}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        {item?.day_movie}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        {item?.time_show}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        {formatCurrency(item?.totalPayment)}
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
            </div>
        </div>
    );
};

export default OrderListPage;
