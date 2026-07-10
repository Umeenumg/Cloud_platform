<?php

namespace App\Observers;

use App\Models\AuditLog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class AuditObserver
{
    public function created(Model $model): void
    {
        $this->log('created', $model, null, $model->getAttributes());
    }

    public function updated(Model $model): void
    {
        $this->log('updated', $model, $model->getOriginal(), $model->getChanges());
    }

    public function deleted(Model $model): void
    {
        $this->log('deleted', $model, $model->getAttributes(), null);
    }

    private function log(string $action, Model $model, ?array $before, ?array $after): void
    {
        AuditLog::create([
            'user_id'     => Auth::id(),
            'action'      => $action,
            'model'       => class_basename($model),
            'model_id'    => $model->id,
            'changes'     => ['before' => $before, 'after' => $after],
            'ip_address'  => Request::ip(),
            'action_date' => now(),
        ]);
    }
}
