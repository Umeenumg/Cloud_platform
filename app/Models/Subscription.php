<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Subscription extends Model
{
    use HasUuids;

    protected $fillable = [
        'company_id',
        'name',
        'status',
        'monthly_cost',
    ];

    protected $casts = [
        'monthly_cost' => 'decimal:2',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_subscriptions')
            ->withPivot('assigned_at', 'permission_level', 'status')
            ->withTimestamps();
    }

    public function resourceGroups()
    {
        return $this->hasMany(ResourceGroup::class);
    }
}
