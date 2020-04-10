<template>
  <div>
    <v-card
      height="auto"
      @click="singleMovie(movieId)"
    >
      <v-img
        v-if="moviePosterPath"
        :src="moviePosterPath"
      ></v-img>
      <div v-else>
        <v-card-title>
          {{ movieTitle }}
        </v-card-title>
        <v-card-subtitle>
          (No Image Available)
        </v-card-subtitle>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'PosterMovieCard',
  props: ['movieId', 'moviePosterPath', 'movieTitle'],
  methods: {
    singleMovie (id) {
      this.$router.push('/movie/' + id)
    }
  }
}
</script>

<style>

</style>
