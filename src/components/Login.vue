<template>
  <v-card>
    <v-card-title class="headline">{{ action }} to LundinFilms</v-card-title>
    <div id="firebaseui-container" class="pb-1"></div>
  </v-card>
</template>

<script>
import firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
  name: 'login',
  props: ['action'],
  mounted () {
    let uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          return false
        }
      },
      signInFlow: 'popup',
      signInSuccessUrl: '/',
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInOptions: [
        {
          // Google provider must be enabled in Firebase Console to support one-tap
          // sign-up.
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          // Required to enable this provider in one-tap sign-up.
          authMethod: 'https://accounts.google.com',
          // Required to enable ID token credentials for this provider.
          // This can be obtained from the Credentials page of the Google APIs
          // console.
          clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID
        },
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }
    let ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-container', uiConfig)
  },
  beforeDestroy () {
    this.$emit('close-dialog')
  }
}
</script>
