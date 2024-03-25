<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\SeatsResources;

class TicketsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'id_user' => $this->id_user,
            'id_seat' => $this->id_seat,
            'id_showtime' => $this->id_showtime,
            'showtime' => $this->showtime->showTime,
            'showTime' => $this->showtime->showDate,
            'language' => $this->showtime->language,
            'nameroom' => $this->showtime->room->name,
            // 'seats' => $this->seat,
            'seat_type' => $this->seat->seatstype->name, // Chỉ lấy trường 'name' của 'seatstype'
            'price' => $this->seat->seatstype->price, // Chỉ lấy trường 'name' của 'seatstype'
            'nameRow' => $this->seat->nameRow, // Chỉ lấy trường 'name' của 'seatstype'
        ];
    }
}
