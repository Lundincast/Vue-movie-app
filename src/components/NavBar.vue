<template>
  <div>
    <v-app-bar
        app
        color="primary"
    >
      <router-link v-bind:to="{ name: 'home'}">
        <div class="d-flex align-center">
        <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
        />

          <v-toolbar-title class="white-text">LundinFilms</v-toolbar-title>
        </div>
      </router-link>

        <v-spacer></v-spacer>

        <SearchResults @switchOverlay="overlay = !overlay"/>

        <v-spacer></v-spacer>

        <div v-if='user'>
          <router-link v-bind:to="{ name: 'watchlisted'}">
            <v-btn icon dark>
              <v-icon>mdi-update</v-icon>
            </v-btn>
          </router-link>
          <router-link v-bind:to="{ name: 'favorites'}">
            <v-btn icon dark class="mr-3">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </router-link>
          <v-menu
            v-model="menu"
            bottom
            :nudge-width="300"
            transition="slide-y-transition"
          >
            <template v-slot:activator="{ on }">
              <v-avatar
                v-if="user.photoURL"
                class="mr-2 pointer-on-hover"
                size="40"
                v-on="on"
              >
                <img :src="user.photoURL">
              </v-avatar>
              <v-avatar
                v-else
                color="pink"
                class="mr-2 pointer-on-hover"
                size="40"
                v-on="on"
              >
                <span class="white--text headline">{{ initialLetter }}</span>
              </v-avatar>
            </template>
            <ProfileMenu
              v-bind:user="user"
              v-bind:initialLetter="initialLetter"
              v-on:close-menu="logout"/>
          </v-menu>
        </div>
        <div v-else>
          <v-btn
            dark
            text
            @click="loginDialog = true"
          >
            <span class="mr-2">Log in / Sign up</span>
          </v-btn>
          <v-dialog
            v-model="loginDialog"
            max-width="300"
          >
            <Login
              action='Sign in'
              @close-dialog="closeDialog" />
          </v-dialog>
        </div>
    </v-app-bar>
    <v-overlay
      :value="overlay"
      opacity="0.7"
      :z-index="1"
    ></v-overlay>
  </div>
</template>

<script>
// import firebase from 'firebase'
import { mapState } from 'vuex'

export default {
  name: 'navBar',
  components: {
    ProfileMenu: () => import('@/components/ProfileMenu'),
    Login: () => import('@/components/Login'),
    SearchResults: () => import('@/components/SearchResults')
  },
  data () {
    return {
      menu: false,
      overlay: false,
      loginDialog: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    initialLetter () {
      if (this.user.displayName) {
        return this.user.displayName.charAt(0).toUpperCase()
      } else {
        return this.user.email.charAt(0).toUpperCase()
      }
    }
  },
  methods: {
    logout () {
      this.menu = false
      this.$store.dispatch('removeUser')
      if (this.$router.currentRoute.name === 'favorites' ||
          this.$router.currentRoute.name === 'watchlisted') {
        this.$router.push('/')
      }
    },
    closeDialog () {
      this.loginDialog = false
    }
  }
}
</script>

<style scoped>

.pointer-on-hover:hover {
  cursor: pointer;
}
.white-text {
  color: #fff;
}
</style>
