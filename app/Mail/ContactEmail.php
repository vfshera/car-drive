<?php

namespace App\Mail;

use App\Models\Inbox;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactEmail extends Mailable implements  ShouldQueue
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
        

        return $this->from($this->mailMsg->email,$this->mailMsg->name." Sent a message!")                    
                     ->subject($this->mailMsg->name." (".$this->mailMsg->email.")")
                    ->view('emails.contact-email')
                    ->with([
                        'name' => $this->mailMsg->name,
                        'msgContent' => $this->mailMsg->message
                    ]);
    }
}
