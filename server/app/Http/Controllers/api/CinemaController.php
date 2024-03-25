<?php

namespace App\Http\Controllers\api;

use App\Models\Cinema;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CinemaResource;
use Illuminate\Support\Facades\Validator;

class CinemaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cinema = Cinema::all();
        return CinemaResource::collection($cinema);
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
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'screeningRooms' => 'required|integer|min:1',
            'description' => 'required|string',
            'phoneContact' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $cinema = Cinema::create($request->all());
        return new CinemaResource($cinema);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $cinema = Cinema::find($id);
        if(!$cinema){
            return response()->json(['message' => 'Không tìm thấy rạp']) ;
        }
        return new CinemaResource($cinema);
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
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'screeningRooms' => 'required|integer|min:1',
            'description' => 'required|string',
            'phoneContact' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $cinema = Cinema::find($id);
        if(!$cinema){
            return response()->json(['message' => 'Không tìm thấy rạp']) ;
        }
        $cinema->update($request->all());
        return new CinemaResource($cinema);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cinema = Cinema::find($id);
        if(!$cinema){
            return response()->json(['message' => 'Không tìm thấy rạp']) ;
        }
        $cinema->delete();
        return response()->json(['message' => 'Xoá rạp thành công']) ;
    }
}
