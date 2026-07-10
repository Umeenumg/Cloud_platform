<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Alert extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'resource_id',
        'name',
        'metric',
        'threshold',
        'critical_level',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function resource()
    {
        return $this->belongsTo(Resource::class);
    }

    public function events()
    {
        return $this->hasMany(AlertEvent::class);
    }

    public function isTriggered(float $value): bool
    {
        return $value >= $this->threshold;
    }
}
