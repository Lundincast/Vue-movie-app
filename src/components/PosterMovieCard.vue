<template>
  <v-card
    height="355"
    @click="singleMovie(movieId)">
    <v-img
      :src="moviePosterPath"
    ></v-img>
  </v-card>
</template>

<script>
export default {
  name: 'PosterMovieCard',
  props: ['movieId', 'moviePosterPath'],
  methods: {
    singleMovie (id) {
      this.$router.push('/movie/' + id)
    }
  }
}
</script>

<style>

</style>
