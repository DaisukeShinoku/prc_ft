<template>
  <transition name="fade">
    <v-alert v-if="flash.status" :type="flashType" class="flash">{{ flash.message }}</v-alert>
  </transition>
</template>

<script>
export default {
  computed: {
    flash () {
      return this.$store.state.flash
    },
    flashType () {
      let type = ''
      switch (this.flash.type) {
        case 'success':
          type = 'success'
          break
      }
      return type
    }
  }
}
</script>

<style>
.v-alert__wrapper {
  display: block;
}
.v-alert__icon {
  display: inline-block;
  margin-bottom: 8px;
}
.v-alert__content {
  display: inline-block;
}
.flash {
  position: fixed;
  width: 100%;
  z-index: 50;
  text-align: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
