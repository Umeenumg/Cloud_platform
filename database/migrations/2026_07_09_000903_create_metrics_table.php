<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('metrics', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('resource_id');
            $table->timestamp('recorded_at');        // when was this metric recorded
            $table->float('cpu_usage');              // percentage 0-100
            $table->float('memory_usage');           // percentage 0-100
            $table->float('disk_usage');             // percentage 0-100
            $table->float('network_usage');          // MB/s
            $table->timestamps();

            $table->foreign('resource_id')
                ->references('id')
                ->on('resources')
                ->onDelete('cascade');

            // index on resource_id + recorded_at for fast time-series queries
            $table->index(['resource_id', 'recorded_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('metrics');
    }
};
