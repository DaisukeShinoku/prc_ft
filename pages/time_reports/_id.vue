<template>
  <v-container>
    <ErrorCard
    :display="notFound"
    title="404 not find"
    message="記録が存在しません。"
    />
    <TimeReport
    v-if="!notFound"
    :time_report="timeReport"
    :user="user"
    @updateTimeReport="updateExperience"
    @deleteTimeReport="deleteTimeReport"
    >
    </TimeReport>
  </v-container>
</template>

<script>
import axios from '@/plugins/axios'
import ErrorCard from '~/components/molecules/ErrorCard.vue'
import TimeReport from '~/components/organisms/timeReports/TimeReport.vue'
export default {
  components: {
    TimeReport,
    ErrorCard
  },
  data () {
    return {
      user: {},
      timeReport: {},
      notFound: false
    }
  },
  methods: {
    updateExperience (data) {
      this.$store.commit('experience/setExperience', data.experience)
      this.$store.commit('setLevel', data.experience.level)
    },
    deleteTimeReport () {
      this.$router.push(`/users/${this.user.id}`)
    }
  },
  mounted () {
    axios
      .get(`/v1/time_reports/${this.$route.params.id}`)
      .then((response) => {
        const timeReport = JSON.parse(response.data.time_report)
        const user = JSON.parse(response.data.user)
        this.user = user
        this.timeReport = timeReport
      })
      .catch((error) => {
        if (error.response.status === 404) {
          this.notFound = true
        }
        console.error(error)
      })
  }
}
</script>