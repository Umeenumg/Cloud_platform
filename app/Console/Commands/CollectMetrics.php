<?php

namespace App\Console\Commands;

use App\Models\Resource;
use App\Models\Metric;
use App\Models\Alert;
use App\Models\AlertEvent;
use Illuminate\Console\Command;

class CollectMetrics extends Command
{
    protected $signature   = 'metrics:collect';
    protected $description = 'Collect metrics for all running resources and evaluate alerts';

    public function handle(): void
    {
        // get all running resources
        $resources = Resource::withoutGlobalScopes()
                             ->where('status', 'running')
                             ->get();

        foreach ($resources as $resource) {
            // simulate metric collection
            // in real life: call Prometheus, CloudWatch, etc.
            $metric = Metric::create([
                'resource_id'    => $resource->id,
                'recorded_at'    => now(),
                'cpu_usage'      => rand(10, 95),   // simulate 10-95% CPU
                'memory_usage'   => rand(20, 90),
                'disk_usage'     => rand(5, 80),
                'network_usage'  => rand(1, 100),   // MB/s
            ]);

            // evaluate alerts for this resource
            $this->evaluateAlerts($resource, $metric);
        }

        $this->info("Metrics collected for {$resources->count()} resources");
    }

    private function evaluateAlerts(Resource $resource, Metric $metric): void
    {
        $alerts = Alert::where('resource_id', $resource->id)
                       ->where('active', true)
                       ->get();

        foreach ($alerts as $alert) {
            $value = $metric->{$alert->metric}; // dynamic property access

            if ($alert->isTriggered($value)) {
                AlertEvent::create([
                    'alert_id'        => $alert->id,
                    'triggered_value' => $value,
                    'message'         => "Alert '{$alert->name}': {$alert->metric} is {$value}% (threshold: {$alert->threshold}%)",
                    'severity'        => $alert->critical_level,
                    'triggered_at'    => now(),
                ]);

                $this->warn("ALERT FIRED: {$alert->name} — {$alert->metric} = {$value}%");
            }
        }
    }
}