<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class ChatThreadViewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $chatWith = $this->participants->reject(function ($value) {
            return $value->user_id == Auth::user()->id;
        })->first()->user;

        return [
            'id' => $this->id,
            // 'subject' => $this->subject,
            'messages' => MessageResource::collection($this->messages),
            'creator' => new UserResource($this->creator()),
            'chat_with' => new ChatUserResource($chatWith),
            'created_at' => $this->created_at,
        ];
    }
}
