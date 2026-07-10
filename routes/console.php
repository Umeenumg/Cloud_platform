<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

// collect metrics every minute
Schedule::command('metrics:collect')->everyMinute();

// record consumption every hour
Schedule::command('billing:record-consumption')->hourly();

// generate invoices on 1st of every month
Schedule::command('billing:generate-invoices')->monthlyOn(1, '00:00');

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');
