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
            'receiver' => new UserResource($this->user),
            'sender' => new UserResource($this->participants->first()->user),
            'body' => $this->body,
        ];
    }
}
