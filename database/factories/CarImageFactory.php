<?php

namespace Database\Factories;

use App\Models\CarImage;
use Illuminate\Database\Eloquent\Factories\Factory;

class CarImageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = CarImage::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'car_id' => rand(1 ,100),
            'filename' => $this->faker->imageUrl,
        ];
    }
}
