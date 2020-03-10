<template>
  <v-container
    fluid
    class="pa-2"
  >
    <div>
      <v-row class="mx-6">
        <v-col md="6" cols="12" class="pa-md-8">
          <v-skeleton-loader
            :loading="loading"
            class="mb-6"
            type="image, image, image"
          >
            <ImageDisplayer
              v-bind:images="[movie.poster_path]"/>
          </v-skeleton-loader>
        </v-col>
        <v-col md="6" cols="12">
          <v-skeleton-loader
            :loading="loading"
            height="894"
            type="article, article, article"
          >
            <DetailsPanel
              v-if="movie"
              v-bind:movie="movie"/>
          </v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row
        v-if="similarMovies && similarMovies.length > 0"
        class="mt-10"
      >
        <div class="display-2 font-weight-bold mx-auto">
          Similar Movies
        </div>
      </v-row>
      <CarouselSection
        v-if="similarMovies && similarMovies.length > 0"
        :movies="similarMovies"
        context='similar'
        @get-next="getNextMovies"/>
      <v-row
        v-if="recommendations && recommendations.length > 0"
        class="mt-6"
      >
        <div class="display-2 font-weight-bold mx-auto">
          You Might Also Like
        </div>
      </v-row>
      <CarouselSection
        v-if="recommendations && recommendations.length > 0"
        :movies="recommendations"
        context='recommended'
        @get-next="getNextMovies"/>
    </div>
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
    CarouselSection: () => import('@/components/CarouselSection.vue')
  },
  data: () => ({
    loading: true,
    movie: null,
    recommendations: null,
    similarMovies: null
  }),
  methods: {
    async loadMovie () {
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
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    getNextMovies: function (emitter, movieListLength) {
      let currentPage = movieListLength / 20
      if (emitter === 'similar') {
        api.getSimilarMovies(this.$route.params.id, currentPage + 1)
          .then(values => {
            this.similarMovies = this.similarMovies.concat(values)
          })
      }
      if (emitter === 'recommended') {
        api.getRecommendedMovies(this.$route.params.id, currentPage + 1)
          .then(values => {
            this.recommendations = this.recommendations.concat(values)
          })
      }
    }
  },
  watch: {
    $route (to, from) {
      if (to.name === 'movie') {
        this.loading = true
        this.loadMovie()
      }
    }
  },
  async mounted () {
    this.loading = true
    this.loadMovie()
  }
}
</script>
