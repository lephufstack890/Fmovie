<?php

namespace Database\Factories;

use App\Models\Cinema;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<Cinema>
 */
class CinemaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Cinema::class;
    public function definition(): array
    {
        return [
            'name' => $this->faker->company,
            'address' => $this->faker->address,
            'screeningRooms' => $this->faker->numberBetween(1, 10),
            'description' => $this->faker->text,
            'phoneContact' => $this->faker->phoneNumber,
            'image' => $this->faker->imageUrl(),
        ];
    }
}
