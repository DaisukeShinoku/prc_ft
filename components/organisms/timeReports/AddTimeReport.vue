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
    addTimeReport (data) {
      axios
        .post('/v1/time_reports', {
          time_report: data.timeReport,
          user_id: this.currentUser.id,
          tags: data.tags
        })
        .then((res) => {
          this.$emit('closeModal')
          const timeReport = res.data.time_report
          const experience_record = res.data.experience_record // eslint-disable-line
          const experience = res.data.experience
          const requiredExp = res.data.required_exp
          const tags = res.data.tags
          this.$store.commit('timeReport/setTimeReport', timeReport)
          this.$store.commit('timeReport/setTags', tags)
          this.$store.commit('experience/setExperienceRecord',
            { experience_record })
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