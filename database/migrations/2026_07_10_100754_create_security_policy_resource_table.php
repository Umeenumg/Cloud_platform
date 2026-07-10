<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('security_policy_resource', function (Blueprint $table) {
            $table->uuid('security_policy_id');
            $table->uuid('resource_id');
            $table->primary(['security_policy_id', 'resource_id']);

            $table->foreign('security_policy_id')
                ->references('id')
                ->on('security_policies')
                ->onDelete('cascade');

            $table->foreign('resource_id')
                ->references('id')
                ->on('resources')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('security_policy_resource');
    }
};
