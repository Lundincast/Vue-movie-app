<template>
  <v-container
    fluid
    class="pa-0"
  >
    <v-carousel
      cycle
      height="90vh"
      show-arrows-on-hover
      v-on:input="showTitle"
    >
      <v-carousel-item
        v-for="(movie, i) in featuredMovies"
        :key="i"
        :src="movie.backdrop_path"
        :to="{ name: 'movie', params: { id: movie.id }}"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <transition name="slide-fade">
            <div v-if="show" class="display-2">{{ movie.title }}</div>
          </transition>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <div class="mt-6 mx-12">
      <div
        v-for="(genre, id) in sections"
        :key="id"
      >
        <v-row>
          <div class="ml-12 display-3">
            {{ genre.name }}
          </div>
        </v-row>
        <v-responsive
          class="mx-12"
          :aspect-ratio="16/5"
        >
          <CarouselSection
            v-if="movies"
            :movies="movies[id]"
            :context="genre.id"
            @get-next="getNextMovies"/>
        </v-responsive>
      </div>
    </div>
  </v-container>
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
      movies: null,
      show: false
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
    },
    showTitle () {
      console.log('showTile called')
      this.show = true
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
    await this.$store.dispatch('getTrendingMovies')
    if (this.sections.length > 0) {
      this.setMoviesList()
    }
  }
}
</script>

<style scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
