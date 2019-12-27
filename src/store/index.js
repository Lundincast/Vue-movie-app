import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    movies: [],
    movie: null
  },
  mutations: {
    setMovies (state, payload) {
      state.movies = payload
    },
    setSingleMovie (state, payload) {
      state.movie = payload
    }
  },
  actions: {
    async getMovies ({ state, commit }, params) {
      state.loading = true
      try {
        let response = await api.getTrending()
        let rawResults = response.results
        let formattedResults = rawResults.map(function (movie) {
          movie.poster_path = 'http://image.tmdb.org/t/p/w500' + movie.poster_path
          movie.release_date = new Date(movie.release_date).getFullYear()
          return movie
        })
        state.loading = false
        commit('setMovies', formattedResults)
      } catch (error) {
        console.log(error)
      }
    },
    async getSingleMovie ({ state, commit }, id) {
      state.loading = true
      try {
        let response = await api.getSingleMovie(id)
        let movie = {}
        movie.title = response.title
        movie.poster_path = 'http://image.tmdb.org/t/p/w500' + response.poster_path
        movie.runtime = response.runtime
        movie.overview = response.overview
        movie.production_countries = response.production_countries
        movie.release_date = new Date(response.release_date).getFullYear()
        movie.cast = response.credits.cast.slice(0, 15)
        movie.director = response.credits.crew.filter(p => p.job === 'Director').map(p => p.name).join(', ')
        state.loading = false
        commit('setSingleMovie', movie)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
