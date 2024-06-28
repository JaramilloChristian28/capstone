<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Strand;

class StrandController extends Controller
{
    /**
     * Display a listing of the strands.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $strands = Strand::all();
        return response()->json($strands);
    }

    /**
     * Store a newly created strand in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'strand_name' => 'required|string|max:255',
        ]);

        $strand = Strand::create($request->all());

        return response()->json($strand, 201);
    }

    /**
     * Display the specified strand.
     *
     * @param  int  $strand_id
     * @return \Illuminate\Http\Response
     */
    public function show($strand_id)
    {
        $strand = Strand::findOrFail($strand_id);
        return response()->json($strand);
    }

    /**
     * Update the specified strand in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $strand_id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $strand_id)
    {
        $request->validate([
            'strand_name' => 'required|string|max:255',
        ]);

        $strand = Strand::findOrFail($strand_id);
        $strand->update($request->all());

        return response()->json($strand, 200);
    }

    /**
     * Remove the specified strand from storage.
     *
     * @param  int  $strand_id
     * @return \Illuminate\Http\Response
     */
    public function destroy($strand_id)
    {
        Strand::destroy($strand_id);

        return response()->json(['message' => 'Strand deleted successfully']);
    }

    
}

