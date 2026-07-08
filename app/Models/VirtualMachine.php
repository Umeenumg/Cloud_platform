<?php

namespace App\Models;

class VirtualMachine extends Resource
{
    protected $table = 'resources'; // same table as parent — STI

    protected static function booted()
    {
        // automatically set type when creating
        static::creating(function ($model) {
            $model->type = 'VirtualMachine';
        });

        // always filter by type when querying
        static::addGlobalScope('type', function ($query) {
            $query->where('type', 'VirtualMachine');
        });
    }
}