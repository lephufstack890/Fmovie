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
    public $seats;
    public $order_code;
    public $name_cinemas;
    public $name_movie;
    public $name_room;

    public function __construct($totalQuantity, $paymentMethod, $time, $totalPayment, $paymentStatus, $seats, $order_code, $name_cinemas, $name_movie, $name_room)
    {
        $this->totalQuantity = $totalQuantity;
        $this->paymentMethod = $paymentMethod;
        $this->time = $time;
        $this->totalPayment = $totalPayment;
        $this->paymentStatus = $paymentStatus;
        $this->seats = $seats;
        $this->order_code = $order_code;
        $this->name_cinemas = $name_cinemas;
        $this->name_movie = $name_movie;
        $this->name_room = $name_room;
    }

    public function build()
    {
        return $this->view('emails.payment_success');
    }
}
