<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class UserSubscription extends Pivot
{
    use HasUuids;

    protected $table = 'user_subscriptions';

    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'subscription_id',
        'assigned_at',
        'permission_level',
        'status',
    ];

    protected $casts = [
        'assigned_at' => 'datetime',
    ];
}
