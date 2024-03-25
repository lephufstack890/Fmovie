<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_user')->nullable();
            $table->foreign('id_user')->references('id')->on('users');
            
            $table->integer('totalQuantity');
            $table->enum('paymentMethod', ['Tiền mặt', 'Chuyển khoản']);
            $table->time('time', $precision = 0);
            $table->decimal('totalPayment', 10, 0);
            $table->enum('paymentStatus', ['Đã thanh toán', 'Chưa thanh toán']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
