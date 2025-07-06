<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/*
 * fields: id, name, description, created_at, updated_at
 */
class Category extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the menu items for the category.
     */
    public function menuItems(){
        return $this->hasMany(MenuItem::class, 'category_id');
    }
}
