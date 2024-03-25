<?php

namespace App\Http\Resources;

use App\Models\DayMovies;
use App\Models\Room;
use App\Models\Seats;
use App\Models\SeatsType;
use App\Models\TimeShows;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowtimesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $categoryNames = [];
        foreach ($this->movie->categories as $category) {
            $categoryNames[] = $category['name'];
        }

        $availableSeatsCount = $this->room->seats()->where('seatStatus', 'Chưa đặt')->count();

        // Khởi tạo mảng để lưu thông tin về các thời gian chiếu
        $timeShowsData = [];
        $dayMoviesData = [];
        // Khởi tạo mảng để lưu thông tin về các thời gian chiếu
        $seatData = [];

        // Kiểm tra xem id_time có giá trị hay không trước khi lặp
        if (isset($this->movie->id_time)) {
            foreach (json_decode($this->movie->id_time, true) as $timeId) {
                $timeShow = TimeShows::find($timeId);
                if ($timeShow != null) {
                    $rooms = Room::find($timeShow->id_room);
                    $seats = Seats::where('id_time', $timeShow->id)->get();
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
                        'name' => $timeShow->name,
                        'seat_quantities' => json_decode($timeShow->seat_quantities),
                        'room' => $rooms,
                        'seats' => $seatData,
                        'created_at' => $timeShow->created_at,
                    ];
                }
            }
        }
        if ($this->movie->id_day_movie) {
            foreach (json_decode($this->movie->id_day_movie, true) as $item) {
                $day_movie = DayMovies::find($item);

                if ($day_movie) {
                    // Thêm thông tin của thời gian chiếu vào mảng
                    $dayMoviesData[] = [
                        'day' => $day_movie->day,
                        'month_rank' => $day_movie->month_rank,
                    ];
                }
            }
        }

        return [
            'id' => $this->id,
            'cinema' => [
                'name' => $this->cinema->name,
                'address' => $this->cinema->address,
                'screeningRooms' => $this->cinema->screeningRooms,
                'description' => $this->cinema->description,
                'phoneContact' => $this->cinema->phoneContact,
                'image' => $this->cinema->image,
            ],
            'movies' => [
                'name' => $this->movie->name,
                'description' => $this->movie->description,
                'categories' => $categoryNames,
                'time' => $this->movie->time,
                'director' => $this->movie->director,
                'actor' => $this->movie->actor,
                'releaseDate' => $this->movie->releaseDate,
                'language' => $this->movie->language,
                'image' => $this->movie->image,
                'day_movies' => $dayMoviesData,
                'time_shows' => $timeShowsData, // Sử dụng mảng chứa thông tin về thời gian chiếu
            ],
        ];
    }
}
