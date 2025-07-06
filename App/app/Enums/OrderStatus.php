<?php

namespace App\Enums;

enum OrderStatus: string
{
    case Pending = 'pending';
    case Processing = 'processing';
    case Completed = 'completed';
    case Cancelled = 'canceled';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
