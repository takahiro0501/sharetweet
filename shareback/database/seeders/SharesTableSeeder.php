<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SharesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'email' => 'abc@test.com',
            'name' => 'taro',
            'message' => '今日はいい天気ですね！',
            'goodcount' => 0
        ];
        DB::table('shares')->insert($param);

        $param = [
            'email' => '123@test.com',
            'name' => 'jiro',
            'message' => '眠たいですね。',
            'goodcount' => 3
        ];
        DB::table('shares')->insert($param);

        $param = [
            'email' => '123abc@test.com',
            'name' => 'hanako',
            'message' => 'お腹が減ったよ。ご飯食べに行きましょう',
            'goodcount' => 20
        ];
        DB::table('shares')->insert($param);
    }
}
