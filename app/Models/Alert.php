<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Metric extends Model
{
    use HasUuids;

    protected $fillable = [
        'resource_id',
        'recorded_at',
        'cpu_usage',
        'memory_usage',
        'disk_usage',
        'network_usage',
    ];

    protected $casts = [
        'recorded_at' => 'datetime',
    ];

    public function resource()
    {
        return $this->belongsTo(Resource::class);
    }
}