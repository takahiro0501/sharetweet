import Vuex from 'vuex'
import firebase from '~/plugins/firebase'
import createPersistedState from 'vuex-persistedstate'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loginUser: {
        displayName: '',
        email: ''
      },
      tweetDatas: [],
      tweetId: null,
      commentDatas: [],
      screenName: ''
    },
    getters: {
      loginUser(state) { return state.loginUser },
      tweetDatas(state) { return state.tweetDatas },
      tweetId(state) { return state.tweetId },
      commentDatas(state) { return state.commentDatas },
      screenName(state) { return state.screenName }
    },
    mutations: {
      loginUser(state, user) {
        state.loginUser.displayName = user.displayName;
        state.loginUser.email = user.email;
      },
      tweetDatas(state, tweetDatas) {
        state.tweetDatas = tweetDatas;
      },
      tweetId(state, tweetId) {
        state.tweetId = tweetId;
      },
      commentDatas(state, commentDatas) {
        state.commentDatas = commentDatas;
      },
      screenName(state, screenName) {
        state.screenName = screenName;
      },
      
    },
    actions: {
      //ユーザ登録処理
      registerUser(state, { name, email, password }) {
        firebase.auth()
          .createUserWithEmailAndPassword(email,password)
          .then((data) => {
            data.user.updateProfile({ displayName: name })
          })
          .then(() => {
            this.$router.replace('/login')
          })
          .catch((error) => {
            switch (error.code) {
              case 'auth/invalid-email':
                alert('メールアドレスの形式が違います。')
                break
              case 'auth/email-already-in-use':
                alert('このメールアドレスはすでに使われています。')
                break
              case 'auth/weak-password':
                alert('パスワードは6文字以上で入力してください。')
                break
              default:
                alert('エラーが起きました。しばらくしてから再度お試しください。')
                break
            }
          })
      },
      //ログイン処理
      login(state, { email, password }) {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(() => {
            this.$router.push('/home')
          })
          .catch((error) => {
            switch (error.code) {
              case 'auth/invalid-email':
                alert('メールアドレスの形式が違います。')
                break
              case 'auth/email-already-in-use':
                alert('このメールアドレスはすでに使われています。')
                break
              case 'auth/weak-password':
                alert('パスワードは6文字以上で入力してください。')
                break
              default:
                alert('エラーが起きました。しばらくしてから再度お試しください。')
                break
            }
          })
      },
      //ログアウト処理
      logout() {
        firebase.auth().signOut()
          .then(() => {
            console.log("ログアウト成功");
          })
          .catch((error) => {
            console.log('ログアウトエラー：　' + error.message);
          })
      },
      //ユーザ情報取得
      async getUserInfo({ commit, dispatch}) {
        await dispatch('getAllTweet');
        return new Promise((resolve, reject) => {
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              commit('loginUser', user);
              console.log(this.state.loginUser);
              return resolve('getUserInfo成功');
            } else {
              return reject('getUserInfo失敗');
            }
          })
        })
      },
      //ツイートデータ全取得
      async getAllTweet({ commit }) {
        const resData = await this.$axios.get("http://127.0.0.1:8000/api/v1/share/");
        commit('tweetDatas',resData.data.data);
      },
      //ツイートデータ登録
      async registerTweet({ dispatch }, sendData) {
        await this.$axios.post("http://127.0.0.1:8000/api/v1/share/", sendData);
        dispatch('getAllTweet');
      },
      //ツイートデータ削除
      async deleteTweet({ dispatch }, id) {
        await this.$axios.delete("http://127.0.0.1:8000/api/v1/share/" + id);
        //ホーム画面のとき、ツイートデータを再取得
        if (this.state.screenName == 'home') {
          dispatch('getAllTweet');
        }
      },
      //グッド数変更
      async countGood({ dispatch ,getters }, {id ,goodcount}) {
        const sendData = {
          goodcount: goodcount
        };
        await this.$axios.put("http://127.0.0.1:8000/api/v1/share/" + id , sendData);
        //画面名により、取得データを変更
        if (this.state.screenName == 'home') {
          dispatch('getAllTweet');          
        } else if  (this.state.screenName == 'comment') {
          dispatch('getComment');          
        }
      },
      //コメントデータ取得
      async getComment({ commit, getters }) {
        const id = getters.tweetId;
        const resData = await this.$axios.get("http://127.0.0.1:8000/api/v1/share/" + id);
        commit('commentDatas', resData.data.data);
      },
      //コメント登録
      async registerComment({ dispatch } ,sendData) {
        await this.$axios.post("http://127.0.0.1:8000/api/v1/comment/",sendData);
        dispatch('getComment');
      }
    },
    plugins: [createPersistedState({
      key: 'shareTweet-coach',
      paths: [
        'loginUser',
        'tweetId',
        'screenName'
        ],
      storage: window.sessionStorage
      }
    )]
  })
}

export default createStore
