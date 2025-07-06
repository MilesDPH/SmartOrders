<?php

namespace App\Services;

use App\Enums\OrderStatus;
use App\Models\Order;
use App\Models\OrderItem;

class OrderFactoryService
{
    public static function make($prepared_array): Order{

        #primero buscamos hacer la order
        $order = new Order();
        $order->status = OrderStatus::Pending;
        $order->user_id = $prepared_array['user_id'];

        $order->save();

        #luego la iteracción
        foreach ($prepared_array['items'] as $item){
            $order_item = new OrderItem();
            $order_item->order_id = $order->id;
            $order_item->quantity = $item['quantity'];
            $order_item->menu_item_id = $item['menu_item_id'];

            $order_item->save();
        }

        return $order;
    }
}
