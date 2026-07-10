<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Invoice extends Model
{
    use HasUuids;

    protected $fillable = [
        'subscription_id',
        'billing_date',
        'total_amount',
        'payment_status',
    ];

    protected $casts = [
        'billing_date'  => 'date',
        'total_amount'  => 'decimal:2',
    ];

    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }

    public function lines()
    {
        return $this->hasMany(InvoiceLine::class);
    }
}
