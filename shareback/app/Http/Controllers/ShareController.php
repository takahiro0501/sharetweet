<?php

namespace App\Http\Controllers;

use App\Models\Share;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class ShareController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = Share::all();
        return response()->json([
            'data' => $items
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $item = Share::create($request->all());
        Log::debug($item);
        return response()->json([
            'data' => $item
        ],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Share  $share
     * @return \Illuminate\Http\Response
     */
    public function show(Share $share)
    {
        $item = Share::with('comments')->find($share)->first();
        if($item){
            return response()->json([
                'data' => $item
            ],200);
        } else {
            return response()->json([
                'message' => 'データが見つかりません..',
            ],404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Share  $share
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Share $share)
    {
        $update = [
            'goodcount' => $request->goodcount
        ];
        $item = Share::where('id', $share->id)->update($update);
        if($item){
            return response()->json([
                'message' => 'Good追加成功'
            ],200);
        } else {
            return response()->json([
                'message' => 'アップデート失敗'
            ],404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Share  $share
     * @return \Illuminate\Http\Response
     */
    public function destroy(Share $share)
    {
        //リレーション先のcommentsデータを削除
        $share->comments()->each(function ($comment) {
            $comment->delete();
        });
        //shareデータを削除
        $item = Share::Where('id', $share->id)->delete();
        if($item){
            return response()->json([
                'message' => '削除成功'
            ],200);
        } else {
            return response()->json([
                'message' => '削除失敗'
            ],404);
        }
    }
}
