<template>
  <v-container class="mb-6">
    <h2 class="font-weight-bold mb-6 text-center display-2">
      <slot></slot>
    </h2>
    <v-container>
      <vueper-slides
        class="no-shadow"
        :visible-slides="4"
        slide-multiple
        :gap="2"
        :slide-ratio="1 / 3"
        :dragging-distance="200"
        :breakpoints="{ 800: { visibleSlides: 4, slideMultiple: 4 } }"
        :bullets="false">
        <vueper-slide
          v-for='(movie,i) in relatedMovies'
          :key='i'
          :image='movie.poster_path'
          :link='movie.selfLink' />
      </vueper-slides>
    </v-container>
  </v-container>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  name: 'relatedMovies',
  components: { VueperSlides, VueperSlide },
  props: ['movieList'],
  computed: {
    relatedMovies () {
      let related = this.movieList.map(function (movie) {
        movie.selfLink = 'http://localhost:8080/movie/' + movie.id
        return movie
      })
      return related
    }
  }
}
</script>
