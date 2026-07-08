<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ResourceGroup;
use App\Models\Subscription;
use Illuminate\Http\Request;

class ResourceGroupController extends Controller
{
    // GET /api/subscriptions/{subscription}/resource-groups
    public function index(Subscription $subscription)
    {
        return response()->json(
            $subscription->resourceGroups()->with('resources')->get()
        );
    }

    // POST /api/subscriptions/{subscription}/resource-groups
    public function store(Request $request, Subscription $subscription)
    {
        $validated = $request->validate([
            'name'   => 'required|string|max:255',
            'region' => 'required|string|max:100',
        ]);

        $rg = $subscription->resourceGroups()->create($validated);

        return response()->json($rg, 201);
    }

    // GET /api/resource-groups/{resourceGroup}
    public function show(ResourceGroup $resourceGroup)
    {
        return response()->json(
            $resourceGroup->load('resources', 'subscription')
        );
    }

    // DELETE /api/resource-groups/{resourceGroup}
    public function destroy(ResourceGroup $resourceGroup)
    {
        $resourceGroup->delete();
        return response()->json(['message' => 'Resource group deleted']);
    }
}
