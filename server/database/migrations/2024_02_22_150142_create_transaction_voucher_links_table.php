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
        Schema::create('transaction_voucher_links', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_voucher')->nullable();
            $table->foreign('id_voucher')->references('id')->on('vouchers');
            
            $table->unsignedBigInteger('id_transaction')->nullable();
            $table->foreign('id_transaction')->references('id')->on('transactions');
            $table->integer('quantity');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_voucher_links');
    }
};
