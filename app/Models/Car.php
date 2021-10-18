<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Car extends Model implements HasMedia
{
    use HasFactory , InteractsWithMedia;

    protected $fillable = ['make','model','year','show_location','user_id'];



    public function getPhotosAttribute(){
        return $this->getMedia('car-photos');
    }


    public function user(){
        return $this->belongsTo(User::class);
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')->nonQueued()->height(200)->width(200);
    }


    public function getSlugAttribute()
    {
        return Str::slug($this->attributes['make']." ".$this->attributes['model']." ".$this->attributes['year'], '-');
    }
}
