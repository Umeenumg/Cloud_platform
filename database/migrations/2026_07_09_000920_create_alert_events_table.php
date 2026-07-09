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
        Schema::create('alert_events', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('alert_id');
            $table->float('triggered_value');        // the actual value that triggered it
            $table->text('message');
            $table->enum('severity', ['info', 'warning', 'critical']);
            $table->timestamp('triggered_at');
            $table->timestamps();

            $table->foreign('alert_id')
                ->references('id')
                ->on('alerts')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alert_events');
    }
};
