<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Display a listing of the students.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $students = Student::all();
        return response()->json($students);
    }

    /**
     * Store a newly created student in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'suffix' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:students',
            'phone_number' => 'nullable|string|max:20',
            'learner_reference_number' => 'required|string|max:255|unique:students',
            'gender' => 'required|string|max:10',
            'birth_date' => 'required|date',
            'birth_place' => 'nullable|string|max:255',
            'address' => 'required|string',
            'nationality' => 'required|string|max:255',
             'strand_name' => 'required|string|max:255',
             'section_name' => 'required|string|max:255',
        ]);

        $student = Student::create($request->all());

        return response()->json($student, 201);
    }

    /**
     * Display the specified student.
     *
     * @param  int  $student_id
     * @return \Illuminate\Http\Response
     */
    public function show($student_id)
    {
        $student = Student::findOrFail($student_id);
        return response()->json($student);
    }

    /**
     * Update the specified student in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $student_id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $student_id)
    {
        // Validation rules...
        $student = Student::findOrFail($student_id);
        $student->update($request->all());
        return response()->json($student, 200);
    }

    /**
     * Remove the specified student from storage.
     *
     * @param  int  $student_id
     * @return \Illuminate\Http\Response
     */
    public function destroy($student_id)
    {
        Student::destroy($student_id);

        return response()->json(['message' => 'Student deleted successfully'], 204);
    }
}
