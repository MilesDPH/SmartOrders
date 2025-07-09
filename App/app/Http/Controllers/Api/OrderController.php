<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateOrderRequest;
use App\Services\OrderFactoryService;

class OrderController extends Controller
{
    public function store(CreateOrderRequest $request){
        return OrderFactoryService::make($request->validated());
    }
}
