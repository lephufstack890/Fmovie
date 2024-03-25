<?php

namespace App\Http\Resources;

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
            'id_trailer' => $this->id_trailer,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
