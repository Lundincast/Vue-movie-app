<template>
  <v-container v-if="loading">
    <div class="text-xs-center">
      <v-progress-circular
        indeterminate
        :size="150"
        :width="8"
        color="green">
      </v-progress-circular>
    </div>
  </v-container>
  <v-container v-else grid-list-xl>
    <v-layout wrap>
      <v-flex
        v-for="(item, index) in movies"
        :key="index"
        xs12
        sm3
        mb-2>
        <MovieCard v-bind:movie="item"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import MovieCard from '@/components/MovieCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    MovieCard
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      movies: state => state.movies
    })
  },
  created () {
    this.$store.dispatch('getMovies')
  }
}
</script>
