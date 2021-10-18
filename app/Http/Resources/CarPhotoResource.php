<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CarPhotoResource extends JsonResource
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
            // 'uuid' => $this->uuid,
            'name' => $this->name,
            'file_name' => $this->file_name,
            'url' => $this->getUrl(),
            'thumbnail' => $this->getUrl('thumb'),
            'size' => $this->size,
            'custom_properties' => $this->custom_properties
        ];
    }
}
