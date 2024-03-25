<?php

namespace Database\Factories;

use App\Models\Voucher;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Voucher>
 */
class VoucherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Voucher::class;
    public function definition(): array
    {
        return [
            'code' => $this->faker->text,
            'discount' => $this->faker->text,
            'startDate' => $this->faker->date,
            'endDate' => $this->faker->date,
            'quantity' => $this->faker->numberBetween(1, 10),
            'condition' => $this->faker->randomElement(['Còn voucher', 'Hết voucher']),
        ];
    }
}
