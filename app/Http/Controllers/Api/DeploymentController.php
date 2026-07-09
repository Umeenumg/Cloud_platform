<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\ProcessDeployment;
use App\Models\Deployment;
use App\Models\Resource;
use Illuminate\Http\Request;

class DeploymentController extends Controller
{
    // POST /api/resources/{resource}/deploy
    public function deploy(Request $request, Resource $resource)
    {
        $validated = $request->validate([
            'version' => 'required|string|max:50',
        ]);

        // create deployment record
        $deployment = Deployment::create([
            'resource_id' => $resource->id,
            'user_id'     => $request->user()->id,
            'version'     => $validated['version'],
            'status'      => 'pending',
        ]);

        // update resource status
        $resource->update(['status' => 'provisioning']);

        // dispatch job to queue — runs in background
        ProcessDeployment::dispatch($deployment);

        return response()->json([
            'message'    => 'Deployment started',
            'deployment' => $deployment,
        ], 201);
    }

    // GET /api/deployments/{deployment}
    public function show(Deployment $deployment)
    {
        return response()->json(
            $deployment->load('resource', 'user')
        );
    }

    // GET /api/resources/{resource}/deployments
    public function history(Resource $resource)
    {
        return response()->json(
            $resource->deployments()->orderBy('created_at', 'desc')->get()
        );
    }

    // POST /api/deployments/{deployment}/rollback
    public function rollback(Deployment $deployment)
    {
        if ($deployment->status !== 'failed') {
            return response()->json([
                'message' => 'Can only rollback failed deployments',
            ], 422);
        }

        $deployment->update([
            'status'        => 'rolled_back',
            'rollback_done' => true,
        ]);

        $deployment->resource->update(['status' => 'stopped']);

        return response()->json([
            'message'    => 'Rollback completed',
            'deployment' => $deployment,
        ]);
    }
}
