<template>
  <v-container>
    <v-layout>
      <v-flex>
        <div id="firebaseui-container"></div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
  name: 'login',
  mounted () {
    var ui = new firebaseui.auth.AuthUI(firebase.auth())
    var uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: '/',
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
    ui.start('#firebaseui-container', uiConfig)
  }
}
</script>
