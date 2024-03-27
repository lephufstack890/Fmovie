<?php

namespace App\Http\Resources;

use App\Models\DayMovies;
use App\Models\Room;
use App\Models\Seats;
use App\Models\SeatsType;
use App\Models\TimeShows;
use App\Models\Trailers;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MoviesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        $categoryIds = [];
        foreach ($this->categories as $category) {
            $categoryIds[] = $category['id'];
        }

        // Khởi tạo mảng để lưu thông tin về các thời gian chiếu
        $timeShowsData = [];
        $dayMoviesData = [];
        // Khởi tạo mảng để lưu thông tin về các thời gian chiếu
        $seatData = [];

        // Kiểm tra xem id_time có giá trị hay không trước khi lặp
        if (isset($this->id_time)) {
            foreach (json_decode($this->id_time, true) as $timeId) {
                $timeShow = TimeShows::find($timeId);
                if ($timeShow != null) {
                    $rooms = Room::find($timeShow->id_room);
                    $seats = Seats::where('id_time', $timeShow->id)->get();
                    $available_seats = Seats::where([
                        'id_time' => $timeShow->id,
                        'seatStatus' => 'Chưa đặt'
                    ])->count();
                }
                if (isset($timeShow)) {
                    // Thêm thông tin của thời gian chiếu vào mảng
                    foreach ($seats as $seat) {
                        $seatType = SeatsType::find($seat->id_seatstype);
                        if ($seatType) {
                            $seatData[] = [
                                'id' => $seat->id,
                                'nameRow' => $seat->nameRow,
                                'seatStatus' => $seat->seatStatus,
                                'seatType' => [
                                    'name' => $seatType->name,
                                    'price' => $seatType->price,
                                ],
                            ];
                        }
                    }
                    $timeShowsData[] = [
                        'id' => $timeShow->id,
                        'available_seats' => $available_seats,
                        'name' => $timeShow->name,
                        'seat_quantities' => json_decode($timeShow->seat_quantities),
                        'room' => $rooms,
                        'seats' => $seatData,
                        'created_at' => $timeShow->created_at,
                    ];
                }
            }
        }
        if ($this->id_day_movie) {
            foreach (json_decode($this->id_day_movie, true) as $item) {
                $day_movie = DayMovies::find($item);

                if ($day_movie) {
                    // Thêm thông tin của thời gian chiếu vào mảng
                    $dayMoviesData[] = [
                        'id' =>  $day_movie->id,
                        'day' => $day_movie->day,
                        'month_rank' => $day_movie->month_rank,
                    ];
                }
            }
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'time' => $this->time,
            'status' => $this->status,
            'director' => $this->director,
            'actor' => $this->actor,
            'releaseDate' => $this->releaseDate,
            'language' => $this->language,
            'id_category' => $categoryIds,
            'detail' => [
                'trailer_url' => $this->trailer->url,
                'categories' => $this->categories,
            ],
            'image' => $this->image,
            'trailer' => Trailers::find($this->id_trailer),
            'day_movies' => $dayMoviesData,
            'time_shows' => $timeShowsData, // Sử dụng mảng chứa thông tin về thời gian chiếu
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
