<?php

namespace App\Http\Controllers\Auth;


use App\Http\Controllers\Controller;
use App\Mail\SocialPasswordMail;
use App\Models\{
    User,
    Car
};

use Cmgmyr\Messenger\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use App\Models\SocialAccount;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
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
           return response()->json($userValidation->errors() , Response::HTTP_UNPROCESSABLE_ENTITY);
       }



        if(!$token = Auth::attempt($userValidation->validated())){
            return  response()->json(['message' => 'Invalid Credentials!'], Response::HTTP_UNPROCESSABLE_ENTITY);
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

        $stats = [
            'cars' => Car::count(),
            'mycars' => Car::where('user_id' , Auth::id())->count(),
            'messages' => Message::where('user_id' , Auth::id())->count(),
        ];


        $social = SocialAccount::where('user_id',Auth::id())->get();

        return response()->json(['admin' => Auth::user()->only(['id','name','email']) , 'stats' => $stats , 'social' => $social]);

    }

    public function update(Request $request){


        if(!Hash::check( $request->current_password,Auth::user()->password)){
            return response()->json(['message' => "Failed Verify your Identity!"] , Response::HTTP_UNAUTHORIZED);
        }

        $updateData = [];

       if($request->has('password')){

         $request->validate([
            'password' => 'required|string|min:8'
        ]);

        $updateData['password'] = bcrypt($request->password);

       }


        if($request->has('name')){

           $request->validate([
                'name' => 'required|string|min:8'
            ]);

           $updateData['name'] = $request->name;
        }


       
        if( Auth::user()->update($updateData)){

         return response()->json(['message' => "User Information Updated!"] , Response::HTTP_OK);


        }

        return response()->json(['message' => "Failed To Update!"] , Response::HTTP_OK);


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

                $socPass = Str::random(16);

                $newUser = User::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'password' => bcrypt($socPass),

                ]);

                SocialAccount::create([
                    'provider' => $provider,
                    'provider_user_id' => $user->id,
                    'user_id' => $newUser->id
                ]);

                Mail::to($user->email)->send(new SocialPasswordMail($user->name ,$socPass));

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
