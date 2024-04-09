<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Auth\Events\Validated;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Mockery\Matcher\Type;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string',
            'date' => 'required|date|before_or_equal:' . now()->subYears(16)->format('Y-m-d'),
            'phone_number' => 'required|string',
        ], [
            'email.unique' => "Email đã tồn tại",
            'date.before_or_equal' => "Bạn phải đủ 16 tuổi để đăng ký",
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'date' => $request->date,
            'role' => 'user',
            'phone_number' => $request->phone_number,
        ]);

        $user->save();

        return response()->json([
            'message' => 'Đăng ký thành công',
        ], 201);
    }


    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('MyApp')->plainTextToken;

            return response()->json([
                'token' => $token,
                'role' => $user->role,
            ]);
        }

        return response()->json([
            'message' => 'Email hoặc mật khẩu không chính xác!',
        ], 401);
    }

    public function user(Request $request)
    {
        return $request->user();
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(
            [
                'message' => "Đăng xuất thành công"
            ],
            200
        );
    }
}
