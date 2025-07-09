<?php

use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\MenuItemController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::controller(MenuItemController::class)->middleware(['auth:sanctum'])->group(function (){
    Route::get('menu-items', 'index');
});

Route::controller(OrderController::class)->middleware(['auth:sanctum'])->group(function (){
    Route::get('orders', 'index');
    Route::post('orders', 'store');
});


Route::controller(UserController::class)->middleware(['auth:sanctum'])->group(function (){
    Route::get('users/{id}', 'show');
    Route::get('user', 'me');
});
