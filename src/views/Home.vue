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
