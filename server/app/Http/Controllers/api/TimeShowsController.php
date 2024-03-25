<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\Seats;
use App\Models\SeatsType;
use App\Models\TimeShows;
use Illuminate\Http\Request;

class TimeShowsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        // Validate the incoming request data
        $validatedData = $request->validate([
            'id_room' => 'required|exists:rooms,id',
            'name' => 'required|string|max:255',
            // 'seat_quantities' => 'json', // Bạn có thể comment điều kiện này nếu không cần thiết
        ]);

        // Convert seat quantities array to JSON string
        $seatQuantities = json_encode($request->seat_quantities);

        // Create a new TimeShows instance with the validated data
        $timeShow = TimeShows::create([
            'id_room' => $request->id_room,
            'name' => $request->name,
            'seat_quantities' => $seatQuantities, // Lưu mảng seat_quantities dưới dạng chuỗi JSON
        ]);

        // Kiểm tra xem mảng 'seatQuantities' có dữ liệu hay không
        if (!empty($request->seat_quantities)) {
            // Convert seat quantities JSON to associative array
            $seatQuantities = json_decode($seatQuantities, true);

            // Define seat type IDs corresponding to 'regular', 'double', and 'vip' seats
            $seatTypeIDs = [
                'regular' => 1,
                'vip' => 2,
                'double' => 3
            ];

            // Create seats based on seat quantities
            foreach ($seatQuantities as $seatType => $quantity) {
                // Define the nameRow abbreviation based on seat type
                $nameRowAbbreviation = '';
                if ($seatType == 'regular') {
                    $nameRowAbbreviation = 'T';
                } elseif ($seatType == 'vip') {
                    $nameRowAbbreviation = 'V';
                } elseif ($seatType == 'double') {
                    $nameRowAbbreviation = 'D';
                }

                // Create seats
                for ($i = 0; $i < $quantity; $i++) {
                    Seats::create([
                        'id_room' => $request->id_room,
                        'nameRow' => $nameRowAbbreviation, // Assign nameRow abbreviation
                        'seatStatus' => "Chưa đặt", // You may need to adjust this based on your requirements
                        'id_seatstype' => $seatTypeIDs[$seatType], // Assign seat type ID
                        'id_time' => $timeShow->id,
                    ]);
                }
            }
        }

        // Return a response indicating success or failure
        if ($timeShow) {
            return response()->json(['message' => 'Time show created successfully'], 201);
        } else {
            return response()->json(['message' => 'Failed to create time show'], 500);
        }
    }




    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $timeShowsData = [];
        // Find the TimeShow by ID
        $timeShow = TimeShows::find($id);

        // Check if the TimeShow exists
        if (!$timeShow) {
            return response()->json(['message' => 'TimeShow not found'], 404);
        }

        if ($timeShow != null) {
            $rooms = Room::find($timeShow->id_room);
            $seats = Seats::where('id_time', $timeShow->id)->get();
        }

        if (isset($timeShow)) {
            // Thêm thông tin của thời gian chiếu vào mảng
            foreach ($seats as $seat) {
                $seatType = SeatsType::find($seat->id_seatstype);
                if ($seatType) {
                    $seatData[] = [
                        'nameRow' => $seat->nameRow,
                        'seatStatus' => $seat->seatStatus,
                        'seatType' => [
                            'name' => $seatType->name,
                            'price' => $seatType->price,
                        ],
                    ];
                }
            }
            $timeShowsData[] = [
                'name' => $timeShow->name,
                'seat_quantities' => json_decode($timeShow->seat_quantities),
                'room' => $rooms,
                'seats' => $seatData,
                'created_at' => $timeShow->created_at,
            ];
        }

        // Return the detailed information of the specified TimeShow
        return response()->json(['data' => $timeShowsData], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TimeShows $timeShows)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'id_room' => 'required|exists:rooms,id',
            'name' => 'required|string|max:255',
            // 'seat_quantities' => 'json', // Bạn có thể comment điều kiện này nếu không cần thiết
        ]);

        // Tìm thời gian chiếu cần cập nhật
        $timeShow = TimeShows::findOrFail($id);

        // Convert seat quantities array to JSON string
        $seatQuantities = json_encode($request->seat_quantities);

        // Cập nhật thông tin của thời gian chiếu
        $timeShow->id_room = $request->id_room;
        $timeShow->name = $request->name;
        $timeShow->seat_quantities = $seatQuantities; // Lưu mảng seat_quantities dưới dạng chuỗi JSON

        // Lưu các thay đổi vào cơ sở dữ liệu
        $updated = $timeShow->save();

        // Kiểm tra xem thời gian chiếu đã được cập nhật thành công hay không
        Seats::where('id_time', $timeShow->id)->delete();
        if ($updated) {
            // Xóa tất cả các ghế của thời gian chiếu trước khi tạo lại

            // Kiểm tra xem mảng 'seatQuantities' có dữ liệu hay không
            if (!empty($request->seat_quantities)) {
                // Convert seat quantities JSON to associative array
                $seatQuantities = json_decode($seatQuantities, true);

                // Define seat type IDs corresponding to 'regular', 'double', and 'vip' seats
                $seatTypeIDs = [
                    'regular' => 1,
                    'vip' => 2,
                    'double' => 3
                ];

                // Create seats based on seat quantities
                foreach ($seatQuantities as $seatType => $quantity) {
                    // Define the nameRow abbreviation based on seat type
                    $nameRowAbbreviation = '';
                    if ($seatType == 'regular') {
                        $nameRowAbbreviation = 'T';
                    } elseif ($seatType == 'vip') {
                        $nameRowAbbreviation = 'V';
                    } elseif ($seatType == 'double') {
                        $nameRowAbbreviation = 'D';
                    }

                    // Create seats
                    for ($i = 0; $i < $quantity; $i++) {
                        Seats::create([
                            'id_room' => $request->id_room,
                            'nameRow' => $nameRowAbbreviation, // Assign nameRow abbreviation
                            'seatStatus' => "Chưa đặt", // You may need to adjust this based on your requirements
                            'id_seatstype' => $seatTypeIDs[$seatType], // Assign seat type ID
                        ]);
                    }
                }
            }

            return response()->json(['message' => 'Time show updated successfully'], 200);
        } else {
            return response()->json(['message' => 'Failed to update time show'], 500);
        }
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Tìm thời gian chiếu cần xóa
        $timeShow = TimeShows::findOrFail($id);


        // Xóa tất cả các ghế liên quan
        Seats::where('id_time', $timeShow->id)->delete();

        // Xóa thời gian chiếu
        $deleted = $timeShow->delete();

        // Kiểm tra xem thời gian chiếu đã được xóa thành công hay không
        if ($deleted) {
            return response()->json(['message' => 'Time show deleted successfully'], 200);
        } else {
            return response()->json(['message' => 'Failed to delete time show'], 500);
        }
    }
}
