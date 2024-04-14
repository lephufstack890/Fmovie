<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_user',
        'totalQuantity',
        'paymentMethod',
        'time',
        'totalPayment',
        'paymentStatus',
        'order_code',
        'seats',
        'name_cinemas',
        'name_movie',
        'name_room',
        'day_movie',
        'time_show'
    ] ;

    public function user()
    {
        return $this->belongsTo(User::class,'id_user');
    }
}
