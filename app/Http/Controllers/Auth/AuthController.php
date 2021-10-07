<?php

namespace App\Http\Controllers\Auth;


use App\Http\Controllers\Controller;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use App\Models\SocialAccount;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;



class AuthController extends Controller
{
   public function __construct(){

       $this->middleware('tokencookie' , ['except' => ['login','register'] ]);

   }



    public function login(Request $request){

       $userValidation = Validator::make($request->all(),[
           'email' => 'required|email',
           'password' => 'required|string|min:6'
       ]);

       if($userValidation->fails()){
           return response()->json($userValidation->errors() , Response::HTTP_BAD_REQUEST);
       }



        if(!$token = Auth::attempt($userValidation->validated())){
            return  response()->json(['error' => 'Invalid Credentials!'], Response::HTTP_BAD_REQUEST);
        }

        return respondWithToken($token);

    }



    public function register(Request $request){

        $userValidation = Validator::make($request->all(),[
            'name' => 'required|string|between:2,100',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6'
        ]);


        if($userValidation->fails()){
            return response()->json($userValidation->errors() , Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        User::create(
            array_merge(
                $userValidation->validated(),
                ['password' => bcrypt($request->password)]
            )
        );

        return response()->json(['message' => "User Created!"] , Response::HTTP_CREATED);


    }



    public function profile(){



        return response()->json(['admin' => Auth::user()->only(['id','name','email'])]);

    }






    public function logout(){

        Auth::logout();

       return response()->json(['message' => "Logged Out!"] , Response::HTTP_OK);

    }


    public function refresh(Request $request){

       try{

           $newToken = Auth::refresh();

           return respondWithToken($newToken);


       }catch(\Exception $e){

          return  response()->json(['error' => $e->getMessage()] , Response::HTTP_UNAUTHORIZED);

       }

    }



    // SOCIAL LOGIN




    public function redirectToProvider($provider){

        $url = Socialite::driver($provider)->stateless()->redirect()->getTargetUrl();

        return response()->json(["url" => $url]);

    }



    public function handleProvider($provider){


            $user = Socialite::driver($provider)->stateless()->user();




            if(!$user->token){
                return response()->json([ "message" => "User Not Found!"]);
            }


            $existingUser = User::whereEmail($user->email)->first();




            if(!$existingUser){

               // create User and add provider

                $newUser = User::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'password' => bcrypt(Str::random(16)),

                ]);

                SocialAccount::create([
                    'provider' => $provider,
                    'provider_user_id' => $user->id,
                    'user_id' => $newUser->id
                ]);


                //LOGIN OUR USER AND SEND TOKEN
               return $this->socialLogin($newUser);


            }else{

                //  we have a client if this runs

                $existingProvider = SocialAccount::where('provider' , $provider)->first();


                if(!$existingProvider){

                    SocialAccount::create([
                        'provider' => $provider,
                        'provider_user_id' => $user->id,
                        'user_id' => $existingUser->id
                    ]);

                }


               return $this->socialLogin($existingUser);

            }

    }




    public function socialLogin(User $user){


        $token = auth()->login($user , $remember = true);


        if(!$token){

            return  response()->json(['error' => 'Social Login Failed!'], Response::HTTP_BAD_REQUEST);
        }


        return respondWithToken($token);

    }




}
