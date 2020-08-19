<template>
  <ValidationObserver ef="obs" v-slot="{ passes }">
      <VTextAreaWithValidation
      rules="max:280|required"
      :counter="280"
      label="コメント"
      v-model="comment"
      />
      <v-row>
        <v-spacer />
        <v-btn
        color="blue darken-1"
        text
        @click="passes(sendComment)"
        style="margin-top: 10px;"
        >Send</v-btn>
      </v-row>
  </ValidationObserver>
</template>

<script>
import VTextAreaWithValidation from './inputs/VTextAreaWithValidation.vue'
import axios from '@/plugins/axios'
export default {
  components: {
    VTextAreaWithValidation
  },
  props: {
    timeReportId: {
      type: [String, Number],
      required: true
    }
  },
  data: () => ({
    comment: ''
  }),
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    sendComment () {
      const comment = {
        content: this.comment,
        user_id: this.currentUser.id,
        time_report_id: this.timeReportId
      }
      axios
        .post('/v1/comments', { comment })
        .then((res) => {
          this.$emit('addComment', res.data)
          this.comment = ''
          this.$store.commit('drawing/setFlash', {
            status: true,
            type: 'success',
            message: 'コメントを投稿しました'
          })
          setTimeout(() => {
            this.$store.commit('drawing/setFlash', {})
          }, 2000)
        })
    }
  }
}
</script>