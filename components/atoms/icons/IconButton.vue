<template>
  <v-btn
  icon
  v-bind="$attrs"
  v-on="$listeners"
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
  }
}
</script>