<?php

namespace App\Http\Resources;

use App\Models\Movies;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrailersResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'id_movie' => Movies::find($this->id_movie),
            'url' => $this->url,
            'dateShow' => $this->dateShow
        ];
    }
}
