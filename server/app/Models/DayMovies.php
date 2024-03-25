<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DayMovies extends Model
{
    use HasFactory;

    protected $fillable = [
        'day',
        'month_rank',
    ] ;
}
