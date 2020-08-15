<template>
  <v-btn
  icon
  v-bind="$attrs"
  v-on="$listeners"
  >
    <v-icon v-if="authDisplay" v-bind="$attrs">
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
    },
    comparison: {
      type: Number,
      required: true
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    },
    authDisplay () {
      if (this.currentUser && this.currentUser.id === this.comparison) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>