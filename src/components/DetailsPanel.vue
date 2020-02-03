<template>
<div>
  <a class="text--primary body-2 mb-3 d-block" @click="$router.go(-1)">Back to Home</a>
  <h1 class="font-weight-bold mb-6 display-3">{{ movie.title }}</h1>
  <div>
    <div>
      <p class="headline">{{ releaseDate }}</p>
    </div>
    <div>
      <b>Production countries</b> : {{ productionCountries }}
    </div>
    <div>
      <b>Director: </b>
      <router-link v-bind:to="{ name: 'people', params: { id: movie.director[0].id }}">
        {{ movie.director[0].name }}
      </router-link>
    </div>
  </div>
  <p><b>Duration :</b> {{ movie.runtime }} min</p>
  <p class="body-1"><b>Summary:</b> {{ movie.overview }}</p>
  <p><b>Cast: </b></p>
  <div v-for="(people, index) in movie.cast" :key="index">
    {{ people.character }}:
    <router-link v-bind:to="{ name: 'people', params: { id: people.id}}">
      <b>{{ people.name }}</b>
    </router-link>
  </div>
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
    },
    releaseDate () {
      return this.movie.release_date.getFullYear()
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
