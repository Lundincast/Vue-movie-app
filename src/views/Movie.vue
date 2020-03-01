<template>
  <v-container fluid>
    <v-responsive>
        <div class="container">
          <v-row>
            <v-col md="6" cols="12">
              <ImageDisplayer
                v-bind:images="[movie.poster_path]"/>
            </v-col>
            <v-col md="6" cols="12" class="pt-0">
              <DetailsPanel
                v-if="movie"
                v-bind:movie="movie"/>
            </v-col>
          </v-row>
          <v-row v-if="similarMovies && similarMovies.length > 0" class="container container-fluid lighten-2">
            <RelatedMovies
              v-bind:movieList="similarMovies"
            >
              Similar Movies
            </RelatedMovies>
          </v-row>
          <v-row v-if="recommendations && recommendations.length > 0" class="container container-fluid lighten-2">
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
import api from '../api/api'

export default {
  name: 'Movie',
  components: {
    ImageDisplayer: () => import('@/components/ImageDisplayer'),
    DetailsPanel: () => import('@/components/DetailsPanel'),
    RelatedMovies: () => import('@/components/RelatedMovies')
  },
  data () {
    return {
      movie: null,
      recommendations: null,
      similarMovies: null
    }
  },
  async created () {
    try {
      let response = await api.getSingleMovie(this.$route.params.id)
      let movie = {}
      movie.title = response.title
      movie.poster_path = response.poster_path
      movie.runtime = response.runtime
      movie.genres = response.genres
      movie.overview = response.overview
      movie.production_countries = response.production_countries
      movie.release_date = new Date(response.release_date)
      movie.cast = response.credits.cast.slice(0, 15)
      movie.director = response.credits.crew.filter(p => p.job === 'Director')// .map(p => p.name).join(', ')
      this.movie = movie
      this.recommendations = response.recommendations.results
      this.similarMovies = response.similar.results
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
