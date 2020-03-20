<template>
    <v-menu
        class="mx-4"
        close-on-content-click
        max-height="500"
        max-width="520"
        :offset-y="true"
    >
        <template v-slot:activator="{ on }">
        <v-text-field
            id="searchField"
            v-model="searchString"
            :dark="!searchFieldFocused"
            hide-details
            :background-color="!searchFieldFocused ? '#3B78E7' : 'white'"
            clearable
            :color="!searchFieldFocused ? '' : 'primary'"
            :flat="!searchFieldFocused"
            class="black-text"
            prepend-inner-icon="mdi-magnify"
            placeholder="Search movies or people"
            rounded
            single-line
            solo
            @blur="onSearchBlur"
            @focus="onSearchFocus"
            @input="makeSearch"
            v-on="on"
        >
        </v-text-field>
        </template>
        <v-list
            v-show="movieResults.length > 0 || peopleResults.length > 0"
            two-line
        >
            <div v-if="peopleResults">
            <template v-for="(people, index) in peopleResults">
                <v-subheader
                v-if="people.header"
                :key="people.header"
                v-text="people.header"
                ></v-subheader>

                <v-divider
                v-else-if="people.divider"
                :key="index"
                :inset="people.inset"
                ></v-divider>

                <v-list-item
                v-else
                :key="people.id"
                @click="navigateTo('/people/', people.id)"
                >
                <v-list-item-avatar>
                    <v-img :src="people.profile_path"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title v-html="people.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="people.known_for_department"></v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item>
            </template>
            </div>
            <template v-for="(movie, index) in movieResults">
            <v-subheader
                v-if="movie.header"
                :key="movie.header"
                v-text="movie.header"
            ></v-subheader>

            <v-divider
                v-else-if="movie.divider"
                :key="index"
                :inset="movie.inset"
            ></v-divider>

            <v-list-item
                v-else
                :key="movie.title"
                @click="navigateTo('/movie/', movie.id)"
            >
                <v-list-item-avatar
                horizontal
                height="100"
                width="79"
                class="ml-2">
                <v-img :src="movie.poster_path"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                <v-list-item-title v-html="movie.title"></v-list-item-title>
                <v-list-item-subtitle v-html="movie.overview"></v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            </template>
        </v-list>
    </v-menu>
</template>

<script>
import api from '../api/api'
import _ from 'lodash'

export default {
  name: 'searchView',
  props: ['searchString'],
  data () {
    return {
      searchFieldFocused: false,
      movieResults: [],
      peopleResults: []
    }
  },
  methods: {
    onSearchBlur () {
      this.searchFieldFocused = false
      this.overlay = false
    },
    onSearchFocus () {
      this.searchFieldFocused = true
      this.overlay = true
    },
    makeSearch: _.debounce(function (searchString) {
      if (searchString !== '') {
        api.makeSearch(searchString)
          .then(response => {
            let peopleResults = [{ header: 'People' }]
            let movieResults = [{ header: 'Movies' }]
            response.forEach(element => {
              if (element.media_type === 'movie') {
                movieResults.push(element)
              } else if (element.media_type === 'person') {
                element.known_for.forEach(movie => {
                  movieResults.push(movie)
                })
                peopleResults.push(element)
              }
            })
            if (movieResults.length > 1) {
              this.movieResults = movieResults
            }
            if (peopleResults.length > 1) {
              this.peopleResults = peopleResults
            }
            this.value = true
          })
      }
    }, 800),
    navigateTo (route, id) {
      this.$router.push(route + id)
    }
  }
}
</script>
