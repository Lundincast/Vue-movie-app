<template>
  <v-container fluid>
    <v-tabs
      v-model="tab"
      centered
    >
      <v-tab href="#grid-tab">
        <v-icon>mdi-view-dashboard-variant</v-icon>
      </v-tab>
      <v-tab href="#list-tab">
        <v-icon>mdi-format-list-bulleted-square</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item
        :value="'grid-tab'"
        transition="fade-transition"
      >
        <v-container class="mb-12">
          <v-row>
            <v-col
              v-for="(movie, id) in activeMovieList"
              :key="id"
              cols="3"
            >
              <PosterMovieCard
                :movieId="movie.id"
                :moviePosterPath="movie.poster_path"
                class="mb-12"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
      <v-tab-item
        :value="'list-tab'"
        transition="fade-transition"
      >
        <v-container>
          <template
            v-for="(movie, index) in activeMovieList"
          >
            <v-hover v-slot:default="{ hover }" :key="index">
              <v-card
                :elevation="hover ? 10 : 2"
                class="my-2"
                @click="singleMovie(movie.movie_id)"
              >
                <v-row class="pe-6">
                  <v-col
                    cols="3"
                  >
                    <v-img
                      class="mx-auto"
                      height="225"
                      width="150"
                      :src="movie.poster_path"
                    ></v-img>
                  </v-col>
                  <v-col
                    cols="9"
                  >
                    <v-row>
                      <h3 class="display-2 mb-3">{{ movie.title }}</h3>
                    </v-row>
                    <v-row>
                      {{ movie.overview }}
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-hover>
          </template>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'tabbedMovieList',
  props: ['context'],
  components: {
    PosterMovieCard: () => import('@/components/PosterMovieCard.vue')
  },
  data () {
    return {
      tab: null
    }
  },
  computed: {
    ...mapState({
      favoriteMovies: state => state.favoriteMovies,
      watchlistedMovies: state => state.watchlistedMovies
    }),
    activeMovieList () {
      if (this.context === 'Favorites') {
        return this.favoriteMovies
      } else {
        return this.watchlistedMovies
      }
    }
  },
  methods: {
    singleMovie (id) {
      this.$router.push('/movie/' + id)
    }
  }
}
</script>
