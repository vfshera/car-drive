<?php

 function respondWithToken($token){

    $tokenLife = env('JWT_TTL') ??  10;

    $tokenCookie = cookie('access_token',
        $token ,
        $tokenLife,
        null,
        null,
        true,
        true,
        false,
        null);

        $issue_time =  time();

    return response()->json(['message' => "Success!" , "tst" => $issue_time , "overtime" => $tokenLife] , 200)->withCookie($tokenCookie);


}