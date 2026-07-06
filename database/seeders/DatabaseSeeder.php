<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // create the 5 roles — run this once
        $roles = [
            'Administrator',
            'Developer',
            'DevOpsEngineer',
            'SecurityEngineer',
            'BillingManager',
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        $this->command->info('Roles seeded successfully');
    }
}
