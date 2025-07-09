<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Category;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Hugo Pedroza',
            'email' => 'milesdeveloper@hotmail.com',
            'password' => Hash::make('12345678'),
        ]);

        // Usuarios
        User::factory()->count(10)->create();

        // Categorías
        Category::factory()->count(5)->create();

        // Items del menú (usando categorías ya existentes)
        Category::all()->each(function ($category) {
            MenuItem::factory()->count(5)->create([
                'category_id' => $category->id,
            ]);
        });

        // Órdenes y sus ítems
        User::all()->each(function ($user) {
            Order::factory()
                ->count(2)
                ->create(['user_id' => $user->id])
                ->each(function ($order) {
                    $items = MenuItem::inRandomOrder()->take(rand(1, 5))->get();
                    foreach ($items as $item) {
                        OrderItem::factory()->create([
                            'order_id' => $order->id,
                            'menu_item_id' => $item->id,
                        ]);
                    }
                });
        });
    }
}
