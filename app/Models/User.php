<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class User extends Authenticatable
{
    use HasUuids;

    protected $fillable = [
        'company_id',
        'name',
        'first_name',
        'email',
        'password',
        'phone',
    ];

    protected $hidden = [
        'password',  // never returned in JSON responses
    ];

    protected $casts = [
        'password' => 'hashed',  // auto-hash when you set password
    ];

    // belongs to one company
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    // has many roles through pivot
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles');
    }

    // has many subscriptions through associative class
    public function subscriptions()
    {
        return $this->belongsToMany(Subscription::class, 'user_subscriptions')
            ->withPivot('assigned_at', 'permission_level', 'status')
            ->withTimestamps();
    }

    // has many api keys
    public function apiKeys()
    {
        return $this->hasMany(ApiKey::class);
    }

    // has many access tokens
    public function accessTokens()
    {
        return $this->hasMany(AccessToken::class);
    }

    // helper method — check if user has a role
    public function hasRole(string $role): bool
    {
        return $this->roles->pluck('name')->contains($role);
    }
}
