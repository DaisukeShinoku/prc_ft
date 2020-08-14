<template>
  <TimeReportForm
  @record="addTimeReport"
  @closeModal="closeModal"
  >
  </TimeReportForm>
</template>

<script>
import TimeReportForm from './TimeReportForm.vue'
import axios from '@/plugins/axios'
export default {
  components: {
    TimeReportForm
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  },
  methods: {
    addTimeReport (timeReport) {
      axios
        .post('/v1/time_reports', {
          time_report: timeReport,
          user_id: this.currentUser.id
        })
        .then((res) => {
          this.$emit('closeModal')
          const timeReport = res.data.time_report
          const experienceRecord = res.data.experience_record
          const experience = res.data.experience
          const requiredExp = res.data.required_exp
          this.$store.commit('timeReport/setTimeReport', timeReport)
          this.$store.commit('experience/setExperienceRecord', experienceRecord)
          this.$store.commit('experience/setExperience', experience)
          this.$store.commit('experience/setRequiredExp', requiredExp)
          this.$store.commit('drawing/setFlash', {
            status: true,
            type: 'success',
            message: '時間を記録しました'
          })
          setTimeout(() => {
            this.$store.commit('drawing/setFlash', {})
          }, 2000)
        })
    },
    closeModal () {
      this.$emit('closeModal')
    }
  }
}
</script>