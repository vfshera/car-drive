<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class UserTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    
     
    public function test_user_can_register()
    {
        $this->withExceptionHandling();

        $response = $this->post('/api/register', [            
                'name' => "Franklin",
                'email' => "frank@testing.com",
                'password' => "test123"            
            ]);
      
        
        $response->assertStatus(201);
    }

    
     
    public function test_user_can_login()
    {
        $this->withExceptionHandling();

        $response = $this->post('/api/register', [            
                'name' => "Franklin",
                'email' => "frank@testing.com",
                'password' => "test123"            
            ]);
      
        
        $response->assertStatus(201);


        $res = $this->post('/api/login',[
            'email' => "frank@testing.com",
                'password' => "test123"   
        ]);

        $res->assertStatus(200);
    }

    
     
    public function test_user_can_update_password_and_username()
    {
        $this->withExceptionHandling();

        $response = $this->post('/api/register', [            
                'name' => "Franklin",
                'email' => "frank@testing.com",
                'password' => "12345678"            
            ]);
      
        
        $response->assertStatus(201);

        $user = User::findOrFail(1);


        $res = $this->actingAs($user)->put('/api/auth/update-profile',[
                'name' => "Franklin Shera",
                'password' => "newpassword",  
                'current_password' => "12345678"   
        ]);

        $res->assertStatus(200);
    }

}
