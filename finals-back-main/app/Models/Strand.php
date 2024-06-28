<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Strand extends Model
{
    use HasFactory;

    protected $primaryKey = 'strand_id';

    protected $fillable = [
        'strand_name',
        'description', // Add the 'description' field here
    ];
}
