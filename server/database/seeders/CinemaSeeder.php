<?php

namespace Database\Seeders;

use App\Models\Cinema;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CinemaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Cinema::factory()->count(10)->create();
    }
}
