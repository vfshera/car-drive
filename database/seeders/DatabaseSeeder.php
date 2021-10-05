<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Str;

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
            'name' => "Admin",
            'email' => "admin@cardrive.com",
            'email_verified_at' => now(),
            'password' => Hash::make("123456"),
            'remember_token' => Str::random(10),
        ]);

        $this->call([
            UsersSeeder::class,
            CarSeeder::class,
            CarImageSeeder::class
        ]);

    }
}
