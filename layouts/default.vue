<template>
  <v-app style="background-color: #F1F8E9">
    <FlashSuccess />
    <Loading />
    <Header />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Header from '~/components/organisms/header.vue'
import Footer from '~/components/organisms/footer.vue'
import Loading from '~/components/molecules/loading.vue'
import FlashSuccess from '~/components/molecules/flash-success.vue'

export default {
  components: {
    Header,
    Footer,
    Loading,
    FlashSuccess
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>