<template>
  <TimeReportForm
  :editInitialValue="editInitialValue"
  @record="editTimeReport"
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
  props: {
    editInitialValue: {
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
    editTimeReport (data) {
      axios
        .patch(`/v1/time_reports/${data.timeReport.id}`, {
          time_report: data.timeReport,
          user_id: this.currentUser.id,
          tags: data.tags
        })
        .then((res) => {
          this.$emit('closeModal')
          this.$emit('updateTimeReport', res.data)
          this.$store.commit('drawing/setFlash', {
            status: true,
            type: 'success',
            message: '記録を変更しました'
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