<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeShows extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_room',
        'name',
        'seat_quantities',
    ];
}
