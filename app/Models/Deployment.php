<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Deployment extends Model
{
    use HasUuids;

    protected $fillable = [
        'resource_id',
        'user_id',
        'version',
        'status',
        'deployment_cost',
        'duration',
        'error_count',
        'rollback_done',
        'deployed_at',
    ];

    protected $casts = [
        'deployment_cost' => 'decimal:2',
        'rollback_done'   => 'boolean',
        'deployed_at'     => 'datetime',
    ];

    // belongs to a resource
    public function resource()
    {
        return $this->belongsTo(Resource::class);
    }

    // belongs to the user who triggered it
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // helper: is this deployment still active
    public function isRunning(): bool
    {
        return $this->status === 'running';
    }

    // helper: did it fail
    public function hasFailed(): bool
    {
        return $this->status === 'failed';
    }
}
