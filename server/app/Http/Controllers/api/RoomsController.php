<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoomsResource;
use Illuminate\Support\Facades\Validator;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rooms = Room::all();
        return RoomsResource::collection($rooms);
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
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $rooms = Room::create($request->all());
        return new RoomsResource($rooms);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $rooms = Room::find($id);
        if(!$rooms){
            return response()->json(['message' => 'Không tìm thấy danh mục']) ;
        }
        return new RoomsResource($rooms);
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
        $validator = Validator::make($request->all(), [

        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $rooms = Room::find($id);
        if(!$rooms){
            return response()->json(['message' => 'Không tìm thấy']) ;
        }
        $rooms->update($request->all());
        return new RoomsResource($rooms);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $rooms = Room::find($id);
        if(!$rooms){
            return response()->json(['message' => 'Không tìm thấy']) ;
        }
        $rooms->delete();
        return response()->json(['message' => 'Xoá thành công']) ;
    }
}
