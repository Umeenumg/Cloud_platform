<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Resource;
use App\Models\ResourceGroup;
use App\Models\VirtualMachine;
use App\Models\DatabaseResource;
use App\Models\StorageAccount;
use App\Models\KubernetesCluster;
use App\Models\LoadBalancer;
use App\Models\CacheServer;
use Illuminate\Http\Request;

class ResourceController extends Controller
{
    // map type string to model class
    private array $typeMap = [
        'VirtualMachine'   => VirtualMachine::class,
        'Database'         => DatabaseResource::class,
        'StorageAccount'   => StorageAccount::class,
        'KubernetesCluster' => KubernetesCluster::class,
        'LoadBalancer'     => LoadBalancer::class,
        'CacheServer'      => CacheServer::class,
    ];

    // GET /api/resource-groups/{resourceGroup}/resources
    public function index(ResourceGroup $resourceGroup)
    {
        return response()->json(
            $resourceGroup->resources()->get()
        );
    }

    // POST /api/resource-groups/{resourceGroup}/resources
    public function store(Request $request, ResourceGroup $resourceGroup)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'type'        => 'required|in:VirtualMachine,Database,StorageAccount,KubernetesCluster,LoadBalancer,CacheServer',
            'hourly_cost' => 'required|numeric|min:0',
            // VM fields
            'cpu'         => 'nullable|integer',
            'ram'         => 'nullable|integer',
            'os'          => 'nullable|string',
            // DB fields
            'db_engine'   => 'nullable|string',
            'db_version'  => 'nullable|string',
            'storage'     => 'nullable|integer',
            // Storage fields
            'capacity'    => 'nullable|integer',
            'redundancy'  => 'nullable|string',
            // K8s fields
            'k8s_version' => 'nullable|string',
            'node_count'  => 'nullable|integer',
            // LB fields
            'lb_type'     => 'nullable|string',
            'max_throughput' => 'nullable|integer',
            // Cache fields
            'cache_engine' => 'nullable|string',
            'memory'      => 'nullable|integer',
        ]);

        $modelClass = $this->typeMap[$validated['type']];

        $resource = $modelClass::create(array_merge($validated, [
            'resource_group_id' => $resourceGroup->id,
            'status'            => 'provisioning',
            'deployed_at'       => now(),
        ]));

        return response()->json($resource, 201);
    }

    // GET /api/resources/{resource}
    public function show(Resource $resource)
    {
        return response()->json($resource->load('resourceGroup'));
    }

    // PATCH /api/resources/{resource}/status
    public function updateStatus(Request $request, Resource $resource)
    {
        $validated = $request->validate([
            'status' => 'required|in:provisioning,running,stopped,failed,deleted',
        ]);

        $resource->update($validated);

        return response()->json($resource);
    }

    // DELETE /api/resources/{resource}
    public function destroy(Resource $resource)
    {
        $resource->update(['status' => 'deleted']);
        $resource->delete();
        return response()->json(['message' => 'Resource deleted']);
    }
}
