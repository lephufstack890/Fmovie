<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;
use App\Http\Resources\VoucherResource;
use App\Models\Voucher;
use Illuminate\Http\Request;

class VoucherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $voucher = Voucher::all();
        return VoucherResource::collection($voucher);
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
        $voucher = Voucher::create($request->all());
        return new VoucherResource($voucher);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $voucher = Voucher::find($id);
        if(!$voucher){
            return response()->json(['message'=>'Không tìm thấy voucher']);
        }
        else{
            return new VoucherResource($voucher);
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
        $voucher = Voucher::find($id);
        if(!$voucher){
            return response()->json(['message'=>'Không tìm thấy voucher']);
        }
        $voucher->update($request->all());
        return new VoucherResource($voucher);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $voucher = Voucher::find($id);
        if(!$voucher){
            return response()->json(['message'=>'Không tìm thấy voucher']);
        }
        $voucher->delete();
        return response()->json(['message'=>'Xóa thành công voucher']);
    }
}
