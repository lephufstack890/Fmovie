<?php

namespace App\Http\Controllers\api;

use Illuminate\Console\Scheduling\Schedule;
use App\Http\Controllers\Controller;
use App\Http\Resources\SeatsResource;
use App\Models\Seats;
use App\Models\Room;
use App\Models\Showtimes;
use App\Models\Ticket;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

class SeatsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $seats = Seats::all();
        return response()->json(['seats' => $seats]);
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
        $validator = Validator::make($request->all(), [
            'id_room' => 'required|exists:rooms,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $roomId = $request->input('id_room');

        $room = Room::find($roomId);

        // Kiểm tra xem phòng có tồn tại không
        if (!$room) {
            return response()->json(['message' => 'Không tìm thấy phòng'], 404);
        }

        // Kiểm tra số lượng ghế đã được thêm vào trong phòng
        $roomSeatsCount = $room->seats()->count();

        // Tính số lượng ghế còn lại có thể được thêm vào phòng
        $remainingSeats = $room->quantity - $roomSeatsCount;

        // Kiểm tra xem có đủ ghế trống để thêm vào không
        if ($remainingSeats <= 0) {
            return response()->json(['message' => 'Phòng đã đủ số lượng ghế tối đa'], 400);
        }

        // Tạo ghế mới
        $seat = new Seats();
        $seat->fill($request->all());
        $seat->save();

        return new SeatsResource($seat);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $seats = Seats::find($id);
        if (!$seats) {
            return response()->json(['message' => 'Không tìm thấy ']);
        } else {
            return new SeatsResource($seats);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }


    public function update(Request $request, string $id)
    {
        $seats = Seats::find($id);
        if (!$seats) {
            return response()->json(['message' => 'Không tìm thấy ']);
        }
        $seats->update($request->all());
        return new SeatsResource($seats);
    }

    public function chooseSeat(Request $request)
    {
        // $validator = Validator::make($request->all(), [
        //     'id_user' => 'required|exists:users,id',
        //     'id_seat' => 'required',
        //     'id_seat.*' => 'exists:seats,id',
        //     'id_showtime' => 'required|exists:showtimes,id',
        // ]);

        // if ($validator->fails()) {
        //     return response()->json([
        //         'status' => 422,
        //         'message' => $validator->messages()
        //     ], 422);
        // }

        // Chuyển đổi id_seat thành mảng nếu nó không phải là một mảng
        $id_seat = $request->input('id_seat');
        if (!is_array($id_seat)) {
            $id_seat = [$id_seat];
        }

        // Lặp qua các ghế được chọn
        foreach ($id_seat as $seatId) {
            $seat = Seats::find($seatId);
            if (!$seat) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Ghế không tồn tại',
                ], 404);
            }

            if ($seat->seatStatus !== 'Chưa đặt') {
                return response()->json([
                    'status' => 400,
                    'message' => 'Ghế đã được đặt vui lòng chọn ghế khác', //hoặc đang giữ
                ], 400);
            }

            // Cập nhật trạng thái ghế thành "Đang giữ"
            $seat->seatStatus = 'Đã đặt';
            $seat->save();
            // Giữ ghế trong một khoảng thời gian nhất định
            // $this->holdSeats($seatId, $request->id_user);
        }

        // Trả về phản hồi thành công
        return response()->json([
            'status' => 200,
            'message' => 'Đã đặt ghế thành công',

        ], 200);
    }

    public function holdSeats($seatId, $userId)
    {
        // Đặt khóa cache
        $cacheKey = "seat_{$seatId}_user_{$userId}";

        // Thiết lập thời gian giữ ghế (đơn vị là phút)
        $holdTime = 10; // Có thể điều chỉnh theo nhu cầu

        // Lưu thời gian bắt đầu giữ ghế vào cache
        Cache::put($cacheKey, Carbon::now(), $holdTime);
    }
}
