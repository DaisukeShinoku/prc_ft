<template>
<div>
  <ErrorCard
  :display="userNotFound"
  title="404 not find"
  message="ユーザーが存在しません。"
  />
  <v-container v-if="!userNotFound">
    <v-card class="mx-auto mt-5 pa-5" width="1000px">
      <v-row justify="center">
        <v-col cols="2" style="color: #FFD54F;">
          <v-row justify="center" style="margin-top: 48px;">
            <h1>Lv.{{ user.level }}</h1>
          </v-row>
          <v-row justify="center">
            <span>current Level</span>
          </v-row>
        </v-col>
        <v-col cols="4">
          <v-row justify="center">
            <v-avatar size="80">
              <img src="~/assets/default_icon.jpeg" />
            </v-avatar>
          </v-row>
          <v-row justify="center">
            <h2>{{ user.name }}</h2>
          </v-row>
          <v-row justify="center">
            <span>@{{ user.screen_name }}</span>
          </v-row>
        </v-col>
        <v-col cols="2" style="color: #FFD54F;">
          <v-row justify="center" style="margin-top: 48px;">
            <h1>{{ user.total_experience }}</h1>
          </v-row>
          <v-row justify="center">
            <span>Total EXP</span>
          </v-row>
        </v-col>
      </v-row>
      <!-- <v-row justify="center">
        <img src="~/assets/goal.jpeg" width="32px" height="32px" />
      </v-row> -->
      <v-row justify="center" align-content="center">
        <v-col cols="1">
        </v-col>
        <v-col cols="7">
          <v-progress-linear height="10px" :value="progressProportion">
          </v-progress-linear>
        </v-col>
        <v-col cols="1" style="padding-top: 6px; color: #B0BEC5;">
          {{ progressNumeretor }}/{{ requiredExp.required_exp }}
        </v-col>
      </v-row>
      <v-row justify="center">
        <Heatmap :timeReports="timeReports" />
      </v-row>
    </v-card>
  </v-container>
  <TimeReport
  v-for="(time_report, index) in timeReports"
  :key="time_report.id"
  :index="index"
  :user="user"
  :time_report="time_report"
  />
</div>
</template>

<script>
import axios from '@/plugins/axios'
import ErrorCard from '~/components/molecules/ErrorCard.vue'
import Heatmap from '~/components/molecules/Heatmap.vue'
import TimeReport from '~/components/molecules/TimeReport.vue'
export default {
  components: {
    ErrorCard,
    Heatmap,
    TimeReport
  },
  data () {
    return {
      user: {},
      timeReports: [],
      requiredExp: {},
      userNotFound: false,
      errorTitle: '',
      errorMessage: ''
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    },
    progressProportion () {
      const proportion = 100 - this.user.experience_to_next / this.requiredExp.required_exp * 100
      if (proportion === 100) {
        return 0
      } else {
        return proportion
      }
    },
    progressNumeretor () {
      return this.requiredExp.required_exp - this.user.experience_to_next
    }
  },
  mounted () {
    axios
      .get(`/v1/users/${this.$route.params.id}`)
      .then((response) => {
        this.user = response.data.user
        this.timeReports = response.data.time_reports
        this.requiredExp = response.data.required_exp
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.userNotFound = true
          this.errorTitle = '404 not find'
          this.errorMessage = 'ユーザーが存在しません。'
        }
        console.error(error)
      })
    // 新しい記録を一覧に追加
    this.$store.subscribe((mutation, state) => {
      const currentUserId = this.currentUser.id.toString()
      if (mutation.type === 'timeReport/setTimeReport') {
        if (currentUserId === this.$route.params.id) {
          this.timeReports.unshift(mutation.payload.timeReport)
        }
      } else if (mutation.type === 'experience/setExperienceRecord') {
        if (currentUserId === this.$route.params.id) {
          Object.assign(this.timeReports[0], mutation.payload.experienceRecord)
        }
      } else if (mutation.type === 'experience/setExperience') {
        if (currentUserId === this.$route.params.id) {
          Object.assign(this.user, mutation.payload.experience)
        }
      } else if (mutation.type === 'experience/setRequiredExp') {
        if (currentUserId === this.$route.params.id) {
          this.requiredExp = mutation.payload.requiredExp
        }
      }
    })
  }
}
</script>

<style scoped>
h2 {
  margin-top: 12px;
}
div.user-level {
  margin: 0;
  padding: 0;
}
div.user-level h2 {
  margin: 0;
}
</style>
