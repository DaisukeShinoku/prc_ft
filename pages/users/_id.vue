<template>
<div>
  <ErrorCard
  :display="userNotFound"
  title="404 not found"
  message="ユーザーが存在しません。"
  >
  </ErrorCard>
  <v-container v-if="!userNotFound">
    <v-card class="mx-auto mt-5 pa-5" width="1000px">
      <v-row>
        <v-layout justify-center>
          <v-avatar size="80">
            <img src="~/assets/default_icon.jpeg" />
          </v-avatar>
        </v-layout>
      </v-row>
      <v-row justify="center">
        <h2>{{ user.name }}</h2>
      </v-row>
      <v-row justify="center">
        <span>@{{ user.screen_name }}</span>
      </v-row>
      <!-- <v-row justify="center">
        <img src="~/assets/goal.jpeg" width="32px" height="32px" />
      </v-row> -->
      <v-row>
        <v-col>
          <h2>Lv.1</h2>
        </v-col>
        <v-col>
          <v-progress-linear height="10px">
          </v-progress-linear>
        </v-col>
      </v-row>
      <v-row justify="center">
        <Heatmap></Heatmap>
      </v-row>
    </v-card>
  </v-container>
</div>
</template>

<script>
import axios from '@/plugins/axios'
import ErrorCard from '~/components/molecules/error-card.vue'
import Heatmap from '~/components/molecules/Heatmap.vue'
export default {
  components: {
    ErrorCard,
    Heatmap
  },
  data () {
    return {
      user: {},
      userNotFound: false,
      errorTitle: 'エラー',
      errorMessage: 'エラーが発生しました。'
    }
  },
  mounted () {
    axios
      .get(`/v1/users/${this.$route.params.id}`)
      .then((response) => { this.user = response.data })
      .catch((error) => {
        if (error.response.status === 404) {
          this.userNotFound = true
          this.errorTitle = '404 not find'
          this.errorMessage = 'ユーザーが存在しません。'
        }
        console.error(error)
      })
  }
}
</script>

<style>
h2 {
  margin-top: 12px;
}
</style>