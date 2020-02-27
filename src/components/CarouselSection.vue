<template>
  <v-container fluid class="mx-0 px-0">
    <v-row>
      <div class="ml-12 display-3">
        {{ genre.name }}
      </div>
    </v-row>
    <v-row align="center" justify="center" class="mx-auto">
      <v-col :cols="1">
        <v-btn
          icon
          @click="showPrevElements"
        >
          <v-icon x-large>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <v-col :cols="10">
        <v-row>
          <v-col
            v-for="movie in visibleMovies"
            :key="movie.id"
            :cols="3"
          >
            <PosterMovieCard
              v-if="movies.length"
              :movieId="movie.id"
              :moviePosterPath="movie.poster_path" />
          </v-col>
        </v-row>
      </v-col>
      <v-col :cols="1">
        <v-btn
          icon
          @click="showNextElements"
        >
          <v-icon x-large>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '../api/api'

export default {
  name: 'carouselSection',
  props: ['genre'],
  components: {
    PosterMovieCard: () => import('@/components/PosterMovieCard.vue')
  },
  data: function () {
    return {
      page: 1,
      movies: [],
      currentFirstElIndex: 0
    }
  },
  computed: {
    visibleMovies () {
      return this.movies.slice(this.currentFirstElIndex, this.currentFirstElIndex + 4)
    }
  },
  methods: {
    showPrevElements () {
      if (!(this.currentFirstElIndex - 4 < 0)) {
        this.currentFirstElIndex = this.currentFirstElIndex - 4
      }
    },
    showNextElements () {
      if ((this.currentFirstElIndex + 4) < this.movies.length) {
        this.currentFirstElIndex = this.currentFirstElIndex + 4
      }
    },
    async getMoviesByGenre (genreId, pageNumber) {
      return api.getMoviesByGenre(genreId, pageNumber)
    }
  },
  watch: {
    // Requests the next 20 movies when the carousel reaches the 2nd-to-last
    // 4-movies view, so that we pre-load them before they're needed
    currentFirstElIndex: function (oldVal, newVal) {
      if (newVal >= (this.movies.length - 8)) {
        this.getMoviesByGenre(this.genre.id, this.page + 1)
          .catch(console.log('Couldn\'t fetch next batch of movies'))
          .then((response) => {
            console.log(response)
            let mergedMovies = this.movies.concat(response)
            this.movies = mergedMovies
            this.page++
          })
      }
    }
  },
  async mounted () {
    let response = await this.getMoviesByGenre(this.genre.id, this.page)
    this.movies = response
  }
}
</script>

<style scoped>
.border {
  border-style: solid;
}
</style>
