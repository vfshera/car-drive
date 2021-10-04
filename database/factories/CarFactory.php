<?php

namespace Database\Factories;

use App\Models\Car;
use Illuminate\Database\Eloquent\Factories\Factory;

class CarFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Car::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        $carWithModel = \CarData::getCarWithModel();

        return [
            'make' => $carWithModel[0],
            'model' => $carWithModel[1],
            'year' => $this->faker->biasedNumberBetween(1998,2020, 'sqrt'),
            'show_location'=> $this->faker->randomFloat($nbMaxDecimals = 4, $min = 0, $max = 20).",".$this->faker->randomFloat($nbMaxDecimals = 4, $min = 0, $max = 20)
        ];
    }
}
