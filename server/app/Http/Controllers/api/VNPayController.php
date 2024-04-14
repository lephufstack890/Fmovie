<?php

namespace App\Http\Controllers\api;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\PaymentSuccessEmail;
use Illuminate\Support\Facades\Validator;
use App\Models\Transaction;
use Illuminate\Support\Facades\Mail;

class VNPayController extends Controller
{
    public function index(Request $request)
    {
        error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
        date_default_timezone_set('Asia/Ho_Chi_Minh');

        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = $request->input('redirect');
        $vnp_TmnCode = "QG94D41U"; //Mã website tại VNPAY 
        $vnp_HashSecret = "DVUXWKEOQEETCBUPBKHDPFFPCTQJDBKM"; //Chuỗi bí mật

        $vnp_TxnRef = $request->input('order_code'); //Mã đơn hàng. Trong thực tế Merchant cần insert đơn hàng vào DB và gửi mã này sang VNPAY
        $vnp_OrderInfo = $request->input('email');
        $vnp_OrderType = '22222';   
        $vnp_Amount = $request->input('totalPayment') * 100;
        $vnp_Locale = 'vn';
        $vnp_BankCode = $request->input('namebank');
        $vnp_Inv_Email=$request->email;
        $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];
        //Add Params of 2.0.1 Version
        // $vnp_ExpireDate = $_POST['txtexpire'];
        //Billing
        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Inv_Email"=>$vnp_Inv_Email,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
        );

        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }
        if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
            $inputData['vnp_Bill_State'] = $vnp_Bill_State;
        }

        //var_dump($inputData);
        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret); //  
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }
        $returnData = array(
            'code' => '00', 'message' => 'success', 'data' => $vnp_Url
        );
        return response()->json([
            'success' => 200,
            'link' => $returnData,
        ]);
    }

    public function callback(Request $request)
    {
        // dd($request->all());die;
        $transaction = Transaction::create([
            'id_user' => $request->input('id_user'),
            'totalQuantity' => $request->input('totalQuantity'),
            'paymentMethod' => "Chuyển khoản",
            'time' => now()->toTimeString(),
            'day_movie' => $request->input('day_movie'),
            'time_show' => $request->input('time_show'),
            'totalPayment' => $request->input('totalPayment'),
            'paymentStatus' => 'Đã thanh toán',
            'seats' => json_encode($request->input('seats')),
            'order_code' => $request->input('order_code'),
            'name_cinemas' => $request->input('name_cinemas'),
            'name_movie' => $request->input('name_movie'),
            'name_room' => $request->input('name_room'),
            'email' => $request->input('email'),
        ]);

        Mail::to($request->input('email'))->send(new PaymentSuccessEmail(
            $transaction->totalQuantity,
            $transaction->paymentMethod,
            $transaction->time,
            $transaction->day_movie,
            $transaction->time_show,
            $transaction->totalPayment,
            $transaction->paymentStatus,
            $transaction->seats,
            $transaction->order_code,
            $transaction->name_cinemas,
            $transaction->name_movie,
            $transaction->name_room,
        ));

        return response()->json([
            'message' => 'Thanh toán thành công. Vui lòng kiểm tra email!.',
        ]);

    }

    public function get_all_transaction() {
        $data = Transaction::with('user')->get();

        return response()->json([
            'data' => $data,
        ]);
    }


    public function destroy(string $id)
    {
        $transaction = Transaction::find($id);
        if(!$transaction){
            return response()->json(['message' => 'Không tìm thấy']) ;
        }
        $transaction->delete();
        return response()->json(['message' => 'Xoá thành công']) ;
    }
}
