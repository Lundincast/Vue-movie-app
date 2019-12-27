<template>
  <v-container fluid>
    <v-responsive>
      <v-container fluid>
        <div class="container">
          <v-row>
            <v-col md-6 col-12>
              <ImageDisplayer v-bind:images="[movie.poster_path]"/>
            </v-col>
            <v-col md-6 col-12>
              <DetailsPanel v-bind:movie="movie"/>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-responsive>
  </v-container>
</template>

<script>
// @ is an alias to /src
import ImageDisplayer from '@/components/ImageDisplayer'
import DetailsPanel from '@/components/DetailsPanel'
import { mapState } from 'vuex'

export default {
  name: 'Movie',
  components: {
    ImageDisplayer,
    DetailsPanel
  },
  computed: mapState({
    loading: state => state.loading,
    movie: state => state.movie
  }),
  created () {
    this.$store.dispatch('getSingleMovie', this.$route.params.id)
  }
}
</script>
