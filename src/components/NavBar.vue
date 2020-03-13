<template>
  <div>
    <v-app-bar
        app
        color="primary"
        dark
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

        <div v-if='user'>
          <router-link v-bind:to="{ name: 'watchlisted'}">
            <v-btn icon>
              <v-icon>mdi-update</v-icon>
            </v-btn>
          </router-link>
          <router-link v-bind:to="{ name: 'favorites'}">
            <v-btn icon class="mr-3">
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
  </div>
</template>

<script>
// import firebase from 'firebase'
import { mapState } from 'vuex'

export default {
  name: 'navBar',
  components: {
    ProfileMenu: () => import('@/components/ProfileMenu'),
    Login: () => import('@/components/Login')
  },
  data () {
    return {
      menu: false,
      loginDialog: false,
      username: null,
      email: null,
      password: null,
      password2: null,
      showPassword: false,
      showPassword2: false,
      rules: {
        required: value => !!value || 'Required.',
        minUsernameLength: v => v.length >= 2 || 'Min 2 characters',
        minPasswordLength: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: v => this.password2 === this.password || 'Passwords don\'t match',
        validEmail: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      }
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
