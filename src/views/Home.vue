<template>
  <v-responsive style="min-height:100vh;">
    <section id="home">
      <v-container
        fluid
        tag="section"
        class="white--text home-header"
      >
        <v-responsive
          class="mx-auto pa-6"
          style="min-height:50vh;max-width:1304px;"
        >
          <v-container class="pa-0">
            <v-row align="center" class="my-12">
              <v-col
                class="col-md-6"
              >
                <v-responsive max-width="550px">
                  <div class="base-title home-header__title mb-4">
                    <div class="v-markdown">
                      <h1 class="display-3 font-weight-light">Home-made movie browser in VueJS</h1>
                    </div>
                  </div>
                </v-responsive>
              </v-col>
              <v-col
                class="col-md-6 pa-0"
                cols="12"
                ref="carouselBox"
              >
                    <v-carousel
                      cycle
                      :height="carouselHeight"
                      :show-arrows="false"
                      hide-delimiter-background
                    >
                      <v-card class="ma-0">
                      <v-carousel-item
                        contain
                        v-for="(movie, i) in featuredMovies"
                        :key="i"
                        :src="movie.backdrop_path"
                        :to="{ name: 'movie', params: { id: movie.id }}"
                        reverse-transition="fade-transition"
                        transition="fade-transition"
                      >
                      </v-carousel-item>
                      </v-card>
                    </v-carousel>
              </v-col>
            </v-row>
          </v-container>
        </v-responsive>
      </v-container>
      <v-container
        tag="section"
        fluid
        class="py-6 py-md-12"
      >
        <v-responsive
          class="pa-6 mx-auto"
          style="max-width:1304px;"
        >
            <div
              v-for="(genre, id) in sections"
              :key="id"
              class=""
            >
              <v-row>
                <div class="display-3 mx-auto">
                  {{ genre.name }}
                </div>
              </v-row>
              <v-responsive
                :aspect-ratio="16/4"
              >
                <CarouselSection
                  v-if="movies"
                  :movies="movies[id]"
                  :context="genre.id"
                  @get-next="getNextMovies"/>
              </v-responsive>
            </div>
        </v-responsive>
      </v-container>
    </section>
  </v-responsive>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import api from '../api/api'

export default {
  name: 'home',
  components: {
    CarouselSection: () => import('@/components/CarouselSection.vue')
  },
  data () {
    return {
      headerCols: 12,
      movies: null,
      show: true,
      carouselHeight: 0
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      featuredMovies: state => state.trendingMovies,
      sections: state => state.genres
    })
  },
  methods: {
    setMoviesList () {
      Promise.all(
        this.sections.map(section => {
          return api.getMoviesByGenre(section.id)
        })
      )
        .then(values => {
          this.movies = values
        })
    },
    getNextMovies: function (genreId, movieListLength) {
      let currentPage = movieListLength / 20
      let genreIndex = this.sections.map(e => e.id).indexOf(genreId)
      api.getMoviesByGenre(genreId, currentPage + 1)
        .then(values => {
          // Use Vue.set() to provide reactivity and properly update CarouselSection's prop
          // see https://vuejs.org/v2/guide/reactivity.html#For-Arrays for details
          Vue.set(this.movies, genreIndex, this.movies[genreIndex].concat(values))
        })
    }
  },
  watch: {
    sections: function (oldVal, newVal) {
      if (oldVal.length > 0) { // Oddly enough, movies array is in oldVal
        this.setMoviesList()
      }
    }
  },
  async mounted () {
    // Set Carousel's height for proper aspect ratio
    console.log()
    this.carouselHeight = this.$refs.carouselBox.clientWidth / 1.77
    if (this.$vuetify.breakpoint.mdAndUp) {
      this.headerCols = 6
    }
    await this.$store.dispatch('getTrendingMovies')
    if (this.sections.length > 0) {
      this.setMoviesList()
    }
  }
}
</script>

<style scoped>
.home-header {
  background: linear-gradient(rgb(24, 103, 192), rgb(92, 187, 246))
}
.home-header__title {
  line-height: 1.2;
}
.base-title {
  display: inline-block;
}
</style>
