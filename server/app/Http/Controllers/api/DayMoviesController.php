<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\DayMovies;
use Illuminate\Http\Request;

class DayMoviesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all DayMovies from the database
        $dayMovies = DayMovies::all();

        // Check if any DayMovies were found
        if ($dayMovies->isEmpty()) {
            return response()->json(['message' => 'No day movies found'], 404);
        }

        // Return the DayMovies as JSON response
        return response()->json(['data' => $dayMovies], 200);
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
            'day' => 'required|integer',
            'month_rank' => 'required|string|max:255',
        ]);

        // Create a new DayMovies instance with the validated data
        $dayMovie = DayMovies::create([
            'day' => $validatedData['day'],
            'month_rank' => $validatedData['month_rank'],
        ]);

        // Return a response indicating success or failure
        if ($dayMovie) {
            return response()->json(['message' => 'Day movie created successfully'], 201);
        } else {
            return response()->json(['message' => 'Failed to create day movie'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $dayMovies = DayMovies::find($id);
        if (!$dayMovies) {
            return response()->json(['message' => 'Không tìm thấy ']);
        } else {
            return response()->json(['data' => $dayMovies], 200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DayMovies $dayMovies)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $dayMovies = DayMovies::find($id);
        if (!$dayMovies) {
            return response()->json(['message' => 'Không tìm thấy ']);
        }
        $dayMovies->update($request->all());
        return response()->json(['message' => 'Day movie updated successfully'], 200);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dayMovies = DayMovies::find($id);
        if(!$dayMovies){
            return response()->json(['message' => 'Không tìm thấy']) ;
        }
        $dayMovies->delete();
        return response()->json(['message' => 'Day movie deleted successfully']) ;
    }
}
