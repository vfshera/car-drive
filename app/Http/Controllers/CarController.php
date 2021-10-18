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
            }])->latest()->paginate(12);


        return CarResource::collection($cars)->response()->setStatusCode(Response::HTTP_OK);
    }



    public function authIndex(){

        $cars = Car::with(['user','carImages'])->latest()->paginate(6);

      return AdminCarResource::collection($cars)->response()->setStatusCode(Response::HTTP_OK);
    }



    public function carInfo(){

        $cars = CarData::allCars();

      return response(["cars" => $cars , "years" => range(2020,1996,1)] , Response::HTTP_OK);
    }


    public function adminCars(){
      

        $cars =  Auth::user()->cars();

      return AdminCarResource::collection($cars)->response()->setStatusCode(Response::HTTP_OK);
    }


    public function singleCar(Car $car){


        return new CarResource($car);
    }


    public function adminSingleCar(Car $car){
        
        return new AdminCarResource($car);
    }

    public function adminSingleCarMedia(Request $request ,Car $car){

        $request->validate([
            'photo' => 'required|file|image|mimes:jpg,webp,png'
        ]);


        if($request->hasFile('photo')){
            $car->addMediaFromRequest('photo')->sanitizingFileName(function($fileName) {
                return strtolower(str_replace(['#', '/', '\\', ' '], '-', $fileName));
             })->toMediaCollection('car-photos');
        }

        
        return response("Photo Added Successfully!" , Response::HTTP_CREATED);
    }



    public function create(Request $request){       

        $data = $request->validate([
            'make' => 'required|string',
            'model' => 'required|string',
            'year' => 'required|string|min:4',
            'show_location' => 'required|string',
        ]);

        $data["user_id"] = Auth::user()->id;


        $car = Car::create($data);

        if(!$car){
          return response("Failed To Add Car!" , Response::HTTP_BAD_REQUEST);
        }


        if($request->hasFile('photo')){
            $car->addMediaFromRequest('photo')->sanitizingFileName(function($fileName) {
                return strtolower(str_replace(['#', '/', '\\', ' '], '-', $fileName));
             })->toMediaCollection('car-photos');
        }


        
        return response("Car Added Successfully!" , Response::HTTP_CREATED);
    }








    public function destroy(Car $car){

        if($car->delete()){
       
            return response("Car Deleted Successfully!" , Response::HTTP_OK);

        }

        return response("Failed To delete Car!" , Response::HTTP_BAD_REQUEST);

    }




    public function destroyImage(Car $car , $photoIndex){


        $photos = $car->getMedia('car-photos');

        if($photos[$photoIndex]->delete()){
       
            return response("Car Image Deleted Successfully!" , Response::HTTP_OK);

        }

        return response("Failed To delete Car Image!" , Response::HTTP_BAD_REQUEST);

    }

}
