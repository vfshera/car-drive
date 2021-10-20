<?php

namespace App\Mail;

use App\Models\Inbox;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactEmail extends Mailable 
{
    use Queueable, SerializesModels;


    protected $mailMsg;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Inbox $msg)
    {
        $this->mailMsg = $msg;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME'))
                    ->view('emails.contact-email')
                    ->with([
                        'name' => $this->mailMsg->name,
                        'email' => $this->mailMsg->email,
                        'message' => $this->mailMsg->message
                    ]);
    }
}
