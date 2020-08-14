<template>
  <ValidationObserver ef="obs" v-slot="{ passes }">
    <v-card>
      <v-card-title>
        <span class="headline">時間を記録する</span>
      </v-card-title>
      <v-form>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="4">
                <VAutoCompleteWithValidation
                rules="validTime:@分"
                v-model="hour"
                label="時"
                :items="hours"
                />
              </v-col>
              <v-col cols="4">
                <VAutoCompleteWithValidation
                rules="max_value:60|validTime:@時"
                v-model="minute"
                label="分"
                :items="minutes"
                />
              </v-col>
              <v-col cols="12">
                <VTextAreaWithValidation
                rules="max:280"
                :counter="280"
                label="メモ・学習内容"
                v-model="memo"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeModal">Close</v-btn>
          <v-btn
          color="blue darken-1"
          text
          @click="passes(addTimeReport)"
          >Save</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </ValidationObserver>
</template>

<script>
import VAutoCompleteWithValidation from '../molecules/inputs/VAutocompleteWithValidation.vue'
import VTextAreaWithValidation from '../molecules/inputs/VTextAreaWithValidation.vue'
import axios from '@/plugins/axios'
export default {
  components: {
    VAutoCompleteWithValidation,
    VTextAreaWithValidation
  },
  props: {
    editInitialValue: {
      type: Object
    }
  },
  data: () => ({
    hour: '',
    minute: '',
    memo: ''
  }),
  computed: {
    timeProcess () {
      return this.hour + ':' + this.minute
    },
    currentUserId () {
      return this.$store.state.currentUser.id
    },
    hours () {
      const hours = []
      for (let i = 0; i < 24; i++) { hours.push(i.toString()) }
      return hours
    },
    minutes () {
      const minutes = []
      for (let i = 0; i < 60; i++) { minutes.push(i.toString()) }
      return minutes
    }
  },
  methods: {
    addTimeReport () {
      const timeReport = {
        study_time: this.timeProcess,
        memo: this.memo
      }
      axios
        .post('/v1/time_reports', {
          time_report: timeReport,
          user_id: this.currentUserId
        })
        .then((res) => {
          this.$emit('closeModal')
          const timeReport = res.data.time_report
          const experienceRecord = res.data.experience_record
          const experience = res.data.experience
          const requiredExp = res.data.required_exp
          this.$store.commit('timeReport/setTimeReport', { timeReport })
          this.$store.commit('experience/setExperienceRecord',
            { experienceRecord })
          this.$store.commit('experience/setExperience', { experience })
          this.$store.commit('experience/setRequiredExp', { requiredExp })
          this.$store.commit('drawing/setFlash', {
            status: true,
            type: 'success',
            message: '時間を記録しました'
          })
          this.hour = '0'
          this.minute = '1'
          this.memo = ''
          setTimeout(() => {
            this.$store.commit('drawing/setFlash', {})
          }, 2000)
        })
    },
    closeModal () {
      this.$emit('closeModal')
    }
  },
  mounted () {
    if (this.editInitialValue) {
      const time = new Date(this.editInitialValue.study_time)
      const hour = time.getUTCHours()
      const minute = time.getUTCMinutes()
      this.hour = hour.toString()
      this.minute = minute.toString()
      this.memo = this.editInitialValue.memo
      console.log(this.minute)
    } else {
      this.hour = '0'
      this.minute = '1'
    }
  }
}
</script>