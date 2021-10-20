<?php

namespace App\Http\Controllers;

use App\Mail\ContactEmail;
use App\Models\Inbox;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class InboxController extends Controller
{
    
    public function create(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string',
            'message' => 'required|string'
        ]);


        $senderMsg = Inbox::create($data);

        if($senderMsg){
            
            Mail::to(env('MAIL_FROM_ADDRESS'))->send(new ContactEmail($senderMsg));

            return response('Message Sent Successfully',201);

        }

        return response('Failed to send message',400);
    }
}
