<?php

namespace App\Console\Commands;

use App\Models\Resource;
use App\Models\Consumption;
use Illuminate\Console\Command;

class RecordConsumption extends Command
{
    protected $signature   = 'billing:record-consumption';
    protected $description = 'Record hourly consumption for all running resources';

    public function handle(): void
    {
        $resources = Resource::withoutGlobalScopes()
            ->where('status', 'running')
            ->get();

        $startDate = now()->subHour();
        $endDate   = now();

        foreach ($resources as $resource) {
            $hours =$hours = 1;
            $cost  = round($resource->hourly_cost * $hours, 4);

            Consumption::create([
                'resource_id'   => $resource->id,
                'start_date'    => $startDate,
                'end_date'      => $endDate,
                'computed_cost' => $cost,
            ]);
        }

        $this->info("Consumption recorded for {$resources->count()} resources.");
    }
}
