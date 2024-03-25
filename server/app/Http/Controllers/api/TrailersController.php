<?php

namespace App\Http\Controllers\api;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use App\Http\Resources\TrailersResource;
use App\Models\Trailers;
use Illuminate\Http\Request;

class TrailersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $trailers = Trailers::all();
        return TrailersResource::collection($trailers);
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
        $trailers = Trailers::create($request->all());
        return new TrailersResource($trailers);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $trailers = Trailers::find($id);
        if(!$trailers){
            return response()->json(['message' => 'Không tìm thấy danh mục']) ;
        }
        return new TrailersResource($trailers);
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
        $trailers = Trailers::find($id);
        if(!$trailers){
            return response()->json(['message' => 'Không tìm thấy']) ;
        }
        $trailers->update($request->all());
        return new TrailersResource($trailers);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $trailers = Trailers::find($id);
        if(!$trailers){
            return response()->json(['message' => 'Không tìm thấy']) ;
        }
        $trailers->delete();
        return response()->json(['message' => 'Xoá thành công']) ;
    }
}
