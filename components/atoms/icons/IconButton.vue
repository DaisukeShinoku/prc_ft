<template>
  <v-btn
  icon
  v-bind="$attrs"
  v-on="$listeners"
  @click="click"
  >
    <v-icon v-bind="$attrs">
      {{ type }}
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    click () {
      this.$emit('on')
    }
  }
}
</script>