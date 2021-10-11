<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    Auth\AuthController,
    CarController
};



//LARAVEL SOCIALITE SOCIAL LOGIN

Route::prefix('/social-login/authorize')->group(function (){

    Route::get('/{provider}/callback' , [AuthController::class , 'handleProvider']);
    Route::get('/{provider}/redirect' , [AuthController::class , 'redirectToProvider']);

});
// SOCIAL LOGIN END





Route::post('/login', [AuthController::class , 'login']);
Route::post('/register', [AuthController::class , 'register']);

Route::get('/cars', [CarController::class , 'index']);
Route::get('/single-car/{car}', [CarController::class , 'singleCar']);

Route::get('/car-information', [CarController::class , 'carInfo']);


Route::prefix('auth')->middleware(['tokencookie','api'])->group(function () {

    Route::post('/media', function(\Illuminate\Http\Request $request){
        dd($request->all());
    });


    Route::get('/car-information', [CarController::class , 'carInfo']);
    Route::get('/cars', [CarController::class , 'authIndex']);
    Route::get('/mycars', [CarController::class , 'adminCars']);
    Route::post('/add-car', [CarController::class , 'create']);
    Route::get('/single-car/{car}', [CarController::class , 'adminSingleCar']);


    Route::get('/profile', [AuthController::class , 'profile']);
    Route::get('/refresh-token', [AuthController::class , 'refresh']);
    Route::post('/logout' , [AuthController::class , 'logout']);
});
