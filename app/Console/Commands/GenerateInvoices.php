<?php

namespace App\Console\Commands;

use App\Models\Subscription;
use App\Models\Consumption;
use App\Models\Invoice;
use App\Models\InvoiceLine;
use Illuminate\Console\Command;

class GenerateInvoices extends Command
{
    protected $signature   = 'billing:generate-invoices';
    protected $description = 'Generate monthly invoices for all subscriptions';

    public function handle(): void
    {
        $subscriptions = Subscription::where('status', 'active')->get();

        foreach ($subscriptions as $subscription) {
            $this->generateInvoice($subscription);
        }

        $this->info("Invoices generated for {$subscriptions->count()} subscriptions.");
    }

    private function generateInvoice(Subscription $subscription): void
    {
        // get all resources in this subscription
        $resourceIds = $subscription->resourceGroups()
            ->with('resources')
            ->get()
            ->pluck('resources')
            ->flatten()
            ->pluck('id');

        if ($resourceIds->isEmpty()) {
            return;
        }

        // get consumption for this month
        $consumptions = Consumption::whereIn('resource_id', $resourceIds)
            ->whereMonth('start_date', now()->month)
            ->whereYear('start_date', now()->year)
            ->with('resource')
            ->get();

        if ($consumptions->isEmpty()) {
            return;
        }

        // calculate total
        $total = $consumptions->sum('computed_cost');

        // create invoice
        $invoice = Invoice::create([
            'subscription_id' => $subscription->id,
            'billing_date'    => now()->toDateString(),
            'total_amount'    => $total,
            'payment_status'  => 'pending',
        ]);

        // create one line per resource
        $grouped = $consumptions->groupBy('resource_id');

        foreach ($grouped as $resourceId => $items) {
            $resource    = $items->first()->resource;
            $totalHours  = $items->count(); // each record = 1 hour
            $lineCost    = $items->sum('computed_cost');

            InvoiceLine::create([
                'invoice_id'  => $invoice->id,
                'description' => "{$resource->name} ({$resource->type})",
                'quantity'    => $totalHours,
                'unit_price'  => $resource->hourly_cost,
                'total'       => $lineCost,
            ]);
        }

        $this->info("Invoice #{$invoice->id} — Total: \${$total}");
    }
}
