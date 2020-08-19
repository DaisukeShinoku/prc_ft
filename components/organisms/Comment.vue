<template>
  <v-container>
    <v-card class="mx-auto mt-5 pa-5" width="600px">
      <v-card-title>
        <v-avatar size="40">
          <img src="~/assets/default_icon.jpeg" />
        </v-avatar>
        <span style="margin-left: 15px;">
          {{ comment.user.name }}
        </span>
      <small style="color: #BDBDBD; margin-left: 10px">
        @{{ comment.user.screen_name }}
      </small>
      <v-spacer />
      <IconButtonWithAuth
      type="far fa-trash-alt"
      :comparison="comment.user_id"
      style="margin-right: 10px;"
      @click="deleteComment"
      small
      />
      </v-card-title>
      <v-card-text>
        {{ comment.content }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from '@/plugins/axios'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    deleteComment () {
      const confirm = window.confirm('削除しますか？') // eslint-disable-line
      if (confirm) {
        const commentId = this.comment.id
        axios
          .delete(`/v1/comments/${commentId}`)
          .then((res) => {
            this.$emit('deleteComment', commentId)
            this.$store.commit('drawing/setFlash', {
              status: true,
              type: 'success',
              message: 'コメントを削除しました'
            })
            setTimeout(() => {
              this.$store.commit('drawing/setFlash', {})
            }, 2000)
          })
      }
    }
  }
}
</script>