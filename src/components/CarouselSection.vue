<template>
  <v-container fluid class="mx-0 px-0">
    <v-row align="center" justify="center" class="mx-auto">
      <v-col :cols="1">
        <v-btn
          icon
          class="float-right"
          @click="showPrevElements"
        >
          <v-icon x-large>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <v-col :cols="10">
        <v-row justify="center">
          <v-col
            v-for="movie in visibleMovies"
            :key="movie.id"
            :cols="2"
          >
            <PosterMovieCard
              v-if="movies.length"
              :movieId="movie.id"
              :moviePosterPath="movie.poster_path"
              :movieTitle="movie.title" />
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
export default {
  name: 'carouselSection',
  props: ['movies', 'context'],
  components: {
    PosterMovieCard: () => import('@/components/PosterMovieCard.vue')
  },
  data: function () {
    return {
      currentFirstElIndex: 0
    }
  },
  computed: {
    visibleMovies () {
      return this.movies.slice(this.currentFirstElIndex, this.currentFirstElIndex + 6)
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
    }
  },
  watch: {
    // Requests the next 20 movies when the carousel reaches the 2nd-to-last
    // 4-movies view, so that we pre-load them before they're needed
    currentFirstElIndex: function (oldVal, newVal) {
      if (newVal >= (this.movies.length - 8)) {
        this.$emit('get-next', this.context, this.movies.length)
      }
    }
  }
}
</script>

<style scoped>
.border {
  border-style: solid;
}
</style>
