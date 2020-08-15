<template>
<v-chip
  class="ma-2"
  color="#FFA000"
  label
  text-color="white"
>
  <v-icon small style="margin-right: 10px;">
    fas fa-tag
  </v-icon>
  <span>{{ tag }}</span>
</v-chip>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      required: true
    }
  }
}
</script>