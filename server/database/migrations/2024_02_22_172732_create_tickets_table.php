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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_user')->nullable();
            $table->foreign('id_user')->references('id')->on('users');

            $table->integer('quantity');

            $table->unsignedBigInteger('id_seat')->nullable();
            $table->foreign('id_seat')->references('id')->on('seats');
            $table->unsignedBigInteger('id_showtime')->nullable();
            $table->foreign('id_showtime')->references('id')->on('showtimes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
