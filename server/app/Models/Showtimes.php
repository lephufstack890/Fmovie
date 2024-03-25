<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Showtimes extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_movie',
        'id_cinema',
        'showDate',
        'showTime',
        'releaseDate',
        'language',
        'id_room'
    ];

    public function movie()
    {
        return $this->belongsTo(Movies::class, 'id_movie');
    }

    public function cinema()
    {
        return $this->belongsTo(Cinema::class, 'id_cinema');
    }

    public function room()
    {
        return $this->belongsTo(Room::class, 'id_room');
    }
}

