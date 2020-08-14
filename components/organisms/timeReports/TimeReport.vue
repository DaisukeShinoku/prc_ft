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
      <v-btn
      icon
      style="margin-right: 10px;"
      @click.stop="modalDisplay = true"
      >
        <v-icon small v-if="authDisplay">
          far fa-edit
        </v-icon>
      </v-btn>
      <TimeReportModal
      :btnDisplay="false"
      :modalDisplay="modalDisplay"
      :editInitialValue="timeReport"
      @closeModal="closeModal"
      @updateTimeReport="updateTimeReport"
      v-if="authDisplay"
      />
      <v-icon
      small
      v-if="authDisplay"
      @click="displayAlert = true"
      >
        far fa-trash-alt
      </v-icon>
      <ExpReductionAlert
      :displayModal="displayAlert"
      @cancel="cancel"
      @understanding="understanding"
      />
      </v-card-title>
      <v-card-text>
        {{ studyTime }}
        {{ timeReport.memo }}
        {{ timeReport.experience_point }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import ExpReductionAlert from '../ExpReductionAlert.vue'
import TimeReportModal from './TimeReportModal.vue'
import axios from '@/plugins/axios'
export default {
  components: {
    ExpReductionAlert,
    TimeReportModal
  },
  props: {
    index: {
      type: Number,
      required: true
    },
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
      timeReport: this.time_report,
      displayAlert: false
    }
  },
  computed: {
    studyTime () {
      const time = new Date(this.timeReport.study_time)
      return time.getUTCHours() + '時間' + time.getUTCMinutes() + '分'
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
    }
  },
  methods: {
    closeModal () {
      this.modalDisplay = false
    },
    updateTimeReport (data) {
      this.timeReport = data.time_report
      this.timeReport.experience_point = data.experience_record.experience_point
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
          console.log(res.data)
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
    }
  }
}
</script>