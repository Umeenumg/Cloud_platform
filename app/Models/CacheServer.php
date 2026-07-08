<?php

namespace App\Models;

class CacheServer extends Resource
{
  protected $table = 'resources';

  protected static function booted()
  {
    static::creating(function ($model) {
      $model->type = 'CacheServer';
    });

    static::addGlobalScope('type', function ($query) {
      $query->where('type', 'CacheServer');
    });
  }
}
