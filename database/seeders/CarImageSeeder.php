<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CarImage;

class CarImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CarImage::factory()->times(150)->create();
    }
}
