<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionVoucherLink extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_voucher',
        'id_transaction',
        'quantity'
    ] ;

    public function voucher()
    {
        return $this->belongsTo(Voucher::class, 'id_voucher');
    }
    public function transaction()
    {
        return $this->belongsTo(Transaction::class, 'id_transaction');
    }
}
