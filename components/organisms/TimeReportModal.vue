<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          時間を記録する
        </v-btn>
      </template>
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
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-btn
              color="blue darken-1"
              text
              @click="passes(addTimeReport)"
              >Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </ValidationObserver>
    </v-dialog>
  </v-row>
</template>

<script>
import VAutoCompleteWithValidation from '../molecules/inputs/VAutoCompleteWithValidation.vue'
import VTextAreaWithValidation from '../molecules/inputs/VTextAreaWithValidation.vue'
import axios from '@/plugins/axios'
export default {
  components: {
    VAutoCompleteWithValidation,
    VTextAreaWithValidation
  },
  data: () => ({
    dialog: false,
    hour: '0',
    minute: '0',
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
          this.dialog = false
          this.$store.commit('setFlash', {
            status: true,
            type: 'success',
            message: '時間を記録しました'
          })
          setTimeout(() => {
            this.$store.commit('setFlash', {})
          }, 2000)
        })
    }
  }
}
</script>