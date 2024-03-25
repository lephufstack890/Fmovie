import React, { useState } from 'react'
import { FaRegArrowAltCircleDown } from 'react-icons/fa'
import { NumericFormat } from 'react-number-format';
import Combo from './Combo'

const InfoPayment = ({form,setForm, comboArr,handleAddCombo,handleMinusCombo,}) => {

    const [isVoucher,setIsVoucher]= useState(Boolean(false))
    // const [isPoint,setIsPoint]= useState(Boolean(false))

    // const payments = [
    //     {
    //       key:"1",
    //         imgPayment:"https://www.betacinemas.vn/Assets/global/img/booking/ic-card-vn.png",
    //         title:"Thẻ Nội Địa"
    //     },

    //     { key:"2",
    //         imgPayment:"https://www.betacinemas.vn/Assets/global/img/booking/shopeepay.png",
    //         title:"Ví ShoppyPay"
    //     },
    //     { key:"3",
    //         imgPayment:"https://www.betacinemas.vn/Assets/global/img/booking/momo.ico",
    //         title:"Ví Momo"
    //     },
    //     { key:"4",
    //         imgPayment:"https://www.betacinemas.vn/Assets/global/img/booking/zalopay.png",
    //         title:"Ví ZaloPay"
    //     },
    // ]
  return (
    <div className='col-lg-8 col-md-8 col-12 w-full '>
        <div>
            <div className='flex justify-start items-center '>
              <p>  <img src="https://www.betacinemas.vn/Assets/global/img/booking/ic-inforpayment.png" 
                    className='h-12'
                alt="" /></p>
                <p className='uppercase text-md font-medium ml-4 text-xl' >thông tin thanh toán</p>
            </div>
        </div>
        <div>
        <table className="min-w-full">
          <thead className="border-none">
            <tr>
             
              <th scope="col" className="text-md text-black font-medium px-2 py-2 whitespace-nowrap text-left">
                Họ Tên: 
              </th>
              <th scope="col" className="text-md text-black font-medium px-2 py-2 whitespace-nowrap text-left">
                Số điện thoại:
              </th>
              <th scope="col" className="text-md text-black font-medium px-2 py-2 whitespace-nowrap text-left">
                Email: 
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-none">
            
              <td className="text-md text-black font-thin px-2 py-2 whitespace-nowrap">
                {form?.name}
              </td>
              <td className="text-md text-black font-thin px-2 py-2 whitespace-nowrap">
                {form?.phone_number}
              </td>
              <td className="text-md text-black font-thin px-2 py-2 whitespace-nowrap">
                {form?.email} 
              </td>
            </tr>
           
          </tbody>
        </table>
        </div>
        <div className='w-full mt-8 flex justify-between items-center border-b-2 border-gray-600'>
            <p className='uppercase font-bold'>Ghế Vip</p>
            <p className='uppercase font-bold flex justify-center items-center'>
           
            <span> 2 x 50.000</span>
            <span className='ml-4'>= 100.000 vnđ</span>
            </p>
        </div>

        <div className='mt-8'>
        <div>
            <div className='flex justify-start items-center '>
              <p>  <img src="https://www.betacinemas.vn/Assets/global/img/booking/ic-combo.png" 
                    className='h-12'
                alt="" /></p>
                <p className='uppercase text-md font-medium ml-4 text-xl' >combo ưu đãi</p>
            </div>
        </div>
       <Combo comboArr={comboArr} handleAddCombo={handleAddCombo} 
        handleMinusCombo={handleMinusCombo}
       />
        </div>

        <div className='mt-8'>
            <div className='flex justify-start items-center '>
              <p>  <img src="https://www.betacinemas.vn/Assets/global/img/booking/ic-payment.png" 
                    className='h-12'
                alt="" /></p>
                <p className='uppercase text-md font-medium ml-4 text-xl' >giảm giá</p>
            </div>
        </div>
        <div className='space-y-6'>
            <div className='flex justify-start items-center border-b-[2px] border-gray-300 mb-6'>
                <p className='font-bold text-2xl rotate'><FaRegArrowAltCircleDown /></p>
                <p className='font-bold'>Beta Voucher</p>
                <p 
                onClick={()=>setIsVoucher(!isVoucher)}
                className='text-blue-700 italic'>(Nhấn vào đây để xem danh sách voucher của bạn)</p>
            </div>
            <div>
           {isVoucher &&  <div className="grid gap-3 md:grid-cols-3">
                <div> 
                <label className=""> Mã Voucher </label>
                <input type="text" className="mt-2 h-12 w-full border px-3" />
                </div>
                <div>
                <label className=""> Mã Pin </label>
                <input type="text" className="mt-2 h-12 w-full border px-3" />
                </div>
                <div>
                <label className="text-white"> ... </label>
                <button  className="mt-2 h-12 w-full rounded-md bg-gradient-to-r from-red-400 via-red-300 to-red-200  px-3">Thêm</button>
                </div>
            </div>}
            </div>
            <div className='flex justify-start items-center border-b-[2px] border-gray-300  mb-6'>
            <p className='font-bold text-2xl rotate'><FaRegArrowAltCircleDown /></p>
                <p className='font-bold'>Điểm Beta</p>
                <p className='text-blue-700 italic'>(Nhấn vào đây để xem điểm tích lũy của bạn)</p>
            </div>
        </div>

        <div className='w-full  pt-6 flex justify-end items-center'>
            <div>
               <div className='flex justify-end items-center space-x-6 font-medium text-xl'>
                <span className='text-blue-900'>Tổng tiền:</span>
                <span className='text-red-800'>
                <NumericFormat
                      value={form?.total}
                      thousandSeparator
                      displayType="text"
                    />
                   vnđ</span>
               </div>
               <div className='flex justify-end items-center space-x-6 font-medium text-xl'>
                <span className='text-blue-900'>Số tiền được giảm:</span>
                <span className='text-red-800'>
                   <NumericFormat
                      value={form?.discount}
                      thousandSeparator
                      displayType="text"
                    />
                  vnđ</span>
               </div>
               <div className='flex justify-end items-center space-x-6 font-medium text-xl'>
                <span className='text-blue-900'>Số tiền cần thanh toán:</span>
                <span className='text-red-800'>
                   <NumericFormat
                      value= {form?.totalPaymemt}
                      thousandSeparator
                      displayType="text"
                    />
                  vnđ</span>
               </div>
            </div>
        </div>


        {/* <div className='mt-8'>
            <div className='flex justify-start items-center '>
              <p>  <img src="https://www.betacinemas.vn/Assets/global/img/booking/ic-payment.png" 
                    className='h-12'
                alt="" /></p>
                <p className='uppercase text-md font-medium ml-4 text-xl' >PHƯƠNG THỨC THANH TOÁN</p>
            </div>
        </div>
        <div className=''>
            <p className='border-b-[2px] border-gray-300 text-lg font-bold pb-1 '>Chọn thẻ thanh toán</p>
            <div className='flex justify-start items-center space-x-4 space-y-2'>
                {payments?.map((item)=>{
                    return(<>
                       <div className="relative flex items-center justify-center rounded-xl px-4 py-3 font-medium text-gray-700">
            <input className="peer hidden" type="radio" name="radio" id={`radio${item?.key}`} checked />
            <label className=" absolute top-0 h-full w-full cursor-pointer rounded-xl " for={`radio${item?.key}`}> </label>
            <div className="peer-checked:border-transparent peer-checked:bg-blue-400 peer-checked:ring-2 absolute left-0 mr-4 h-8 w-8 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-400 ring-offset-2"></div>
            <span className="pointer-events-none z-10 flex ml-4 flex justify-center items-center space-x-2 ">
                <img className="w-12" src={item?.imgPayment} alt="" />
              {item?.title}</span>
                </div>
                    </>)
                })}           
            </div>
        </div> */}
    </div>
  )
}

export default InfoPayment