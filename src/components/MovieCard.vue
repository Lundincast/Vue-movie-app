<template>
  <v-card
    height="500"
    @click="singleMovie(movie.id)">
    <v-img
      :src="movie.poster_path"
    ></v-img>
    <v-card-title primary-title>
      <div>
        <h3>{{movie.title}}</h3>
        <div>{{movie.release_date}}</div>
      </div>
    </v-card-title>
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
