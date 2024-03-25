<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $table = 'categories';

    protected $fillable = [
        'name',
    ];
    public function movies()
{
    return $this->belongsToMany(Movies::class, 'category_movie', 'category_id', 'movie_id');
}
}
