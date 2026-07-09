<?php

namespace App\Jobs;

use App\Models\Deployment;
use App\Models\Resource;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessDeployment implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public Deployment $deployment
    ) {}

    public function handle(): void
    {
        $startTime = time(); // use Unix timestamp (integer) instead of Carbon

        try {
            // Step 1 — mark as running
            $this->deployment->update([
                'status'      => 'running',
                'deployed_at' => now(),
            ]);

            // Step 2 — simulate deployment work
            sleep(2);

            // Step 3 — simulate random errors
            $errorCount = 0;

            if ($errorCount > 3) {
                $this->deployment->update([
                    'status'      => 'failed',
                    'error_count' => $errorCount,
                    'duration'    => max(0, time() - $startTime),
                ]);
                $this->rollback();
                return;
            }

            // Step 4 — success
            $this->deployment->update([
                'status'          => 'success',
                'error_count'     => $errorCount,
                'duration'        => max(0, time() - $startTime),
                'deployment_cost' => 0.01,
            ]);

            // Step 5 — update resource
            $this->deployment->resource->update([
                'status' => 'running',
            ]);
        } catch (\Exception $e) {
            $this->deployment->update([
                'status'   => 'failed',
                'duration' => max(0, time() - $startTime),
            ]);
        }
    }

    private function rollback(): void
    {
        // mark deployment as rolled back
        $this->deployment->update([
            'status'        => 'rolled_back',
            'rollback_done' => true,
        ]);

        // revert resource to stopped
        $this->deployment->resource->update([
            'status' => 'stopped',
        ]);
    }

    private function calculateCost(\Illuminate\Support\Carbon $startTime): float
    {
        $seconds = max(0, now()->diffInSeconds($startTime));
        $hours = $seconds / 3600;
        return round($hours * 0.50, 4);
    }
}
