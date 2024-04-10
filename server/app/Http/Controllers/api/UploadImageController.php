<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class UploadImageController extends Controller
{
    public function upload(Request $request) {
        if ($request->hasFile('image')) {
            $file = $request->image;
            $fileName = $file->getClientOriginalName();
            $file->move('images', $file->getClientOriginalName());
            $images = 'images/' . $fileName;
            $data['image'] = $images;
        }

        return response()->json(['url' => url($data['image'])], 201);
    }
}
