<?php

namespace App\Http\Controllers\api;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Transaction;

class VNPayController extends Controller
{
    public function index(Request $request)
    {
        error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED);
        date_default_timezone_set('Asia/Ho_Chi_Minh');

        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = "https://localhost/vnpay_php/vnpay_return.php";
        $vnp_TmnCode = "QG94D41U"; //Mã website tại VNPAY 
        $vnp_HashSecret = "DVUXWKEOQEETCBUPBKHDPFFPCTQJDBKM"; //Chuỗi bí mật

        $vnp_TxnRef = '123'; //Mã đơn hàng. Trong thực tế Merchant cần insert đơn hàng vào DB và gửi mã này sang VNPAY
        $vnp_OrderInfo = 'Thanh toan don hang test';
        $vnp_OrderType = '22222';
        $vnp_Amount = $request->totalPayment;
        $vnp_Locale = 'vn';
        $vnp_BankCode = 'NCB';
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
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
            // "vnp_ExpireDate" => $vnp_ExpireDate,
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
        if (isset($request->redirect)) {
            header('Location: ' . $vnp_Url);
            die();
        } else {
            echo json_encode($returnData);
        }
    }

    public function vnpaycallback(Request $request)
    {
        // Get parameters from .env
        $vnp_HashSecret = 'DVUXWKEOQEETCBUPBKHDPFFPCTQJDBKM';

        $inputData = $request->all();
        $secureHash = $inputData['vnp_SecureHash'];
        unset($inputData['vnp_SecureHash']);

        // Verify signature
        $vnp_SecureHash = hash('sha256', $vnp_HashSecret . http_build_query($inputData));
        if ($secureHash === $vnp_SecureHash) {
            // Verify success
            // Handle payment status here
            return "Payment success";
        } else {
            // Verify failed
            return "Payment failed";
        }
    }
    // public function payment(Request $request)
    // {
    //     // dd('123'); die;
    //     // Xử lý yêu cầu thanh toán và tạo URL chuyển hướng đến VNPay
    //     // Bạn cần thay đổi phần xử lý này tùy thuộc vào cách bạn triển khai thanh toán với VNPay
    //     $vnp_TmnCode = 'QG94D41U';
    //     $vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

    //     // $orderCode = $request->orderCode;
    //     $totalAmount = $request->totalAmount;

    //     // Tạo tham số cho VNPay
    //     $vnp_Params = array(
    //         'vnp_TmnCode' => $vnp_TmnCode,
    //         'vnp_Amount' => $totalAmount * 100, // Số tiền phải nhân 100 theo yêu cầu của VNPay
    //         'vnp_Command' => 'pay',
    //         'vnp_CreateDate' => date('YmdHis'),
    //         'vnp_CurrCode' => 'VND',
    //         'vnp_Locale' => 'vn',
    //         'vnp_OrderInfo' => 'Thanh toan don hang',
    //         'vnp_OrderType' => 'billpayment',
    //         'vnp_ReturnUrl' => route('vnpay.callback'),
    //         'vnp_TxnRef' => Str::random(8),
    //     );

    //     // Sắp xếp tham số cho VNPay
    //     ksort($vnp_Params);

    //     // Ghép tham số vào URL chuyển hướng đến VNPay
    //     $vnp_Url .= '?' . http_build_query($vnp_Params);

    //     return response()->json(['redirectUrl' => $vnp_Url]);
    // }
}
