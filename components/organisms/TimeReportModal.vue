<template>
  <div>
    <v-btn
      color="primary"
      dark
      @click.stop="dialog = true"
      v-if="btnDisplay"
    >
      時間を記録する
    </v-btn>
    <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    >
      <AddTimeReport
      @closeModal="closeModal"
      :editInitialValue="editInitialValue"
      />
    </v-dialog>
  </div>
</template>

<script>
import AddTimeReport from './AddTimeReport.vue'
export default {
  components: {
    AddTimeReport
  },
  props: {
    btnDisplay: {
      type: Boolean,
      default: true
    },
    dialog: {
      type: Boolean,
      default: false
    },
    editInitialValue: {
      type: Object
    }
  },
  methods: {
    closeModal () {
      this.dialog = false
      this.$emit('closeModal')
    }
  }
}
</script>