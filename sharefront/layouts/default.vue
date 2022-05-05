<template>
  <div class="container">
    <div class="header">
      <div class="header__logo">
        <img src="/img/logo.png">
      </div>
      <div class="header__nav">
        <NuxtLink class="header__nav-register" to="/">新規登録</NuxtLink>
        <NuxtLink class="header__nav-login" to="/login">ログイン</NuxtLink>
      </div>
    </div>
    <Nuxt />
  </div>
</template>

<style scoped>

.container{
  background-color: #15202b;
  width: 100vw;
  height: 100vh;
  margin: 0;
}

.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__logo img{
  width: 150px;
  padding: 20px;
}

.header__nav{
  display: flex;
  padding-right: 30px;
}

.header__nav-register, .header__nav-login{
  font-size: 18px;
  color: white;
  text-decoration: none;
  padding-right: 30px;
}

</style>