<template>
  <v-container fluid>
    <v-responsive>
        <div class="container">
          <v-row>
            <v-col md="6" cols="12">
              <ImageDisplayer v-bind:images="[movie.poster_path]"/>
            </v-col>
            <v-col md="6" cols="12">
              <DetailsPanel v-bind:movie="movie"/>
            </v-col>
          </v-row>
          <v-row v-if="recommendations" class="container container-fluid lighten-2">
            <RelatedMovies v-bind:recommendations="recommendations"/>
          </v-row>
        </div>
    </v-responsive>
  </v-container>
</template>

<script>
// @ is an alias to /src
import ImageDisplayer from '@/components/ImageDisplayer'
import DetailsPanel from '@/components/DetailsPanel'
import RelatedMovies from '@/components/RelatedMovies'
import { mapState } from 'vuex'

export default {
  name: 'Movie',
  components: {
    ImageDisplayer,
    DetailsPanel,
    RelatedMovies
  },
  computed: mapState({
    loading: state => state.loading,
    movie: state => state.movie,
    recommendations: state => state.recommendations
  }),
  created () {
    this.$store.dispatch('getSingleMovie', this.$route.params.id)
  }
}
</script>
