<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        return [
            'thread_id' => $this->thread_id,
            'sender' => new UserResource($this->user),
            'receiver' => new UserResource($this->recipients->first()->user),
            'body' => $this->body,
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
