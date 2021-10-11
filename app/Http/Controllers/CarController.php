<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Car;
use App\Http\Resources\{
    CarResource,
    AdminCarResource
};
use CarData;
use Illuminate\Support\Facades\Auth;


class CarController extends Controller
{
    public function index(){

        $cars = Car::with(['user','carImages' => function($query){
                $query->take(2);
            }])->paginate(12);


        return CarResource::collection($cars)->response()->setStatusCode(Response::HTTP_OK);
    }



    public function authIndex(){

        $cars = Car::with(['user','carImages'])->paginate(6);

      return AdminCarResource::collection($cars)->response()->setStatusCode(Response::HTTP_OK);
    }



    public function carInfo(){

        $cars = CarData::allCars();

      return response(["cars" => $cars , "years" => range(2020,1996,1)] , Response::HTTP_OK);
    }


    public function adminCars(){
      

        $cars =  Auth::user()->cars();;

      return AdminCarResource::collection($cars)->response()->setStatusCode(Response::HTTP_OK);
    }


    public function singleCar(Car $car){


        return new CarResource($car);
    }


    public function adminSingleCar(Car $car){


        return new AdminCarResource($car);
    }



    public function create(Request $request){
        $data = $request->validate([
            'make' => 'required|string',
            'model' => 'required|string',
            'year' => 'required|string|min:4',
            'show_location' => 'required|string'
        ]);

        $data["user_id"] = Auth::user()->id;

        if(Car::create($data)){
            return response("Car Added Successfully!" , Response::HTTP_CREATED);
        }

        return response("Failed To Add Car!" , Response::HTTP_BAD_REQUEST);
    }

}
