<?php

namespace App\Models;

class DatabaseResource extends Resource
{
    protected $table = 'resources';

    protected static function booted()
    {
        static::creating(function ($model) {
            $model->type = 'Database';
        });

        static::addGlobalScope('type', function ($query) {
            $query->where('type', 'Database');
        });
    }
}