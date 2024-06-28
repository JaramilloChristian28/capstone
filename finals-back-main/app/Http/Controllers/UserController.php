<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Method for user login
    public function login(Request $req)
    {
        $user = User::where('email', $req->email)->first();
        if ($user && Hash::check($req->password, $user->password)) {
            return response()->json($user);
        } else {
            return response([
                'error' => ['Email or password not match']
            ]);
        }
    }

    // Method for user registration
    public function register(Request $req)
    {
        $validated = $req->validate([
            'name' => 'required|string|max:20',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|alpha_num|min:6|confirmed',
        ], [
            'password.confirmed' => 'Confirm password not match.',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $req->role ?? 'user', // Assuming 'user' is the default role
        ]);

        return response()->json($user);
    }

    // Method to get all users
    public function index()
    {
        return User::all();
    }

    // Method to update a user
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|alpha_num|min:6|confirmed',
            'role' => 'sometimes|required|string',
            'nfc_id' => 'sometimes|required|integer|unique:users,nfc_id,' . $user->id,
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json($user, 200);
    }

    // Method to create a user
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|alpha_num|min:6|confirmed',
            'role' => 'required|string',
            'nfc_id' => 'required|integer|unique:users,nfc_id',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'nfc_id' => $validated['nfc_id'],
        ]);

        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    }

    // Method to delete a user
    public function destroy($id)
    {
        User::destroy($id);
        return response()->json(['message' => 'User deleted successfully']);
    }

    // Method to change password
    public function changePassword(Request $request, $id)
    {
        $request->validate([
            'old_password' => 'required',
            'new_password' => 'required|alpha_num|min:6|confirmed',
        ]);

        $user = User::findOrFail($id);

        if (Hash::check($request->old_password, $user->password)) {
            $user->password = Hash::make($request->new_password);
            $user->save();
            return response()->json(['message' => 'Password updated successfully'], 200);
        } else {
            return response()->json(['error' => 'Old password does not match'], 400);
        }
    }
}
