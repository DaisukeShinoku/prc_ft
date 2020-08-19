<template>
  <v-container>
    <v-card class="mx-auto mt-5 pa-5" width="600px">
      <v-card-title>
        <v-avatar size="40">
          <img src="~/assets/default_icon.jpeg" />
        </v-avatar>
        <span style="margin-left: 15px;">{{ user.name }}</span>
      <small style="color: #BDBDBD; margin-left: 10px">
        @{{ user.screen_name }}
      </small>
      <v-spacer />
      <IconButtonWithAuth
      type="far fa-edit"
      v-if="authDisplay"
      :comparison="timeReport.user_id"
      @click.stop="modalDisplay = true"
      small
      />
      <TimeReportModal
      :btnDisplay="false"
      :modalDisplay="modalDisplay"
      :editInitialValue="timeReport"
      @closeModal="closeModal"
      @updateTimeReport="updateTimeReport"
      v-if="authDisplay"
      />
      <IconButtonWithAuth
      type="far fa-trash-alt"
      v-if="authDisplay"
      :comparison="timeReport.user_id"
      style="margin-right: 10px;"
      @click="displayAlert = true"
      small
      />
      <ExpReductionAlert
      :displayModal="displayAlert"
      @cancel="cancel"
      @understanding="understanding"
      v-if="authDisplay"
      />
      </v-card-title>
      <v-card-text style="margin-top: 10px">
        <nuxt-link :to="toLink" style="color: inherit; text-decoration: none;">
          <v-row style="margin-left: 20px; margin-bottom: 10px;">
            <Tag v-for="tag in timeReport.tags" :tag="tag.name" :key="tag.id" />
          </v-row>
          <v-row>
            <v-col>
              <v-icon small style="margin-left: 20px; margin-right: 10px">
                far fa-clock
              </v-icon>
              <h1 :class="changeColor">{{ studyHour }}</h1>
              <span>時間</span>
              <h1 :class="changeColor">{{ studyMinute }}</h1>
              <span>分</span>
            </v-col>
            <v-col>
              <v-icon small style="margin-right: 10px">fas fa-pencil-alt</v-icon>
              <h1 :class="changeColor" v-if="timeReport.experience_record">
                {{ timeReport.experience_record.experience_point }}
              </h1>
              <h3 style="display: inline-block">EXP</h3>
            </v-col>
          </v-row>
          <p>
            {{ timeReport.memo }}
          </p>
        </nuxt-link>
        <v-row style="margin-top: 10px; margin-left: 5px;">
          <IconButton
          type="far fa-comment-dots"
          @on="commentForm = !commentForm"
          />
        </v-row>
        <CommentForm
        v-if="commentForm && currentUser"
        :timeReportId="timeReport.id"
        @addComment="addComment"
        />
        <template v-if="commentForm">
          <Comment
          v-for="comment in timeReport.comments"
          :key="comment.id"
          :comment="comment"
          @deleteComment="deleteComment"
          />
        </template>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Tag from '../../molecules/Tag.vue'
import IconButton from '../../atoms/icons/IconButton.vue'
import IconButtonWithAuth from '../../atoms/icons/IconButtonWithAuth.vue'
import CommentForm from '../../molecules/CommentForm.vue'
import Comment from '../Comment.vue'
import ExpReductionAlert from '../ExpReductionAlert.vue'
import TimeReportModal from './TimeReportModal.vue'
import axios from '@/plugins/axios'
export default {
  components: {
    ExpReductionAlert,
    TimeReportModal,
    IconButtonWithAuth,
    Tag,
    IconButton,
    CommentForm,
    Comment
  },
  props: {
    time_report: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      modalDisplay: false,
      timeReport: { ...this.time_report, comments: [] },
      displayAlert: false,
      commentForm: false
    }
  },
  computed: {
    studyHour () {
      const time = new Date(this.timeReport.study_time)
      return time.getUTCHours()
    },
    studyMinute () {
      const time = new Date(this.timeReport.study_time)
      return time.getUTCMinutes()
    },
    currentUser () {
      return this.$store.state.currentUser
    },
    authDisplay () {
      if (this.currentUser && this.currentUser.id === this.timeReport.user_id) {
        return true
      } else {
        return false
      }
    },
    changeColor () {
      const time = Number(this.studyHour) * 60 + Number(this.studyMinute)
      if (time >= 180) {
        return 'amber--text text--darken-4'
      } else if (time >= 120) {
        return 'amber--text text--darken-3'
      } else if (time >= 60) {
        return 'amber--text text--darken-2'
      } else if (time >= 30) {
        return 'amber--text text--lighten-1'
      } else {
        return 'amber--text text--lighten-2'
      }
    },
    toLink () {
      return `/time_reports/${this.timeReport.id}`
    }
  },
  watch: {
    time_report (newValue) {
      this.timeReport = newValue
    },
    timeReport (newValue) {
      this.timeReport = newValue
    }
  },
  methods: {
    closeModal () {
      this.modalDisplay = false
    },
    updateTimeReport (data) {
      const comments = this.timeReport.comments
      this.timeReport = data.time_report
      this.timeReport.experience_record = data.experience_record
      this.timeReport.tags = data.tags
      this.timeReport.comments = comments
      this.$emit('updateTimeReport', data)
    },
    deleteTimeReport () {
      const timeReportId = this.timeReport.id
      axios
        .delete(`/v1/time_reports/${timeReportId}`, {
          params: {
            user_id: this.currentUser.id
          }
        })
        .then((res) => {
          this.$emit('updateTimeReport', res.data)
          this.$emit('deleteTimeReport', timeReportId)
          this.$store.commit('drawing/setFlash', {
            status: true,
            type: 'success',
            message: '記録を削除しました'
          })
          setTimeout(() => {
            this.$store.commit('drawing/setFlash', {})
          }, 2000)
        })
    },
    cancel () {
      this.displayAlert = false
    },
    understanding () {
      this.displayAlert = false
      this.deleteTimeReport()
    },
    addComment (comment) {
      this.commentForm = false
      if (!this.timeReport.comments) {
        this.timeReport.comments = []
      }
      this.timeReport.comments.unshift(comment)
    },
    deleteComment (commentId) {
      this.timeReport.comments = this.timeReport.comments.filter((t) => {
        return t.id !== commentId
      })
    }
  }
}
</script>

<style scoped>
h1 {
  display: inline-block;
  font-size: 3.0em;
  margin-right: 5px;
}
</style>