<template>
  <ValidationObserver ef="obs" v-slot="{ passes }">
    <v-card>
      <v-card-title>
        <span
        class="headline"
        v-if="editInitialValue"
        >記録を編集する</span>
        <span
        class="headline"
        v-else
        >時間を記録する</span>
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
          @click="passes(record)"
          id="save"
          >Save</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <ExpReductionAlert
    :displayModal="displayAlert"
    @cancel="cancel"
    @understanding="understanding"
    />
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate' // テスト用にインポート
import VAutoCompleteWithValidation from '../../molecules/inputs/VAutocompleteWithValidation.vue'
import VTextAreaWithValidation from '../../molecules/inputs/VTextAreaWithValidation.vue'
import ExpReductionAlert from '../ExpReductionAlert.vue'
export default {
  components: {
    VAutoCompleteWithValidation,
    VTextAreaWithValidation,
    ExpReductionAlert,
    ValidationObserver
  },
  props: {
    editInitialValue: {
      type: Object
    }
  },
  data: () => ({
    hour: '',
    minute: '',
    memo: '',
    editInitHour: 0,
    editInitMinute: 1,
    displayAlert: false
  }),
  computed: {
    timeProcess () {
      return this.hour + ':' + this.minute
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
    record () {
      const timeReport = {
        study_time: this.timeProcess,
        memo: this.memo
      }
      // 再編集の場合
      if (this.editInitialValue) {
        timeReport.id = this.editInitialValue.id
        // 経験値が減る場合は警告を出す
        const oldExp = this.editInitHour * 60 + this.editInitMinute
        const nexExp = Number(this.hour) * 60 + Number(this.minute)
        if (oldExp > nexExp) {
          this.displayAlert = true
        } else {
          this.$emit('record', timeReport)
        }
      } else {
        this.$emit('record', timeReport)
        this.hour = '0'
        this.minute = '1'
      }
    },
    closeModal () {
      this.$emit('closeModal')
    },
    cancel () {
      this.displayAlert = false
    },
    understanding () {
      const timeReport = {
        study_time: this.timeProcess,
        memo: this.memo,
        id: this.editInitialValue.id
      }
      this.displayAlert = false
      this.$emit('record', timeReport)
    }
  },
  mounted () {
    // 再編集のときの初期値を設定
    if (this.editInitialValue) {
      const time = new Date(this.editInitialValue.study_time)
      const hour = time.getUTCHours()
      const minute = time.getUTCMinutes()
      this.hour = hour.toString()
      this.minute = minute.toString()
      this.memo = this.editInitialValue.memo
      this.editInitHour = hour
      this.editInitMinute = minute
    } else {
      this.hour = '0'
      this.minute = '1'
    }
  }
}
</script>