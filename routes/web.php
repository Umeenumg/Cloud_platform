<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\DashboardController;

// ── Public routes ──────────────────────────────────────────────────────────
Route::get('/', function () {
    return Inertia::render('Landing');
});

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('Register');
})->name('register');

Route::post('/login', [AuthController::class, 'webLogin']);
Route::post('/register', [AuthController::class, 'webRegister']);

// ── Authenticated routes ───────────────────────────────────────────────────
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'webLogout'])->name('logout');

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'auth' => ['user' => auth()->user()->load('roles', 'company')],
        ]);
    })->name('dashboard');

    Route::get('/resources', function () {
        return Inertia::render('Resources', [
            'auth' => ['user' => auth()->user()],
        ]);
    })->name('resources');

    Route::get('/deployments', function () {
        return Inertia::render('Deployments', [
            'auth' => ['user' => auth()->user()],
        ]);
    })->name('deployments');

    Route::get('/monitoring', function () {
        return Inertia::render('Monitoring', [
            'auth' => ['user' => auth()->user()],
        ]);
    })->name('monitoring');

    Route::get('/billing', function () {
        return Inertia::render('Billing', [
            'auth' => ['user' => auth()->user()],
        ]);
    })->name('billing');

    Route::get('/support', function () {
        return Inertia::render('Support', [
            'auth' => ['user' => auth()->user()],
        ]);
    })->name('support');

    Route::get('/security', function () {
        return Inertia::render('Security', [
            'auth' => ['user' => auth()->user()],
        ]);
    })->name('security');

    // ── Admin only ─────────────────────────────────────────────────────────
    Route::middleware('role:Administrator')->group(function () {
        Route::get('/admin', function () {
            return Inertia::render('Admin/Dashboard', [
                'auth' => ['user' => auth()->user()],
            ]);
        })->name('admin.dashboard');

        Route::get('/admin/users', function () {
            return Inertia::render('Admin/Users', [
                'auth' => ['user' => auth()->user()],
                'users' => \App\Models\User::with('roles', 'company')->get(),
            ]);
        })->name('admin.users');

        Route::get('/admin/companies', function () {
            return Inertia::render('Admin/Companies', [
                'auth' => ['user' => auth()->user()],
                'companies' => \App\Models\Company::with('subscriptions')->get(),
            ]);
        })->name('admin.companies');

        Route::get('/admin/audit', function () {
            return Inertia::render('Admin/Audit', [
                'auth' => ['user' => auth()->user()],
                'logs' => \App\Models\AuditLog::with('user')->latest()->take(50)->get(),
            ]);
        })->name('admin.audit');
    });
});