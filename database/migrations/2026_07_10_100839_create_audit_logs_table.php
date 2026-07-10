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
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id')->nullable();   // nullable — system actions have no user
            $table->string('action');              // created, updated, deleted
            $table->string('model');               // which model — Company, Resource, etc.
            $table->uuid('model_id')->nullable();  // which record
            $table->json('changes')->nullable();   // what changed
            $table->string('ip_address')->nullable();
            $table->timestamp('action_date');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};
