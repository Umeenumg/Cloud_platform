<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class SecurityPolicy extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'security_level',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function resources()
    {
        return $this->belongsToMany(Resource::class, 'security_policy_resource');
    }
}
