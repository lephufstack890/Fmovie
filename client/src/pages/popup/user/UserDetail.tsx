import { useGetUserQuery } from "@/services/users/users.services"

interface UserDetailProps {
    setIsOpenPopup: (isOpen: boolean) => void;
    idUser: number | string;
}

interface transaction {
    order_code: string,
    name_movie: string,
    name_cinemas: string,
    name_room: string,
    day_movie: string,
    time_show: string,
    totalPayment: number
}

const UserDetail: React.FC<UserDetailProps> = ({setIsOpenPopup, idUser}) => {

    const handleCloseQRCodeChange = async () => {
        setIsOpenPopup(false);
    }

    const {
        data: user,
    } = useGetUserQuery( idUser );

    function formatCurrency(amount: string | number) {
        const intAmount = Number(amount);
        let formattedAmount = intAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

        formattedAmount = formattedAmount.replace('₫', '') + ' VND';
    
        return formattedAmount;
    }

    const tHead = ["STT", "Mã đơn hàng", "Tên Phim", "Rạp chiếu", "Phòng chiếu", "Ngày chiếu", "Giờ chiếu", "Tổng tiền"];
  
    return (
        <>
        <div
        style={{
            position: 'fixed',
            background: 'rgba(0,0,0,0.6)',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
          }}
        >
            <div
            style={{
                position: 'absolute',
                top: '140px',
                left: '100px',
                background: 'white',
                borderRadius: '6px',
                width: '1350px',
                minHeight: '220px',
                padding: '20px 10px'
            }} 
            >
                <div className="p-2" style={{ fontSize: '12px' }}>
                    <div >
                        <div>
                            <div>
                                <p style={{ fontWeight: '700', fontSize: '20px', textAlign: 'center', paddingTop: '10px' }}>
                                    Thông tin chi tiết các đơn hàng của {user?.data?.name}
                                </p>
                            </div>
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
                            {user?.data?.transactions?.map((item: transaction, index: number) => (
                                <tr key={index} className="border-b">
                                    <td className="py-2 px-3 text-base font-medium text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="hidden px-3 py-2 text-base text-gray-500 sm:table-cell">
                                        {item?.order_code}
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                        </div>
                    </div>
                        
                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <button onClick={handleCloseQRCodeChange} className="btn btn-primary" style={{ padding: '8px 35px', background: '#ccc', border: 'none' }}>Đóng</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default UserDetail;