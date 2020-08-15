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
            <h1 :class="changeColor">{{ timeReport.experience_point }}</h1>
            <h3 style="display: inline-block">EXP</h3>
          </v-col>
        </v-row>
        <p>
          {{ timeReport.memo }}
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Tag from '../../molecules/Tag.vue'
import IconButtonWithAuth from '../../atoms/icons/IconButtonWithAuth.vue'
import ExpReductionAlert from '../ExpReductionAlert.vue'
import TimeReportModal from './TimeReportModal.vue'
import axios from '@/plugins/axios'

export default {
  components: {
    ExpReductionAlert,
    TimeReportModal,
    IconButtonWithAuth,
    Tag
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
    }
  },
  methods: {
    closeModal () {
      this.modalDisplay = false
    },
    updateTimeReport (data) {
      this.timeReport = data.time_report
      this.timeReport.experience_point = data.experience_record.experience_point
      this.timeReport.tags = data.tags
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