<?php

namespace App\Models;

class KubernetesCluster extends Resource
{
  protected $table = 'resources';

  protected static function booted()
  {
    static::creating(function ($model) {
      $model->type = 'KubernetesCluster';
    });

    static::addGlobalScope('type', function ($query) {
      $query->where('type', 'KubernetesCluster');
    });
  }

  // K8s specific — has many nodes
  public function nodes()
  {
    return $this->hasMany(Node::class, 'resource_id');
  }
}
