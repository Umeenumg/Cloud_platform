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
        Schema::create('deployments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('resource_id');
            $table->uuid('user_id');              // who triggered the deployment
            $table->string('version');            // ex: "v1.2.3"
            $table->enum('status', [
                'pending',
                'running',
                'success',
                'failed',
                'rolled_back'
            ])->default('pending');
            $table->decimal('deployment_cost', 8, 2)->default(0);
            $table->integer('duration')->nullable();     // seconds
            $table->integer('error_count')->default(0);
            $table->boolean('rollback_done')->default(false);
            $table->timestamp('deployed_at')->nullable();
            $table->timestamps();

            $table->foreign('resource_id')
                ->references('id')
                ->on('resources')
                ->onDelete('cascade');

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deployments');
    }
};
