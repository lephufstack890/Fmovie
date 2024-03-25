<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movies extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'time',
        'director',
        'actor',
        'releaseDate',
        'language',
        'image',
        'id_trailer',
        'id_category',
        'id_time',
        'id_day_movie',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_movie', 'movie_id', 'category_id');
    }

    public function trailer()
    {
        return $this->belongsTo(Trailers::class, 'id_trailer');
    }
}
