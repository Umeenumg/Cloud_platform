<?php

namespace App\Models;

class LoadBalancer extends Resource
{
  protected $table = 'resources';

  protected static function booted()
  {
    static::creating(function ($model) {
      $model->type = 'LoadBalancer';
    });

    static::addGlobalScope('type', function ($query) {
      $query->where('type', 'LoadBalancer');
    });
  }
}
