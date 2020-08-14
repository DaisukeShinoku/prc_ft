<template>
  <v-container>
    <v-card class="mx-auto mt-5 pa-5" width="600px">
      <v-card-title>
        <v-avatar size="40">
          <img src="~/assets/default_icon.jpeg" />
        </v-avatar>
        <span style="margin-left: 15px;">{{ user.name }}</span>
      <small style="color: #BDBDBD; margin-left: 10px">@{{ user.screen_name }}</small>
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
export default {
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
  computed: {
    studyTime () {
      const time = new Date(this.time_report.study_time)
      return time.getUTCHours() + '時間' + time.getUTCMinutes() + '分'
    }
  }
}
</script>