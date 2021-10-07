<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;


class CarResource extends JsonResource
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
            'make' => $this->make,
            'model' => $this->model,
            'year' => $this->year,
            'slug' => $this->slug,
            (Auth::check()) ?? 'show_location' => $this->show_location,
            'created_at' => $this->created_at,
            'user' => $this->user->only(['id','name']),
            'car_images' =>  (Auth::check()) ? $this->carImages->take(2) : $this->carImages 
        ];
    }
}
