<template>
  <v-container fluid>
    <v-responsive>
        <div class="container">
          <v-row>
            <v-col md="6" cols="12">
              <ImageDisplayer v-bind:images="[movie.poster_path]"/>
            </v-col>
            <v-col md="6" cols="12" class="pt-0">
              <DetailsPanel v-bind:movie="movie"/>
            </v-col>
          </v-row>
          <v-row v-if="similar.length !== 0" class="container container-fluid lighten-2">
            <RelatedMovies
              v-bind:movieList="similar"
            >
              Similar Movies
            </RelatedMovies>
          </v-row>
          <v-row v-if="recommendations.length !== 0" class="container container-fluid lighten-2">
            <RelatedMovies
              v-bind:movieList="recommendations"
            >
              You Might Also Like
            </RelatedMovies>
          </v-row>
        </div>
    </v-responsive>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'Movie',
  components: {
    ImageDisplayer: () => import('@/components/ImageDisplayer'),
    DetailsPanel: () => import('@/components/DetailsPanel'),
    RelatedMovies: () => import('@/components/RelatedMovies')
  },
  computed: mapState({
    loading: state => state.loading,
    movie: state => state.movie,
    recommendations: state => state.recommendations,
    similar: state => state.similar
  }),
  async mounted () {
    this.$store.dispatch('getSingleMovie', this.$route.params.id)
  }
}
</script>
