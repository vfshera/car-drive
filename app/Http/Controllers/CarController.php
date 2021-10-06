<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Car;
use App\Http\Resources\CarResource;


class CarController extends Controller
{
    public function index(){

        $cars = Car::with(['user','carImages'])->paginate(12);
        
        return CarResource::collection($cars)->response()->setStatusCode(Response::HTTP_OK);
    }


    public function singleCar(Car $car){

        
        return new CarResource($car);
    }


}
