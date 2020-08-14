<template>
<div>
  {{ currentUser.name }}
</div>
</template>

<script>
export default {
  components: {
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    }
  }
}
</script>