<?php

namespace App\Http\Controllers\api;

use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\TransactionResource;
use App\Mail\PaymentSuccessEmail;
use Illuminate\Support\Facades\Mail;

class TransactionController extends Controller
{
    public function Payment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_user' => 'nullable|exists:users,id',
            'totalQuantity' => 'required|integer',
            'paymentMethod' => 'required',
            'totalPayment' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $transaction = Transaction::create([
            'id_user' => $request->input('id_user'),
            'totalQuantity' => $request->input('totalQuantity'),
            'paymentMethod' => $request->input('paymentMethod'),
            'time' => now()->toTimeString(),
            'totalPayment' => $request->input('totalPayment'),
            'paymentStatus' => 'Chưa thanh toán',
        ]);

        if($request->input('paymentMethod') === "Chuyển khoản"){
            Mail::to($request->email)->send(new PaymentSuccessEmail(
                $transaction->totalQuantity,
                $transaction->paymentMethod,
                $transaction->time,
                $transaction->totalPayment,
                $transaction->paymentStatus,
            ));
    
            return response()->json([
                'message' => 'Thanh toán thành công. Email thông báo đã được gửi.',
            ]);
        }else {
            return response()->json([
                'code' => 201,
                'message' => 'Đơn hàng đang chờ duyệt',
            ]);
        }
    }

    public function UpdatePayment(Request $request)
    {
        // Lấy ID của người dùng và trạng thái thanh toán từ request
        $id = $request->input('id');
        $paymentStatus = $request->input('paymentStatus');

        $transaction = Transaction::where('id', $id)->first();

        if (!$transaction || !$paymentStatus) {
            return response()->json(['error' => 'Không tìm thấy giao dịch hoặc trạng thái thanh toán không hợp lệ.'], 404);
        }

        $transaction->paymentStatus = $paymentStatus;
        $transaction->save();

        Mail::to($request->email)->send(new PaymentSuccessEmail(
            $transaction->totalQuantity,
            $transaction->paymentMethod,
            $transaction->time,
            $transaction->totalPayment,
            $transaction->paymentStatus,
        ));

        return response()->json([
            'message' => 'Cập nhật trạng thái thanh toán thành công. Email thông báo đã được gửi.',
        ]);
    }
}
