<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PaymentSuccessEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $totalQuantity;
    public $paymentMethod;
    public $time;
    public $totalPayment;
    public $paymentStatus;

    public function __construct($totalQuantity, $paymentMethod, $time, $totalPayment, $paymentStatus)
    {
        $this->totalQuantity = $totalQuantity;
        $this->paymentMethod = $paymentMethod;
        $this->time = $time;
        $this->paymentStatus = $paymentStatus;
        $this->totalPayment = $totalPayment;
    }

    public function build()
    {
        return $this->view('emails.payment_success');
    }
}
