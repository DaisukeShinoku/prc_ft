<template>
  <v-app style="background-color: #F1F8E9">
    <Loading></Loading>
    <Header></Header>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from '~/components/organisms/header.vue'
import Footer from '~/components/organisms/footer.vue'
import Loading from '~/components/molecules/loading.vue'

export default {
  components: {
    Header,
    Footer,
    Loading
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>