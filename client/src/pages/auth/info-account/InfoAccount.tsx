import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { z } from "zod"
import { useForm } from "react-hook-form"
import './InfoAccount.scss'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    useGetPaymentListQuery,
} from "@/services/payment/payments.services";
import { loadPaymentList } from "@/services/payment/paymentsSlices";

const Login = () => {

    const [activeTab, setActiveTab] = useState("THÔNG TIN TÀI KHOẢN");

    const dispatch = useAppDispatch();
    const paymentState = useAppSelector(
        (state) => state.payments.payments
    );

    const {
        data: payment,
        isSuccess: isPaymentListSuccess,
    } = useGetPaymentListQuery([]);

    useEffect(() => {
        dispatch(loadPaymentList(payment?.data));
    }, [isPaymentListSuccess]);

    const handleSetTab = (active: string) => {
        setActiveTab(active)
    }

    const FormSchema = z.object({

    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullname: "",
            email: "",
        },
      })
    
    return (
        <div className="container mt-5 mb-5">
            <ul className='list-info d-flex'>
                <li 
                    onClick={() => handleSetTab("THÔNG TIN TÀI KHOẢN")}
                    className={`nav-item ${
                        activeTab === "THÔNG TIN TÀI KHOẢN" ? "active" : ""
                    }`}
                >
                    THÔNG TIN TÀI KHOẢN
                </li>
                <li 
                    onClick={() => handleSetTab("VOUCHER")}
                    className={`nav-item ${
                        activeTab === "VOUCHER" ? "active" : ""
                    }`}
                >
                    LỊCH SỬ ĐƠN HÀNG
                </li>
            </ul>
            { activeTab === "THÔNG TIN TÀI KHOẢN" && 
            <div style={{ background: '#f8f9fa', padding: '20px 30px' }}>
                <Form {...form}>
                    <form >
                        <div  className="grid gap-3 md:grid-cols-1 d-flex">
                            <div style={{ padding: '5px', background: '#fff', border: '1px solid #ddd' }}>
                                <img src="https://via.placeholder.com/200x150/EFEFEF/AAAAAA&text=no+image" alt="" />
                            </div>  
                            <div>
                                <a style={{ background: '#ddd', padding: '3px 15px', marginRight: '10px', fontWeight: '300', fontSize: '14px' }}>TẢI ẢNH LÊN</a>
                                {/* <a style={{ color: '#ffffff', background: '#44b6ae', padding: '3px 15px', fontWeight: '300', fontSize: '14px' }}>LƯU ẢNH</a> */}
                            </div>                        
                        </div>

                        <div  className="grid gap-3 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="fullname"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Họ và tên</FormLabel>
                                    <FormControl>
                                    <Input placeholder="" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                    <Input placeholder="" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>

                        <div  className="grid gap-3 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="fullname"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Số điện thoại</FormLabel>
                                    <FormControl>
                                    <Input placeholder="" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CMND/Hộ chiếu</FormLabel>
                                    <FormControl>
                                    <Input placeholder="" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>

                        <div  className="grid gap-3 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ngày sinh</FormLabel>
                                    <FormControl>
                                    <Input type="date" placeholder="" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="condition"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giới tính</FormLabel>
                                    <FormControl>
                                        <select {...field} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="">Giới tính</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div  className="grid gap-3 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="fullname"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tỉnh/Thành phố</FormLabel>
                                    <FormControl>
                                    <Input placeholder="" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quận/Huyện</FormLabel>
                                    <FormControl>
                                    <Input placeholder="" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>

                        <div  className="grid gap-3 md:grid-cols-1">
                            <FormField
                                control={form.control}
                                name="fullname"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Địa chỉ</FormLabel>
                                    <FormControl>
                                    <Input placeholder="" className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>

                        <div  className="grid gap-3 md:grid-cols-1 mt-4 pl-1">
                            <a href="">Đổi mật khẩu?</a>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center'}}>
                            <Button type="submit" 
                                    className="mt-5 rounded-md p-2 text-center font-semibold text-white" 
                                    style={{ width: '130px' }}
                            >
                                Cập nhật
                            </Button>
                        </div>

                    </form>
                </Form>
            </div>
            }

            { activeTab === "VOUCHER" && 
            <div style={{ background: '#f8f9fa', padding: '20px 30px' }}>
                <h4 style={{ color: '#03599d' }}>LỊCH SỬ ĐƠN HÀNG</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd' }} scope="col">THỜI GIAN</th>
                            <th style={{ border: '1px solid #ddd' }} scope="col">MÃ ĐƠN HÀNG</th>
                            <th style={{ border: '1px solid #ddd' }} scope="col">TRẠNG THÁI</th>
                            {/* <th style={{ border: '1px solid #ddd', width: '550px' }} scope="col">NỘI DUNG ĐƠN HÀNG</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {paymentState?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.time}</td>
                                <td>{item?.order_code}</td>
                                {/* <td>{}</td> */}
                                <td>{item?.paymentStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            }
        </div>
    );
};

export default Login;
