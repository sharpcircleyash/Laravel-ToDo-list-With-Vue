<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        $todos = Todo::all();
        return response()->json($todos);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $todo = Todo::create([
            'title' => $validatedData['title'],
            'completed' => false,
        ]);

        return response()->json($todo, 201);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'completed' => 'required|boolean',
        ]);

        $todo = Todo::findOrFail($id);
        $todo->completed = $validatedData['completed'];
        $todo->save();

        return response()->json($todo);
    }

    public function destroy($id)
    {
        $todo = Todo::findOrFail($id);
        $todo->delete();
        return response()->json(null, 204);
    }

    public function deleteAll()
    {
        $todo = Todo::where('completed', 0);
        $todo->delete();
    }
}
