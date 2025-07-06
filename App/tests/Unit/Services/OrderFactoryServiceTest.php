<?php

namespace Tests\Unit\Services;

use App\Models\MenuItem;
use App\Models\Order;
use App\Models\User;
use App\Services\OrderFactoryService;
use Database\Factories\UserFactory;
use Tests\TestCase;

class OrderFactoryServiceTest extends TestCase
{

    public function test_order_factory_creates_order_with_items(): void
    {
        $user = User::factory()->create();
        $menu_items = MenuItem::factory()->count(5)->create();


        $prepared_array = [
            'user_id' => $user->id,
            'items' => $menu_items->map(function ($items) {
                $obj = [];
                $obj['quantity'] = rand(1, 5000);
                $obj['menu_item_id'] = $items->id;

                return $obj;
            })->toArray()
        ];

        $order = OrderFactoryService::make($prepared_array);

        $this->assertInstanceOf(Order::class, $order);
        $this->assertCount(count($prepared_array['items']), $order->items);
        $this->assertEquals($prepared_array['user_id'], $order->user_id);

        foreach ($prepared_array['items'] as $index => $item) {
            $order_item = $order->items[$index];
            $this->assertEquals($item['quantity'], $order_item->quantity);
            $this->assertEquals($item['menu_item_id'], $order_item->menu_item_id);
        }

    }

}
