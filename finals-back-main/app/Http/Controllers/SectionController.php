<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Section;

class SectionController extends Controller
{
    /**
     * Display a listing of the sections.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sections = Section::all();
        return response()->json($sections);
    }

    /**
     * Store a newly created section in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'section_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'adviser' => 'nullable|string|max:255',
        ]);

        // Check if section_name already exists
        $existingSection = Section::where('section_name', $request->section_name)->first();
        if ($existingSection) {
            return response()->json(['error' => 'Section name already exists'], 409);
        }

        $section = Section::create($request->all());

        return response()->json($section, 201);
    }

    /**
     * Display the specified section.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $section = Section::findOrFail($id);
        return response()->json($section);
    }

    /**
     * Update the specified section in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'section_name' => 'required|string|max:255|unique:sections,section_name,' . $id,
            'description' => 'nullable|string',
            'adviser' => 'nullable|string|max:255',
        ]);

        $section = Section::findOrFail($id);
        $section->update($request->all());

        return response()->json($section, 200);
    }

    /**
     * Remove the specified section from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Section::destroy($id);

        return response()->json(['message' => 'Section deleted successfully']);
    }
}
