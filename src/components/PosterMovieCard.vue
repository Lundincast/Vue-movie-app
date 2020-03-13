<template>
  <div>
    <v-card
      v-if="moviePosterPath"
      height="auto"
      @click="singleMovie(movieId)"
    >
      <v-img
        :src="moviePosterPath"
      ></v-img>
    </v-card>
    <v-card
      v-else
      height="350"
      @click="singleMovie(movieId)"
    >
      <v-card-title>
        {{ movieTitle }}
      </v-card-title>
      <v-card-subtitle>
        (No Image Available)
      </v-card-subtitle>
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
