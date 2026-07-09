<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ResourceGroupController;
use App\Http\Controllers\Api\ResourceController;
use App\Http\Controllers\Api\DeploymentController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
  Route::post('/logout', [AuthController::class, 'logout']);
  Route::get('/me',      [AuthController::class, 'me']);
  // Resource Groups
  Route::get('/subscriptions/{subscription}/resource-groups', [ResourceGroupController::class, 'index']);
  Route::post('/subscriptions/{subscription}/resource-groups', [ResourceGroupController::class, 'store']);
  Route::get('/resource-groups/{resourceGroup}', [ResourceGroupController::class, 'show']);
  Route::delete('/resource-groups/{resourceGroup}', [ResourceGroupController::class, 'destroy']);

  // Resources
  Route::get('/resource-groups/{resourceGroup}/resources', [ResourceController::class, 'index']);
  Route::post('/resource-groups/{resourceGroup}/resources', [ResourceController::class, 'store']);
  Route::get('/resources/{resource}', [ResourceController::class, 'show']);
  Route::patch('/resources/{resource}/status', [ResourceController::class, 'updateStatus']);
  Route::delete('/resources/{resource}', [ResourceController::class, 'destroy']);
  Route::post('/resources/{resource}/deploy', [DeploymentController::class, 'deploy']);
  Route::get('/resources/{resource}/deployments', [DeploymentController::class, 'history']);
  Route::get('/deployments/{deployment}', [DeploymentController::class, 'show']);
  Route::post('/deployments/{deployment}/rollback', [DeploymentController::class, 'rollback']);
  Route::middleware('role:Administrator')->group(function () {
    Route::get('/admin-only', function () {
      return response()->json(['message' => 'Welcome Administrator']);
    });
  });
});
