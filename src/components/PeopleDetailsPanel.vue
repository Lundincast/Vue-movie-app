<template>
  <v-container>
    <v-row>
      <v-col col col-12>
        <a class="text--primary body-2 mb-3 d-block underlined" @click="$router.go(-1)">Back</a>
        <h1 class="font-weight-bold mb-6 display-2">{{ people.name }}</h1>
        <p v-if="people.deathday">{{ people.birthday }} - {{ people.deathday }}</p>
        <p v-else><b>Birth date:</b> {{ people.birthday }}</p>
        <p v-if="people.biography"><b>Biography: </b>{{ people.biography }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'peopleDetailsPanel',
  props: ['people']
}
</script>
