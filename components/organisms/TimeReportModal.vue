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
      <AddTimeReport @closeModal="closeModal" />
    </v-dialog>
  </v-row>
</template>

<script>
import AddTimeReport from './AddTimeReport.vue'
export default {
  components: {
    AddTimeReport
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    closeModal () {
      this.dialog = false
    }
  }
}
</script>