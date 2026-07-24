<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // POST /api/register
    public function register(Request $request)
    {
        // Step 1 — validate the input
        $validated = $request->validate([
            'name'       => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'email'      => 'required|email|unique:users,email',
            'password'   => 'required|string|min:8|confirmed',
            'phone'      => 'nullable|string|max:20',
            'company_id' => 'required|uuid|exists:companies,id',
            'role'       => 'required|in:Administrator,Developer,DevOpsEngineer,SecurityEngineer,BillingManager',
        ]);

        // Step 2 — create the user
        // password is auto-hashed because of 'hashed' cast in User model
        $user = User::create([
            'name'       => $validated['name'],
            'first_name' => $validated['first_name'],
            'email'      => $validated['email'],
            'password'   => $validated['password'],
            'phone'      => $validated['phone'] ?? null,
            'company_id' => $validated['company_id'],
        ]);

        // Step 3 — assign the role
        $role = Role::where('name', $validated['role'])->first();
        $user->roles()->attach($role->id);

        // Step 4 — create a Sanctum token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'token'   => $token,
            'user'    => $user->load('roles', 'company'),
        ], 201);
    }

    // POST /api/login
    public function login(Request $request)
    {
        // Step 1 — validate
        $validated = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        // Step 2 — check credentials
        // Auth::attempt checks email + compares hashed password
        if (!Auth::attempt($validated)) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        // Step 3 — get the user
        $user = Auth::user();

        // Step 4 — revoke old tokens + create new one
        // security: one active token per login session
        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token'   => $token,
            'user'    => $user->load('roles', 'company'),
        ]);
    }

    // POST /api/logout
    public function logout(Request $request)
    {
        // delete only the current token — not all tokens
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }

    // GET /api/me
    public function me(Request $request)
    {
        return response()->json(
            $request->user()->load('roles', 'company', 'subscriptions')
        );
    }

    // Web register — for Inertia
    public function webRegister(Request $request)
    {
        $validated = $request->validate([
            'name'       => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'email'      => 'required|email|unique:users,email',
            'password'   => 'required|string|min:8|confirmed',
            'company_id' => 'required|uuid|exists:companies,id',
            'role'       => 'required|in:Administrator,Developer,DevOpsEngineer,SecurityEngineer,BillingManager',
        ]);

        $user = \App\Models\User::create([
            'name'       => $validated['name'],
            'first_name' => $validated['first_name'],
            'email'      => $validated['email'],
            'password'   => $validated['password'],
            'company_id' => $validated['company_id'],
        ]);

        $role = \App\Models\Role::where('name', $validated['role'])->first();
        $user->roles()->attach($role->id);

        Auth::login($user);
        $request->session()->regenerate();
        return redirect('/dashboard');
    }
}
