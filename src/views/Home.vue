<template>
  <v-container
    v-if="sections.length"
    fluid
    class="pa-2"
  >
    <CarouselSection
      v-for="genre in sections"
      :key="genre.id"
      :genre="genre"/>
    <!-- <v-layout wrap class="pa-0">
      <v-flex
        v-for="(item, index) in movies"
        :key="index"
        xs12
        sm3
        mb-2>
        <v-skeleton-loader
          :loading="loading"
          height='1500'
          type='image, image, list-item-two-line'
        >
          <MovieCard v-bind:movie="item"/>
        </v-skeleton-loader>
      </v-flex>
      <v-flex>
        <CarouselSection />
      </v-flex>
    </v-layout> -->
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    CarouselSection: () => import('@/components/CarouselSection.vue')
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      sections: state => state.genres
    })
  }
}
</script>
