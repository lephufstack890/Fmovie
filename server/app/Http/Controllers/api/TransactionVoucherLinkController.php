<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionVoucherLinkResource;
use App\Models\TransactionVoucherLink;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class TransactionVoucherLinkController extends Controller
{
    public function index()
    {
        $transactionvoucher = TransactionVoucherLink::all();
        return TransactionVoucherLinkResource::collection($transactionvoucher);
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
        $transactionvoucher = TransactionVoucherLink::create($request->all());
        return new TransactionVoucherLinkResource($transactionvoucher);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $transactionvoucher = TransactionVoucherLink::find($id);
        if(!$transactionvoucher){
            return response()->json(['message' => 'Không tìm thấy danh mục']) ;
        }
        return new TransactionVoucherLinkResource($transactionvoucher);
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
        $transactionvoucher = TransactionVoucherLink::find($id);
        if(!$transactionvoucher){
            return response()->json(['message' => 'Không tìm thấy']) ;
        }
        $transactionvoucher->update($request->all());
        return new TransactionVoucherLinkResource($transactionvoucher);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $transactionvoucher = TransactionVoucherLink::find($id);
        if(!$transactionvoucher){
            return response()->json(['message' => 'Không tìm thấy']) ;
        }
        $transactionvoucher->delete();
        return response()->json(['message' => 'Xoá thành công']) ;
    }
}
