<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Resource extends Model
{
    use HasUuids;

    protected $fillable = [
        'resource_group_id',
        'server_id',
        'name',
        'type',
        'status',
        'hourly_cost',
        'deployed_at',
        'cpu',
        'ram',
        'os',
        'ip_address',
        'db_engine',
        'db_version',
        'storage',
        'capacity',
        'redundancy',
        'k8s_version',
        'node_count',
        'lb_type',
        'max_throughput',
        'cache_engine',
        'memory',
    ];

    protected $casts = [
        'hourly_cost' => 'decimal:4',
        'deployed_at' => 'datetime',
    ];

    // STI — Laravel uses this to determine which subclass to instantiate
    protected $dispatchesEvents = [];

    public function resolveRouteBinding($value, $field = null)
    {
        return $this->where('id', $value)->firstOrFail();
    }

    // belongs to one resource group
    public function resourceGroup()
    {
        return $this->belongsTo(ResourceGroup::class);
    }

    // belongs to one physical server
    public function server()
    {
        return $this->belongsTo(Server::class);
    }

    // has many metrics
    public function metrics()
    {
        return $this->hasMany(Metric::class);
    }

    // has many deployments
    public function deployments()
    {
        return $this->hasMany(Deployment::class);
    }
}
