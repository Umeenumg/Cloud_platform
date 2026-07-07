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
        Schema::create('resources', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('resource_group_id');
            $table->uuid('server_id')->nullable(); // physical server hosting this resource
            $table->string('name');
            $table->string('type');               // STI discriminator column
            $table->enum('status', ['provisioning', 'running', 'stopped', 'failed', 'deleted']);
            $table->decimal('hourly_cost', 8, 4); // ex: 0.0850 per hour
            $table->timestamp('deployed_at')->nullable();

            // VirtualMachine columns
            $table->integer('cpu')->nullable();
            $table->integer('ram')->nullable();   // GB
            $table->string('os')->nullable();
            $table->string('ip_address')->nullable();

            // Database columns
            $table->string('db_engine')->nullable();    // mysql, postgresql
            $table->string('db_version')->nullable();
            $table->integer('storage')->nullable();     // GB

            // StorageAccount columns
            $table->integer('capacity')->nullable();    // GB
            $table->string('redundancy')->nullable();   // LRS, GRS, ZRS

            // KubernetesCluster columns
            $table->string('k8s_version')->nullable();
            $table->integer('node_count')->nullable();

            // LoadBalancer columns
            $table->string('lb_type')->nullable();      // L4, L7
            $table->integer('max_throughput')->nullable(); // Mbps

            // CacheServer columns
            $table->string('cache_engine')->nullable(); // redis, memcached
            $table->integer('memory')->nullable();      // GB

            $table->timestamps();

            $table->foreign('resource_group_id')
                ->references('id')
                ->on('resource_groups')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resources');
    }
};
