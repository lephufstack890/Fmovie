<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_movie',
        'id_user',
        'rate',
        'content',
        'date'
    ] ;

    public function movie()
    {
        return $this->belongsTo(Movies::class, 'id_movie');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}
