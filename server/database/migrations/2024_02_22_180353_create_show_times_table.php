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
        Schema::create('showtimes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_movie')->nullable();
            $table->foreign('id_movie')->references('id')->on('movies');
            $table->unsignedBigInteger('id_cinema')->nullable();
            $table->foreign('id_cinema')->references('id')->on('cinemas');

            $table->date('showDate');
            $table->time('showTime');
            $table->date('releaseDate');
            $table->string('language');
            
            $table->unsignedBigInteger('id_room')->nullable();
            $table->foreign('id_room')->references('id')->on('rooms');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('showtimes');
    }
};