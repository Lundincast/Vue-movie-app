import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    movies: [],
    movie: null,
    people: null,
    recommendations: null
  },
  getters: {
    peopleImages: state => {
      return state.people.images.profiles
        .slice(0, 10)
        .map(i => 'https://image.tmdb.org/t/p/w500' + i.file_path)
    }
  },
  mutations: {
    setMovies (state, payload) {
      state.movies = payload
    },
    setSingleMovie (state, payload) {
      state.movie = payload
    },
    setPeopleDetails (state, payload) {
      state.people = payload
    },
    setRecommendations (state, payload) {
      state.recommendations = payload
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
        movie.director = response.credits.crew.filter(p => p.job === 'Director')// .map(p => p.name).join(', ')
        state.loading = false
        let formattedRecommendations = response.recommendations.results.map(function (movie) {
          movie.poster_path = 'http://image.tmdb.org/t/p/w500' + movie.poster_path
          return movie
        })
        commit('setSingleMovie', movie)
        commit('setRecommendations', formattedRecommendations)
      } catch (error) {
        console.log(error)
      }
    },
    async getPeopleDetails ({ commit }, id) {
      try {
        const response = await api.getPeopleDetails(id)
        commit('setPeopleDetails', response)
      } catch (error) {
        console.log(error)
      }
    }
  }
})
