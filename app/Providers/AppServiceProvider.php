<?php

namespace App\Providers;

use App\Models\Resource;
use App\Models\User;
use App\Models\Company;
use App\Models\Deployment;
use App\Models\SecurityPolicy;
use App\Models\Ticket;
use App\Observers\AuditObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // every action on these models is automatically logged
        User::observe(AuditObserver::class);
        Company::observe(AuditObserver::class);
        Resource::observe(AuditObserver::class);
        Deployment::observe(AuditObserver::class);
        SecurityPolicy::observe(AuditObserver::class);
        Ticket::observe(AuditObserver::class);
    }
}
