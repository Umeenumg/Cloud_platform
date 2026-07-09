<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class AlertEvent extends Model
{
    use HasUuids;

    protected $fillable = [
        'alert_id',
        'triggered_value',
        'message',
        'severity',
        'triggered_at',
    ];

    protected $casts = [
        'triggered_at' => 'datetime',
    ];

    public function alert()
    {
        return $this->belongsTo(Alert::class);
    }
}