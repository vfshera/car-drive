<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => "Franklin Shera",
            'email' => "me@sc.com",
            'password' => Hash::make("123456")
        ]);



        $this->call([
            CarSeeder::class,
            CarImageSeeder::class
        ]);


    }
}
