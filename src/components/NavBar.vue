<template>
  <div>
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

        <div v-if='user'>
          <v-btn icon>
            <v-icon>mdi-update</v-icon>
          </v-btn>
          <v-btn icon class="mr-3">
            <v-icon>mdi-heart</v-icon>
          </v-btn>
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
          <v-dialog
            v-model="dialog"
            width="500"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                text
                v-on="on"
              >
              Sign up
              </v-btn>
            </template>

            <v-card>
              <v-card-title
                primary-title
              >
                Sign up to LundinFilms
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="username"
                        :rules="[rules.required, rules.minUsernameLength]"
                        label="Username*"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="email"
                        :rules="[rules.required, rules.validEmail]"
                        label="Email address*"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="password"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.minPasswordLength]"
                        :type="showPassword ? 'text' : 'password'"
                        label="Password*"
                        hint="example of helper text only on focus"
                        @click:append="showPassword = !showPassword"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        v-model="password2"
                        :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.minPasswordLength, rules.emailMatch]"
                        :type="showPassword2 ? 'text' : 'password'"
                        label="Confirm password*"
                        hint="example of helper text only on focus"
                        @click:append="showPassword2 = !showPassword2"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  @click="dialog = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="signUp()"
                >
                  Sign up
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn
            to="/login"
            text
          >
            <span class="mr-2">Log in</span>
          </v-btn>
        </div>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from 'firebase'
import { mapState } from 'vuex'

export default {
  name: 'navBar',
  components: {
    ProfileMenu: () => import('@/components/ProfileMenu')
  },
  data () {
    return {
      menu: false,
      dialog: false,
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
    signUp () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          alert('success')
        })
        .catch((error) => {
          alert(error)
        })
    },
    logout () {
      this.menu = false
      this.$store.dispatch('removeUser')
    }
  }
}
</script>

<style scoped>
.pointer-on-hover:hover {
  cursor: pointer;
}
</style>
