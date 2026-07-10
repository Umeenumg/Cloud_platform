<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Consumption extends Model
{
    use HasUuids;

    protected $fillable = [
        'resource_id',
        'start_date',
        'end_date',
        'computed_cost',
    ];

    protected $casts = [
        'start_date'    => 'datetime',
        'end_date'      => 'datetime',
        'computed_cost' => 'decimal:4',
    ];

    public function resource()
    {
        return $this->belongsTo(Resource::class);
    }
}
