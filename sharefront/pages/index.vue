<template>
  <div class="form">
    <h1 class="form__title">新規登録</h1>
    <div class="form__input">
      <validation-observer ref="obs"  v-slot="ObserverProps">
      <div class="form__input-box">
        <validation-provider v-slot="ProviderProps" rules="required|max:20">
          <input v-model="name" name="ユーザネーム" type="text" placeholder="ユーザーネーム" />
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>
      </div>
      <div class="form__input-box">
        <validation-provider v-slot="ProviderProps" rules="required">
          <input v-model="email" name="メールアドレス" type="email" placeholder="メールアドレス" />
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>
      </div>
      <div class="form__input-box">
        <validation-provider v-slot="ProviderProps" rules="required|min:6">
          <input v-model="password" name="パスワード" type="password" placeholder="パスワード" required/>
          <div class="error">{{ ProviderProps.errors[0] }}</div>
        </validation-provider>
      </div>
      <div class="form__input-btn">
        <button @click="register" :disabled="ObserverProps.invalid || !ObserverProps.validated">新規登録</button>
      </div>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      this.$store.dispatch('registerUser',{ name: this.name, email: this.email, password: this.password});
    }
  }
}
</script>


<style scoped>

.form{
  width: 25%;
  margin: 100px auto 0 auto;
  padding: 10px 20px;
  background-color: white;
  border-radius: 5px;
}

.form__title{
  font-size: 20px;
  margin: 10px ;
  text-align: center;
}

.form__input{
  display: flex;
  flex-flow: column;
  text-align: center;
}

.form__input-box{
  margin: 5px 0;
}

.form__input-box input{
  width: 70%;
  padding: 5px;
  border-radius: 10px;
}

.form__input-btn button{
  color: white;
  background-color: #5318da;
  padding: 5px 20px;
  margin-top: 10px;
  border-radius: 20px;
}

</style>