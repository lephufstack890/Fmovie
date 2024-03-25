<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ShowtimesResource;
use App\Models\Movies;
use App\Models\Showtimes;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ShowtimesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $showtimes = Showtimes::all();
        return ShowtimesResource::collection($showtimes);
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
        $validator = Validator::make($request->all(), []);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $showtimes = Showtimes::create($request->all());
        return new ShowtimesResource($showtimes);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $showtimes = Showtimes::find($id);
        if (!$showtimes) {
            return response()->json(['message' => 'Không tìm thấy danh mục']);
        }
        return new ShowtimesResource($showtimes);
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
        $validator = Validator::make($request->all(), []);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
        $showtimes = Showtimes::find($id);
        if (!$showtimes) {
            return response()->json(['message' => 'Không tìm thấy']);
        }
        $showtimes->update($request->all());
        return new ShowtimesResource($showtimes);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $showtimes = Showtimes::find($id);
        if (!$showtimes) {
            return response()->json(['message' => 'Không tìm thấy']);
        }
        $showtimes->delete();
        return response()->json(['message' => 'Xoá thành công']);
    }
    public function filterByDate($id)
    {
        // Query the database to filter movies by id_day_movie
        $movies = Movies::whereJsonContains('id_day_movie', [(int) $id])->get();

        $showtimes = [];
        foreach ($movies as $item) {
            $showtimes[] = Showtimes::where('id_movie', $item->id)->get();
        }

        return ShowtimesResource::collection(collect($showtimes)->flatten());
    }
}
