<template>
  <div class="home">
    <div class="home__title">ホーム</div>
    <ul class="home__tweetlist">
      <li class="home__tweetlist-item" v-for="(item , index) in tweetDatas" :key="index">
        <span class="home__tweetlist-item-name">{{item.name}}</span>
        <span class="home__tweetlist-item-good" @click="countGood(item.id,item.goodcount)">
          <img src="/img/heart.png" alt="Good!">
          {{item.goodcount}}
        </span>
        <span class="home__tweetlist-item-del" @click="deleteTweet(item)">
          <img src="/img/cross.png" alt="コメント削除">
        </span>
        <span class="home__tweetlist-item-cmt" @click="toComment(item.id)">
          <img src="/img/detail.png" alt="コメント画面へ">
        </span>
        <p class="home__tweetlist-item-msg">{{item.message}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginUser: [],      //ログインユーザデータ。firebaseより取得
      tweetDatas: [],     //ツイート全データ。state.tweetDatasと連動
      goodcountFlg: true  //いいねボタンの増減管理
    }
  },
  layout() {
    return 'homeLayout';
  },
  mounted() {
  //Vuexのstate.tweetDatasを監視
  this.$store.watch(
      (state, getters) => getters.tweetDatas,
      (newValue, oldValue) => {
        this.tweetDatas = newValue;
      }
    )
  },
  //
  created(){
    //ユーザ情報、ツイートデータを取得
    this.$store.dispatch('getUserInfo')
      .then(result => {
        this.loginUser = this.$store.getters.loginUser;
        this.tweetDatas = this.$store.getters.tweetDatas;
        console.log(result);
      }).catch(err => {
        console.log(err);
      }
    );
    //画面名変更
    this.$store.commit('screenName','home');
  },
  methods:{
    //コメント画面へ遷移
    toComment(id) {
      this.$store.commit('tweetId',id);
      this.$router.push('/comment');
    },
    //ツイート削除
    deleteTweet(item){
      this.$store.dispatch('deleteTweet',item.id);
    },
    //いいね数の増減
    countGood(id,goodcount){
      if(this.goodcountFlg){
        goodcount++;
        this.$store.dispatch('countGood',{ id, goodcount});
        this.goodcountFlg = false;
      } else {
        goodcount--; 
        this.$store.dispatch('countGood',{ id, goodcount});
        this.goodcountFlg = true;
      }
    }
  }
}
</script>

<style scoped>
ul li{
  list-style: none;
}

.home {
  display:flex;
  flex-flow: column;
  color: white;
}

.home__title{
  padding: 15px;
  border: 1px solid white;
  font-size: 20px;
}

.home__tweetlist-item {
  padding: 15px;
  border-left: 1px solid white;
  border-right: 1px solid white;
  border-bottom: 1px solid white;
  position: relative;
}

.home__tweetlist-item span{
  display: inline-block;
}

.home__tweetlist-item-good{
  cursor: pointer;
  margin-left: 10px;
}

.home__tweetlist-item-good img{
  width: 18px;
  height: 14px;
}

.home__tweetlist-item-del{
  cursor: pointer;
  margin-left: 10px;
}

.home__tweetlist-item-del img{
  width: 18px;
  height: 14px;
}

.home__tweetlist-item-cmt{
  margin-left: 30px;
  cursor: pointer;
}
.home__tweetlist-item-cmt img{
  width: 18px;
}

.home__tweetlist-item-msg{
  margin-top: 15px;
}

</style>
