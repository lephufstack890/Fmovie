<?php

namespace App\Http\Controllers\api;

use Illuminate\Support\Facades\DB;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\MoviesResource;
use App\Models\Movies;
use Illuminate\Support\Str;

class MoviesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $movies = Movies::with('categories', 'trailer')->get();

        // Trả về dữ liệu phim dưới dạng resource
        return MoviesResource::collection($movies);
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
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'time' => 'required|integer',
            'director' => 'required|string|max:255',
            'actor' => 'required|string|max:255',
            'releaseDate' => 'required|string|max:255',
            'language' => 'required|string|max:255',
            // 'image' => 'required|string|max:255',
            'id_trailer' => 'required|exists:trailers,id',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->image;
            $fileName = $file->getClientOriginalName();
            $file->move('images', $file->getClientOriginalName());
            $images = 'images/' . $fileName;
            $data['image'] = $images;
        }

        // Create a new movie instance with the validated data
        Movies::create([
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status,
            'time' => $request->time,
            'director' => $request->director,
            'actor' => $request->actor,
            'releaseDate' => $request->releaseDate,
            'language' => $request->language,
            'image' => url($data['image']),
            'id_trailer' => $request->id_trailer,
            'id_category' => json_encode($request->id_category),
            'id_time' => json_encode($request->id_time),
            'id_day_movie' => json_encode($request->id_day_movie),
        ]);

        return response()->json(['message' => 'Thêm phim thành công!'], 201);
    }





    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $movie = Movies::with('categories')->find($id);

        if (!$movie) {
            return response()->json(['message' => 'Không tìm thấy bộ phim'], 404);
        }

        return new MoviesResource($movie);
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
    public function update(Request $request, $id)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'time' => 'required|integer',
            'director' => 'required|string|max:255',
            'actor' => 'required|string|max:255',
            'releaseDate' => 'required|string|max:255',
            'language' => 'required|string|max:255',
            'id_trailer' => 'required|exists:trailers,id',
            // 'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Hình ảnh có thể là null và phải có định dạng hợp lệ
        ]);

        // Find the movie by ID
        $movie = Movies::findOrFail($id);

        $data = [];

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = $file->getClientOriginalName();
            $file->move('images', $fileName); // Lưu trữ hình ảnh vào thư mục 'images'
            $data['image'] = 'images/' . $fileName; // Lưu đường dẫn của ảnh vào biến data
        }

        // Update the movie with the validated data
        $movie->update([
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status,
            'time' => $request->time,
            'director' => $request->director,
            'actor' => $request->actor,
            'releaseDate' => $request->releaseDate,
            'language' => $request->language,
            'image' => isset($data['image']) ? url($data['image']) : $movie->image, // Giữ nguyên đường dẫn của ảnh nếu không có hình ảnh mới được tải lên
            'id_trailer' => $request->id_trailer,
            'id_category' => json_encode($request->id_category),
            'id_time' => json_encode($request->id_time),
            'id_day_movie' => json_encode($request->id_day_movie),
        ]);

        return response()->json(['message' => 'Cập nhật phim thành công!'], 200);
    }



    public function destroy($id)
    {
        // Find the movie by ID
        $movie = Movies::findOrFail($id);

        // Delete the movie
        $movie->delete();

        // Return a success response
        return response()->json(['message' => 'Movie deleted successfully'], 200);
    }


    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        }

        $name = $request->input('name');

        $movies = Movies::where('name', 'like', "%$name%")->get();

        if ($movies->isEmpty()) {
            return response()->json(['message' => 'Không tìm thấy phim nào có tiêu đề tương tự'], 404);
        }

        return MoviesResource::collection($movies);
    }


    /**
     * Lọc phim theo danh mục.
     *
     * @param  string  $categoryName
     * @return \Illuminate\Http\Response
     */
    public function filterByCategory($categoryName)
    {
        // Tìm danh mục theo tên
        $category = Category::where('name', $categoryName)->first();

        // Nếu không tìm thấy danh mục, trả về một thông báo lỗi
        if (!$category) {
            return response()->json(['message' => 'Không tìm thấy danh mục'], 404);
        }

        // Lọc phim theo danh mục
        $movies = Movies::whereHas('categories', function ($query) use ($category) {
            $query->where('id', $category->id);
        })->get();

        // Trả về danh sách phim dưới dạng JSON
        return MoviesResource::collection($movies);
    }



    // Các phương thức khác đã được bao gồm ở trên

    /**
     * Lọc phim theo trạng thái.
     *
     * @param  string  $status
     * @return \Illuminate\Http\Response
     */
    public function filterByStatus($status)
    {
        // Lọc phim theo trạng thái
        $movies = Movies::where('status', $status)->get();

        // Trả về danh sách phim dưới dạng JSON
        return MoviesResource::collection($movies);
    }
}
