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
        Schema::create('alerts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');                 // who created this alert
            $table->uuid('resource_id');             // which resource to watch
            $table->string('name');
            $table->enum('metric', ['cpu_usage', 'memory_usage', 'disk_usage', 'network_usage']);
            $table->float('threshold');              // ex: 80.0 = alert when cpu > 80%
            $table->enum('critical_level', ['info', 'warning', 'critical']);
            $table->boolean('active')->default(true);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('resource_id')->references('id')->on('resources')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alerts');
    }
};
