<template>
<v-container>
  <v-row>
    <v-col col col-12>
      <a class="text--primary body-2 mb-3 d-block underlined" @click="$router.go(-1)">Back</a>
      <h1 class="font-weight-bold mb-6 display-2">{{ movie.title }}</h1>
      <div>
        <div>
          <p class="headline">{{ releaseDate }}</p>
        </div>
      </div>
      <div
        v-if="user"
        class="mx-n2 mb-4"
      >
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              :text="!isFavorite"
              large
              :outlined="!isFavorite"
              class="mx-1"
              color="success"
              @click="favClicked"
              v-on="on">
              Favorite
                <v-icon class="mx-1">mdi-heart</v-icon>
            </v-btn>
          </template>
          <span>{{ nextFavAction }} Favorites</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              :text="!isWatchlisted"
              large
              class="mx-1"
              :outlined="!isWatchlisted"
              color="error"
              @click="WatchlistClicked"
              v-on="on">
              Watchlist
                <v-icon class="mx-1">mdi-update</v-icon>
            </v-btn>
          </template>
            <span>{{ nextWatchlistAction }} Watchlist</span>
        </v-tooltip>
      </div>
      <div>
        <div>
          <b>Production countries</b> : {{ productionCountries }}
        </div>
        <div>
          <b>Director: </b>
          <router-link v-bind:to="{ name: 'people', params: { id: movie.director[0].id }}">
            {{ movie.director[0].name }}
          </router-link>
        </div>
      </div>
      <p><b>Duration :</b> {{ movie.runtime }} min</p>
      <div>
        <v-chip
          v-for="genre in movie.genres"
          :key="genre.id"
          class="mr-2 mb-2"
          color="primary"
          outlined
          pill
        >
          {{ genre.name }}
        </v-chip>
      </div>
      <p class="body-1"><b>Summary:</b> {{ movie.overview }}</p>
      <div v-if="movie.cast.length > 0">
        <p><b>Cast: </b></p>
        <div v-for="(people, index) in movie.cast" :key="index">
          {{ people.character }}:
          <router-link v-bind:to="{ name: 'people', params: { id: people.id}}">
            <b>{{ people.name }}</b>
          </router-link>
        </div>
      </div>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'detailsPanel',
  props: ['movie'],
  data: function () {
    return {
      isFavorite: false,
      isWatchlisted: false
    }
  },
  computed: {
    ...mapState([
      'user'
    ]),
    ...mapGetters([
      'favMoviesIds',
      'watchlistedMoviesIds'
    ]),
    nextFavAction () {
      return this.isFavorite ? 'Remove from' : 'Add to'
    },
    nextWatchlistAction () {
      return this.isWatchlisted ? 'Remove from' : 'Add to'
    },
    productionCountries () {
      const countries = this.movie.production_countries.map(c => c.name)
      return countries.join(', ')
    },
    releaseDate () {
      return this.movie.release_date.getFullYear()
    }
  },
  methods: {
    favClicked () {
      if (this.isFavorite) {
        this.$store.dispatch('removeFromFavs', this.$route.params.id)
      } else {
        this.$store.dispatch('addToFavs', [
          this.$route.params.id,
          this.movie.title,
          this.movie.poster_path,
          this.movie.overview
        ])
      }
      this.isFavorite = !this.isFavorite
    },
    WatchlistClicked () {
      if (this.isWatchlisted) {
        this.$store.dispatch('removeFromWatchlist', this.$route.params.id)
      } else {
        this.$store.dispatch('addToWatchlist', [
          this.$route.params.id,
          this.movie.title,
          this.movie.poster_path,
          this.movie.overview
        ])
      }
      this.isWatchlisted = !this.isWatchlisted
    }
  },
  mounted () {
    if (this.favMoviesIds && this.favMoviesIds.includes(this.$route.params.id)) {
      this.isFavorite = true
    }
    if (this.watchlistedMoviesIds && this.watchlistedMoviesIds.includes(this.$route.params.id)) {
      this.isWatchlisted = true
    }
  }
}
</script>

<style>
.font-weight-bold {
  font-weight: 700 !important;
}
.text--primary {
  color: rgba(0,0,0,.87) !important;
}
.underlined {
  text-decoration: underline;
}
</style>
