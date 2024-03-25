<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreaditCard extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user',
        'cardName',
        'cardNumber',
        'expirationDate',
        'securityCode',
    ] ;
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}
