<template>
  <ValidationObserver ef="obs" v-slot="{ passes }">
    <v-card class="mx-auto mt-5 pa-5" width="500px">
      <v-card-title>
        <h1 class="display-1">新規登録</h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <VTextFieldWithValidation
          v-model="name"
          rules="max:20|required"
          :counter="20"
          label="名前"
          />
          <VTextFieldWithValidation
          v-model="email"
          rules="max:255|required|email"
          label="メールアドレス"
          />
          <span>必須項目ではありません。（仮）</span>
          <VTextFieldWithValidation
          v-model="screen_name"
          :rules="{ min: 5, max: 15, regex: /^[a-z0-9_]+$/i }"
          label="ユーザーID"
          />
          <VTextFieldWithValidation
          v-model="password"
          rules="required|min:6"
          label="パスワード"
          :type="show1 ? 'text' : 'password'"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
          vid="password"
          />
          <VTextFieldWithValidation
          v-model="passwordConfirm"
          rules="required|min:6|confirmed:パスワード"
          label="パスワードの確認"
          :type="show2 ? 'text' : 'password'"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show2 = !show2"
          />
          <v-btn class="mr-4 light-green lighten-3 mx-auto" @click="passes(signup)">登録</v-btn>
          <p v-if="error" class="errors">{{error}}</p>
        </v-form>
      </v-card-text>
    </v-card>
  </ValidationObserver>
</template>

<script>
import VTextFieldWithValidation from '~/components/molecules/inputs/VTextFieldWithValidation.vue'
import axios from '@/plugins/axios'
import firebase from '@/plugins/firebase'
export default {
  components: {
    VTextFieldWithValidation
  },
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
      this.$store.commit('drawing/setLoading', true)
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
            this.$store.commit('drawing/setLoading', false)
            this.$store.commit('drawing/setFlash', {
              status: true,
              type: 'success',
              message: 'ログインしました'
            })
            setTimeout(() => {
              this.$store.commit('drawing/setFlash', {})
            }, 2000)
            this.$store.commit('setUser', responce.data)
            this.$router.push('/')
          })
        })
        .catch((error) => {
          this.error = ((code) => {
            this.$store.commit('drawing/setLoading', false)
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