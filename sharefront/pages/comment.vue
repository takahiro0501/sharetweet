<template>
  <div class="home">
    <h1 class="home__title">ホーム</h1>
    <ul class="home__list">
      <li class="home__list-item">
        <span class="home__list-item-name">{{commentData.name}}</span>
        <span class="home__list-item-good" @click="countGood(commentData.id, commentData.goodcount)">
          <img src="/img/heart.png" alt="Good!">
          {{commentData.goodcount}}
        </span>
        <span class="home__list-item-del"  @click="deleteTweet(commentData.id)">
          <img src="/img/cross.png" alt="コメント削除">
        </span>
        <p class="home__list-item-msg">{{commentData.message}}</p>
      </li>
    </ul>
    <div class="home__comment-title">コメント</div>
    <ul class="home__comment-list">
      <li class="home__comment-list-item" v-for="(item ,index) in commentData.comments" :key="index">
        <p class="home__comment-list-item-name">{{item.name}}</p>
        <p class="home__comment-list-item-cmt">{{item.comment}}</p>
      </li>
    </ul>
    <div class="comment__box">
      <validation-observer ref="obs"  v-slot="ObserverProps">
        <validation-provider v-slot="ProviderProps" rules="required|max:120">
          <textarea class="comment__input" rows="1" v-model="comment" name="コメント内容"></textarea>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
          <div class="comment__btn">
            <button class="btn" @click="registerComment" :disabled="ObserverProps.invalid || !ObserverProps.validated">コメント</button>
          </div>
        </validation-provider>
      </validation-observer>      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginUser: [],   //ログインユーザデータ。firebaseより取得
      commentData: [],  //コメントデータ。state.commentDatasと連動  
      goodcountFlg: true, //いいねボタンの増減管理
      comment: ''    //コメント内容
    }
  },
  layout() {
    return 'homeLayout';
  },
  mounted() {
  //Vuexのstate.commentDatasを監視
  this.$store.watch(
      (state, getters) => getters.commentDatas,
      (newValue, oldValue) => {
        this.commentData = newValue;
      }
    )
  },
  created(){
    //ログインユーザー情報取得
    this.loginUser = this.$store.getters.loginUser;
    //対象ツイートデータ、紐づくコメントデータを取得
    this.$store.dispatch('getComment');
    //画面名変更
    this.$store.commit('screenName','comment');
  },
  methods:{
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
    },
    registerComment(){
      const sendData = {
        share_id: this.$store.getters.tweetId,
        email: this.loginUser.email,
        name: this.loginUser.displayName,
        comment: this.comment
      };
      this.$store.dispatch('registerComment',sendData);
      this.comment = "";
    },
    //ツイート削除
    deleteTweet(id){
      this.$store.dispatch('deleteTweet',id);
      this.$router.push('/home');
    },
  }
}
</script>

<style scoped>

ul li {
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

.home__list-item {
  padding: 15px;
  border-left: 1px solid white;
  border-right: 1px solid white;
  border-bottom: 1px solid white;
  position: relative;
}

.home__list-item span{
  display: inline-block;
}

.home__list-item-good{
  cursor: pointer;
  margin-left: 10px;
}

.home__list-item img{
  width: 18px;
  height: 14px;
}

.home__list-item-del{
  cursor: pointer;
  margin-left: 10px;
}

.home__list-item img{
  width: 18px;
  height: 14px;
}

.home__list-item-cmt{
  margin-left: 30px;
  cursor: pointer;
}
.home__list-item img{
  width: 18px;
}

.home__list-item-msg{
  margin-top: 15px;
}

.home__comment-title{
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid white;
  border-left: 1px solid white;
  border-right: 1px solid white;
}

.home__comment-list-item{
  padding: 10px;
  border-bottom: 1px solid white;
  border-left: 1px solid white;
  border-right: 1px solid white;
}

.home__comment-list-item-name{
  padding-bottom: 10px;
}

.home__comment-list-item-cmt{
  font-size: 12px;
}

.comment__box{
  margin: 0 10px 0 10px ;
}

.comment__input{
  width: 95%;
  background-color: #15202b;
  border: 1px solid white;
  border-radius: 15px;
  resize: none;
  color: white;
  margin-top: 15px;

}

.comment__btn{
  text-align: right;
  margin-top: 10px;
}

.btn{
  padding: 10px 15px;
  color: white;
  background-color: #5318da;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.error{
  color: white;
}

</style>
