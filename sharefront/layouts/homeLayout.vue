<template>
  <div class="container">
    <div class="header">
      <div class="header__logo">
        <img src="/img/logo.png">
      </div>
      <div class="header__nav">
        <ul class="header__nav-list">
          <li class="header__nav-list-home home-icon" @click="home">ホーム</li>
          <li class="header__nav-list-logout logout-icon" @click="logout">ログアウト</li>
        </ul>
      </div>
      <div class="share">
        <p class="share__title">シェア</p>
        <validation-observer ref="obs"  v-slot="ObserverProps">
          <validation-provider v-slot="ProviderProps" rules="required|max:120">
            <textarea class="share__input" rows="10" v-model="tweet" name="ツイート内容"></textarea>
            <div class="error">{{ ProviderProps.errors[0] }}</div>
            <div class="share__btn">
              <button class="btn" @click="share" :disabled="ObserverProps.invalid || !ObserverProps.validated">シェアする</button>
            </div>
          </validation-provider>
        </validation-observer>
      </div>
    </div>
    <div class="contents">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tweet: ''
    }
  },
  methods: {
    home(){
      this.$router.push('/home');
    },
    logout(){
      this.$store.dispatch('logout');
      this.$router.push('/login');
    },
    share(){
      const loginUser = this.$store.getters.loginUser;
      const sendData = {
        email: loginUser.email,
        name: loginUser.displayName,
        message: this.tweet,
        goodcount: 0
      };
      this.$store.dispatch('registerTweet',sendData);
      this.tweet = '';
    }
  },
}
</script>


<style scoped>

.container{
  display: flex;
  min-height: 100vh;
  background-color: #15202b;
  background-size: cover;
  margin: 0;
}

.header{
  width: 25%;
  margin: 15px 0 0 10px;
}

.contents{
  width: 75%;
}

.header__logo img{
  width: 100px;
}

.header__nav-list {
  position: relative;
  padding-top: 20px;
}

.header__nav-list li{
  width: 80px;
  color: white;
  margin-top: 20px;
  padding: 5px 5px 5px 40px ;
  cursor: pointer;
}

.home-icon::before{
  content: url(/img/home.png);
  display: inline-block;
  transform: scale(0.1);
  position: absolute;
  top: -80px;
  left: -110px;
}

.logout-icon::before{
  content: url(/img/logout.png);
  display: inline-block;
  transform: scale(0.1);
  position: absolute;
  top: -30px;
  left: -110px;
}

.share{
  margin-top: 40px;
  margin-left: 10px;
}

.share__title{
  color: white;
  margin: 15px 0;
}

.share__input{
  width: 80%;
  background-color: #15202b;
  border: 1px solid white;
  border-radius: 10px;
  resize: none;
  color: white;
}

.share__btn{
  width: 80%;
  text-align: right;
  margin-top: 20px;
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