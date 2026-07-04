<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Str;

class ApiKey extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'key_hash',
        'name',
        'status',
        'expires_at',
    ];

    protected $hidden = [
        'key_hash',  // never expose the hash
    ];

    protected $casts = [
        'expires_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // generate a new key — returns raw key ONCE
    public static function generate(User $user, string $name = null): array
    {
        $rawKey = Str::random(64);

        $apiKey = self::create([
            'user_id'  => $user->id,
            'key_hash' => hash('sha256', $rawKey),
            'name'     => $name,
            'status'   => 'active',
        ]);

        return [
            'id'      => $apiKey->id,
            'raw_key' => $rawKey, // shown to user ONCE — never stored raw
        ];
    }

    public function isExpired(): bool
    {
        return $this->expires_at && $this->expires_at->isPast();
    }
}