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
        <v-icon small>
          far fa-edit
        </v-icon>
      </v-btn>
      <TimeReportModal
      :btnDisplay="false"
      :dialog="modalDisplay"
      @closeModal="closeModal"
      :editInitialValue="time_report"
      />
      <v-icon small>
        far fa-trash-alt
      </v-icon>
      </v-card-title>
      <v-card-text>
        {{ studyTime }}
        {{ time_report.memo }}
        {{ time_report.experience_point }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import TimeReportModal from '../organisms/TimeReportModal.vue'
export default {
  components: {
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
  data: () => ({
    modalDisplay: false
  }),
  computed: {
    studyTime () {
      const time = new Date(this.time_report.study_time)
      return time.getUTCHours() + '時間' + time.getUTCMinutes() + '分'
    }
  },
  methods: {
    closeModal () {
      this.modalDisplay = false
    }
  }
}
</script>