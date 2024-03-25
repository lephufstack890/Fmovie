<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seats extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_room',
        'nameRow',
        'seatStatus',
        'id_seatstype',
        'id_time',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class, 'id_room');
    }
    public function seatstype()
    {
        return $this->belongsTo(SeatsType::class, 'id_seatstype');
    }
    public function showtimes()
    {
        return $this->belongsToMany(Showtimes::class, 'seats_showtimes', 'seats_id', 'showtimes_id');
    }

    public function seatsdetail()
    {
        return $this->hasMany(Seats::class, 'id_seat');
    }

}
