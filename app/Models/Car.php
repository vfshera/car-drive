<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Str;

class Car extends Model
{
    use HasFactory;

    protected $fillable = ['make','model','year','show_location','user_id'];


    public function carImages(){
        return $this->hasMany(CarImage::class);
    }


    public function user(){
        return $this->belongsTo(User::class);
    }



    public function getSlugAttribute()
    {
        return Str::slug($this->attributes['make']." ".$this->attributes['model']." ".$this->attributes['year'], '-');
    }
}
