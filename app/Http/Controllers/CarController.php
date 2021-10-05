<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Car;


class CarController extends Controller
{
    public function index(){

        $cars = Car::with(['user','carImages'])->paginate(10);
        
        return response($cars, Response::HTTP_OK);
    }


}
