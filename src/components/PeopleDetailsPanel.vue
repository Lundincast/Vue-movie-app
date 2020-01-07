<template>
<div>
  <a class="text--primary" @click="$router.go(-1)">Back to Home</a>
  <h1 class="font-weight-bold mb-6 display-2">{{ people.name }}</h1>
  <p v-if="people.deathday">{{ people.birthday }} - {{ people.deathday }}</p>
  <p v-else><b>Birth date:</b> {{ people.birthday }}</p>
  <p v-if="people.biography"><b>Biography: </b>{{ people.biography }}</p>
</div>
</template>

<script>
export default {
  name: 'peopleDetailsPanel',
  props: ['people']
}
</script>
