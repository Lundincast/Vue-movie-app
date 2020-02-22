<template>
  <v-card
    height="363"
    @click="singleMovie(movie.id)">
    <v-img
      :src="movie.poster_path"
    ></v-img>
  </v-card>
</template>

<script>
export default {
  name: 'MovieCard',
  props: ['movie'],
  methods: {
    singleMovie (id) {
      this.$router.push('/movie/' + id)
    }
  }
}
</script>

<style>

</style>
