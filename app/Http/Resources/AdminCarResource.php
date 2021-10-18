<?php

namespace App\Http\Resources;

use Cmgmyr\Messenger\Models\Participant;
use Cmgmyr\Messenger\Models\Thread;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class AdminCarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $thread = Thread::all()->filter(function($thread){
            return in_array($this->user->id , $thread->participantsUserIds()) && in_array(Auth::id() , $thread->participantsUserIds());
        })->first();

        return [
            'id' => $this->id,
            'make' => $this->make,
            'model' => $this->model,
            'year' => $this->year,
            'slug' => $this->slug,
            'photos' => CarPhotoResource::collection($this->photos),
            'show_location' => $this->show_location,
            'created_at' => $this->created_at,
            'user' => new UserResource($this->user),
            'threadID' =>  $thread->id ?? null
        ];
    }
}
