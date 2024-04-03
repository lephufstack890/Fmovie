<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
{
    $seatsArray = [];

    foreach ($this->seats as $seat) {
        $seatsArray[] = [
            'id'=>$seat['id'],
            'nameRow' => $seat->nameRow,
            'seatStatus' => $seat->seatStatus,
            'seatsType' => $seat->seatstype->name
        ];
    }

    return [
        'id' => $this->id,
        'cinema' => [
            'id' => $this->cinema->id,
            'name' => $this->cinema->name,
            'address' => $this->cinema->address,
            'description' => $this->cinema->description,
            'phoneContact' => $this->cinema->phoneContact,
            'image' => $this->cinema->image,
        ],
        'name_room' => $this->name,
        'seats' => $seatsArray,
    ];
}

}
