<template>
<div>
hello
</div>
</template>

<script>
export default {
  components: {
  },
  created () {
    console.log('API_KEY:', process.env.API_KEY)
  }
}
</script>