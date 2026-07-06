<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

// Public routes — no token needed
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Protected routes — need valid Sanctum token
Route::middleware('auth:sanctum')->group(function () {
  Route::post('/logout', [AuthController::class, 'logout']);
  Route::get('/me',      [AuthController::class, 'me']);

  Route::middleware('role:Administrator')->group(function () {
    Route::get('/admin-only', function () {
      return response()->json(['message' => 'Welcome Administrator']);
    });
  });
});
