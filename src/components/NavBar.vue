<template>
    <v-app-bar
        app
        color="primary"
        dark
    >
        <div class="d-flex align-center">
        <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
        />

        <v-toolbar-title>LundinFilms</v-toolbar-title>
        </div>

        <v-spacer></v-spacer>

        <v-btn
        v-if='user'
        @click="logout"
        text
        >
        <span class="mr-2">Logout</span>
        </v-btn>
        <v-btn
        v-else
        to='/login'
        text
        >
        <span class="mr-2">Login</span>
        </v-btn>
    </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'navBar',
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    logout () {
      this.$store.dispatch('removeUser')
    }
  }
}
</script>
