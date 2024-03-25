<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SeatsResource;
use App\Http\Resources\SeatsTypeResource;
use App\Models\SeatsType;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class SeatsTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $seatstype = SeatsType::all();
        return SeatsTypeResource::collection($seatstype);
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
        $seatstype = SeatsType::create($request->all());
        return new SeatsTypeResource($seatstype);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $seatstype = SeatsType::find($id);
        if(!$seatstype){
            return response()->json(['message'=>'Không tìm thấy ']);
        }
        else{
            return new SeatsTypeResource($seatstype);
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
        $seatstype = SeatsType::find($id);
        if(!$seatstype){
            return response()->json(['message'=>'Không tìm thấy ']);
        }
        $seatstype->update($request->all());
        return new SeatsTypeResource($seatstype);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $seatstype = SeatsType::find($id);
        if(!$seatstype){
            return response()->json(['message'=>'Không tìm thấy ']);
        }
        $seatstype->delete();
        return response()->json(['message'=>'Xóa thành công thấy ']);
    }
}
