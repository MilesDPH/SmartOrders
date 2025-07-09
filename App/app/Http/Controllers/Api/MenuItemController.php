<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;

class MenuItemController extends Controller
{
    public function index(){
        return MenuItem::cursorPaginate(5);
    }
}
