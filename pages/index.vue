<template>
<div>
  {{ currentUser.name }}
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {
  },
  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>