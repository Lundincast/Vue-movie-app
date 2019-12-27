<template>
<div>
  <a class="text--primary" @click="$router.go(-1)">Back to Home</a>
  <h1 class="font-weight-bold mb-6 display-2">{{ movie.title }}</h1>
  <p><b>Release year: </b>{{ movie.release_date }}</p>
  <p><b>Production countries:</b> {{ productionCountries }}</p>
  <p><b>Director:</b> {{ movie.director }}</p>
  <p><b>Duration :</b> {{ movie.runtime }} min</p>
  <p><b>Summary:</b> {{ movie.overview }}</p>
  <p><b>Cast: </b></p>
  <p v-for="(people, index) in movie.cast" :key="index">
    {{ people.character }}: <b>{{ people.name }}</b>
  </p>
</div>
</template>

<script>
export default {
  name: 'detailsPanel',
  props: ['movie'],
  computed: {
    productionCountries () {
      const countries = this.movie.production_countries.map(c => c.name)
      return countries.join(', ')
    }
  }
}
</script>

<style>
.font-weight-bold {
  font-weight: 700 !important;
}
.text--primary {
  color: rgba(0,0,0,.87) !important;
}
</style>
