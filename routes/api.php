<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    Auth\AuthController,
    CarController,
    InboxController,
    MessagesController
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




Route::post('/inbox' , [InboxController::class , 'create']);




Route::prefix('auth')->middleware(['tokencookie','api'])->group(function () {

    Route::prefix('messages')->group(function () {
        Route::get('/', [MessagesController::class,'index']);
        Route::post('/', [MessagesController::class,'create']);
        Route::get('recipients', [MessagesController::class,'recipients']);
        Route::get('{thread}', [MessagesController::class,'show']);
        Route::put('{thread}', [MessagesController::class,'update']);
        Route::delete('/single-msg/{message}', [MessagesController::class,'destroyMessage']);
    });



    Route::get('/car-information', [CarController::class , 'carInfo']);
    Route::get('/cars', [CarController::class , 'authIndex']);
    Route::get('/mycars', [CarController::class , 'adminCars']);
    Route::post('/add-car', [CarController::class , 'create']);
    Route::get('/single-car/{car}', [CarController::class , 'adminSingleCar']);
    Route::post('/single-car-media/{car}', [CarController::class , 'adminSingleCarMedia']);
    Route::delete('/single-car/{car}', [CarController::class , 'destroy']);
    Route::delete('/single-car-image/{car}/{photoIndex}', [CarController::class , 'destroyImage']);



    Route::get('/profile', [AuthController::class , 'profile']);
    Route::put('/update-profile', [AuthController::class , 'update']);
    Route::get('/refresh-token', [AuthController::class , 'refresh']);
    Route::post('/logout' , [AuthController::class , 'logout']);
});
