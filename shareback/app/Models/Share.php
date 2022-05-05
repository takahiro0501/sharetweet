<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Share extends Model
{
    use HasFactory;

    protected $guarded = [
        'id'
    ];

    protected $fillable = [
        'email',
        'name',
        'message',
        'goodcount'
    ];

    public function comments(){
        return $this->hasMany('App\Models\Comment');
    }

}
