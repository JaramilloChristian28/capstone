<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\AppointmentController; 
use App\Http\Controllers\MedicalRecordsController;
use App\Http\Controllers\StrandController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\StudentController;



// Route to get authenticated user
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();     
});

// routes/api.php

Route::middleware('auth:sanctum')->post('/password', [UserController::class, 'password']);


// User authentication routes
Route::post('/register', [UserController::class, 'register']);
Route::post('/user_login', [UserController::class, 'login']);

// User management routes
Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

//strand
Route::post('/strands', [StrandController::class, 'store']);
Route::get('/strands', [StrandController::class, 'index']);
Route::put('/strands/{strand_id}', [StrandController::class, 'update']);
Route::delete('/strands/{strand_id}', [StrandController::class, 'destroy']);



//section
Route::post('/sections', [SectionController::class, 'store']);
Route::get('/sections', [SectionController::class, 'index']);
Route::get('/sections/{id}', [SectionController::class, 'show']);
Route::put('/sections/{id}', [SectionController::class, 'update']);
Route::delete('/sections/{id}', [SectionController::class, 'destroy']);




//student
Route::post('/students', [StudentController::class, 'store']);
Route::get('/students', [StudentController::class, 'index']);
Route::get('/students/{student_id}', [StudentController::class, 'show']);
Route::put('/students/{student_id}', [StudentController::class, 'update']);
Route::delete('/students/{student_id}', [StudentController::class, 'destroy']);

//changepassforuser
Route::put('/users/{id}/change-password', [UserController::class, 'changePassword']);

//transferstudent

