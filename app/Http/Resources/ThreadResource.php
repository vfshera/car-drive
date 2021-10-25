<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ThreadResource extends JsonResource
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
            'id' => $this->id,
            'messages_count' => $this->messages_count,
            // 'subject' => $this->subject,
            'creator' => new UserResource($this->creator()),
            'created_at' => $this->created_at,
            'latest_message' => new MessageResource($this->latest_message),
        ];
    }
}
