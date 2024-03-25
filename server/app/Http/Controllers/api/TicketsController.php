<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TicketsResource;
use App\Models\Seats;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TicketsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tickets = Ticket::with('showtime')->get();
        return TicketsResource::collection($tickets);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Kiểm tra dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'id_user' => 'required|exists:users,id',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'id_seat' => 'required|exists:seats,id',
            'id_showtime' => 'required|exists:showtimes,id',
        ]);

        // Nếu dữ liệu không hợp lệ, trả về thông báo lỗi
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        }

        // Tạo vé mới
        $ticket = Ticket::create([
            'id_user' => $request->id_user,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'id_seat' => $request->id_seat,
            'id_showtime' => $request->id_showtime,
        ]);

        // Kiểm tra nếu vé được tạo thành công
        if ($ticket) {
            return response()->json([
                'status' => 200,
                'message' => 'Ticket successfully booked',
                'data' => $ticket
            ], 200);
        } else {
            // Nếu có lỗi khi tạo vé
            return response()->json([
                'status' => 500,
                'message' => 'Failed to book ticket'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tickets = Ticket::find($id);
        if (!$tickets) {
            return response()->json(['message' => 'Không tìm thấy ']);
        } else {
            return new TicketsResource($tickets);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tickets = Ticket::find($id);
        if (!$tickets) {
            return response()->json(['message' => 'Không tìm thấy vé ']);
        }
        $tickets->update($request->all());
        return new TicketsResource($tickets);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tickets = Ticket::find($id);
        if (!$tickets) {
            return response()->json(['message' => 'Không tìm thấy ']);
        }
        $tickets->delete();
        return response()->json(['message' => 'Xóa thành công ']);
    }
    // Trong controller TicketsController

    // Logic xử lý đặt vé
    // Logic xử lý đặt vé
    public function bookTicket(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'id_user' => 'required|exists:users,id',
            'id_seat' => 'required|exists:seats,id',
            'id_showtime' => 'required|exists:showtimes,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        }

        if (is_array($request->id_seat)) {
            // Lấy ra tất cả các ghế có id trong mảng id_seat
            $seats = Seats::whereIn('id', $request->id_seat)->get();

            // Kiểm tra trạng thái của từng ghế
            $bookedTickets = []; // Khởi tạo mảng để lưu trữ thông tin về các vé đã đặt

            foreach ($request->id_seat as $id_seat) {
                // Thêm từng ghế vào cơ sở dữ liệu
                $seat = Seats::find($id_seat);
                if ($seat->seatStatus != 'Chưa đặt') {
                    return response()->json([
                        'status' => 400,
                        'message' => 'Ghế ngồi đã được đặt trước đó'
                    ], 400);
                }

                // Tạo vé mới
                $ticket = Ticket::create([
                    'id_user' => $request->id_user,
                    'id_seat' => $id_seat,
                    'id_showtime' => $request->id_showtime,
                ]);

                // Cập nhật trạng thái của ghế ngồi
                $seat->update(['seatStatus' => 'Đã đặt']);

                // Thêm thông tin vé mới vào mảng bookedTickets
                $bookedTickets[] = $ticket;
            }

            // Trả về thông tin về tất cả các vé đã đặt
            return response()->json([
                'status' => 200,
                'message' => 'Đặt vé thành công',
                'data' => $bookedTickets // Trả về mảng bookedTickets chứa thông tin về tất cả các vé đã đặt
            ], 200);
        } else {
            // Kiểm tra trạng thái của ghế ngồi
            $seat = Seats::find($request->id_seat);
            if ($seat->seatStatus != 'Chưa đặt') {
                return response()->json([
                    'status' => 400,
                    'message' => 'Ghế ngồi đã được đặt trước đó'
                ], 400);
            }

            // Tạo vé mới
            $ticket = Ticket::create([
                'id_user' => $request->id_user,
                'id_seat' => $request->id_seat,
                'id_showtime' => $request->id_showtime,
            ]);

            // Cập nhật trạng thái của ghế ngồi
            $seat->update(['seatStatus' => 'Đã đặt']);

            // Trả về thông tin về vé đã đặt
            return response()->json([
                'status' => 200,
                'message' => 'Đặt vé thành công',
                'data' => $ticket
            ], 200);
        }
    }
}
