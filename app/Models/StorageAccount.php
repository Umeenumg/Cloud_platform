<?php

namespace App\Models;

class StorageAccount extends Resource
{
    protected $table = 'resources';

    protected static function booted()
    {
        static::creating(function ($model) {
            $model->type = 'StorageAccount';
        });

        static::addGlobalScope('type', function ($query) {
            $query->where('type', 'StorageAccount');
        });
    }
}