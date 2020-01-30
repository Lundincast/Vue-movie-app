<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <v-flex
        v-for="(item, index) in movies"
        :key="index"
        xs12
        sm3
        mb-2>
        <v-skeleton-loader
          :loading="loading"
          transition='scale-transition'
          height='294'
          type='image, list-item-two-line'
        >
          <MovieCard v-bind:movie="item"/>
        </v-skeleton-loader>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    MovieCard: () => import('@/components/MovieCard.vue')
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
