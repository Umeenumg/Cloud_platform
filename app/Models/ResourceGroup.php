<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ResourceGroup extends Model
{
    use HasUuids;

    protected $fillable = [
        'subscription_id',
        'name',
        'region',
    ];

    // belongs to one subscription
    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }

    // has many resources
    public function resources()
    {
        return $this->hasMany(Resource::class);
    }
}