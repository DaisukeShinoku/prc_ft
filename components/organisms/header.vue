<template>
  <v-app-bar
    :clipped-left="clipped"
    fixed
    app
  >
    <v-toolbar-title>
      <h2 class="app-title">
        PolPa
      </h2>
    </v-toolbar-title>
    <v-spacer />
    <v-menu
    v-model="value"
    :offset-y="true"
    :left="true"
    v-if="currentUser"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
        size="30"
        v-bind="attrs"
        v-on="on"
        >
          <img src="~/assets/default_icon.jpeg" />
        </v-avatar>
      </template>
      <v-list
      :dense="true"
      width="200px"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          exact
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
      :dense="true"
      width="200px"
      >
        <v-list-item @click="logOut" key="logout">
          <v-list-item-title>ログアウト</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import firebase from '@/plugins/firebase'
export default {
  data () {
    return {
      value: false,
      clipped: true,
      item: 1
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.currentUser
    },
    items () {
      const items = [
        {
          title: 'マイページ',
          to: `/users/${this.currentUser.id}`
        }
      ]
      return items
    }
  },
  methods: {
    logOut () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit('setUser', null)
          this.$router.push('/login')
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>
h2.app-title {
  margin-left: 200px;
  font-size: 1.5em;
  letter-spacing: 2px;
}
.v-avatar {
  margin-right: 200px;
}
</style>