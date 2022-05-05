<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'share_id' => 2,
            'email' => '123abc@test.com',
            'name' => 'hanako',
            'comment' => '私も眠たいです',
        ];
        DB::table('comments')->insert($param);

        $param = [
            'share_id' => 3,
            'email' => '123@test.com',
            'name' => 'taro',
            'comment' => '一緒にご飯たべに行きましょう！！',
        ];
        DB::table('comments')->insert($param);

        $param = [
            'share_id' => 3,
            'email' => 'abc@test.com',
            'name' => 'jiro',
            'comment' => '眠たいです。お腹もすきました。',
        ];
        DB::table('comments')->insert($param);
    }
}
