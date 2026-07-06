<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);
    }
}
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string ...$roles): mixed
    {
        // check if user is logged in
        if (!$request->user()) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        // check if user has one of the required roles
        $userRoles = $request->user()->roles->pluck('name')->toArray();

        foreach ($roles as $role) {
            if (in_array($role, $userRoles)) {
                return $next($request); // has the role — allow through
            }
        }

        return response()->json([
            'message' => 'Forbidden — you do not have permission',
        ], 403);
    }
}