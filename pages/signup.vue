<template>
  <v-card class="mx-auto mt-5 pa-5" width="500px">
    <v-card-title>
      <h1 class="display-1">新規登録</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="name" :counter="10" label="名前" data-vv-name="name" required></v-text-field>
        <v-text-field v-model="email" label="メールアドレス" data-vv-name="email" required></v-text-field>
        <v-text-field v-model="screen_name" label="ユーザーID" data-vv-name="screen_name" required></v-text-field>
        <v-text-field
          v-model="password"
          label="パスワード"
          data-vv-name="password"
          required
          :type="show1 ? 'text' : 'password'"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
        ></v-text-field>
        <v-text-field
          v-model="passwordConfirm"
          label="パスワードの確認"
          data-vv-name="passwordConfirm"
          required
          :type="show2 ? 'text' : 'password'"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show2 = !show2"
        ></v-text-field>
        <v-btn class="mr-4 light-green lighten-3 mx-auto" @click="signup">登録</v-btn>
        <p v-if="error" class="errors">{{error}}</p>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from '@/plugins/axios'
import firebase from '@/plugins/firebase'
export default {
  data () {
    return {
      email: '',
      name: '',
      screen_name: '',
      password: '',
      passwordConfirm: '',
      show1: false,
      show2: false,
      error: ''
    }
  },
  methods: {
    signup () {
      if (this.password !== this.passwordConfirm) {
        this.error = '※パスワードとパスワード確認が一致していません'
      }
      this.$store.commit('setLoading', true)
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          const user = {
            email: res.user.email,
            name: this.name,
            screen_name: this.screen_name,
            uid: res.user.uid
          }
          axios.post('/v1/users', { user }).then((responce) => {
            this.$store.commit('setLoading', false)
            this.$store.commit('setUser', responce.data)
            this.$router.push('/')
          })
        })
        .catch((error) => {
          this.error = ((code) => {
            this.$store.commit('setLoading', false)
            switch (code) {
              case 'auth/email-already-in-use':
                return '既にそのメールアドレスは使われています'
              case 'auth/wrong-password':
                return '※パスワードが正しくありません'
              case 'auth/weak-password':
                return '※パスワードは最低6文字以上にしてください'
              default:
                return '※メールアドレスとパスワードをご確認ください'
            }
          })(error.code)
        })
    }
  }
}
</script>

<style scoped>
.errors {
  color: red;
  margin-top: 20px;
}
</style>