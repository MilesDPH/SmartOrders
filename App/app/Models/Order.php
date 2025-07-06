<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id', 'status'
    ];

    protected $casts = [
        'created_at', 'updated_at'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function items(){
        return $this->hasMany(OrderItem::class);
    }

}
