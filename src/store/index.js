import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/api'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    genres: [],
    loading: false,
    movies: [],
    favoriteMovies: null,
    watchlistedMovies: null
  },
  getters: {
    favMoviesIds: state => {
      if (state.favoriteMovies) {
        return state.favoriteMovies.map(movie => {
          return movie.id
        })
      } else {
        return []
      }
    },
    watchlistedMoviesIds: state => {
      if (state.watchlistedMovies) {
        return state.watchlistedMovies.map(movie => {
          return movie.id
        })
      } else {
        return []
      }
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    removeUser (state, payload) {
      state.user = null
    },
    setGenreList (state, payload) {
      state.genres = payload
    },
    setMovies (state, payload) {
      state.movies = payload
    },
    setFavoriteMovies (state, payload) {
      state.favoriteMovies = payload
    },
    removeFavoriteMovies (state) {
      state.favoriteMovies = null
    },
    setWatchlistedMovies (state, payload) {
      state.watchlistedMovies = payload
    },
    removeWatchlistedMovies (state) {
      state.watchlistedMovies = null
    }
  },
  actions: {
    setUser ({ commit }, params) {
      commit('setUser', params)
    },
    removeUser ({ commit }) {
      firebase.auth().signOut().then(function () {
        // Sign-out successful.
        commit('removeUser')
        commit('removeFavoriteMovies')
        commit('removeWatchlistedMovies')
      }).catch(function (error) {
        console.log(error)
      })
    },
    async getGenreList ({ commit }) {
      try {
        const response = await api.getGenreList()
        commit('setGenreList', response)
      } catch (error) {
        console.log(error)
      }
    },
    async getMovies ({ state, commit }, params) {
      state.loading = true
      try {
        let response = await api.getTrending()
        let formattedResults = response.map(function (movie) {
          movie.release_date = new Date(movie.release_date).getFullYear()
          return movie
        })
        state.loading = false
        commit('setMovies', formattedResults)
      } catch (error) {
        console.log(error)
      }
    },
    getFavoriteMovies ({ state, commit }, userId) {
      firebase.firestore()
        .collection('FavoriteMovies')
        .where('user_id', '==', userId)
        .onSnapshot(function (querySnapshot) {
          let favs = []
          querySnapshot.forEach(doc => {
            var movie = {}
            movie.id = doc.data().movie_id
            movie.title = doc.data().movie_title
            movie.poster_path = doc.data().movie_poster_path
            movie.overview = doc.data().movie_overview
            movie.docId = doc.ref.id
            favs.push(movie)
          })
          commit('setFavoriteMovies', favs)
        })
    },
    getWatchlistedMovies ({ state, commit }, userId) {
      firebase.firestore()
        .collection('WatchlistedMovies')
        .where('user_id', '==', userId)
        .onSnapshot(function (querySnapshot) {
          let wl = []
          querySnapshot.forEach(doc => {
            var movie = {}
            movie.id = doc.data().movie_id
            movie.title = doc.data().movie_title
            movie.poster_path = doc.data().movie_poster_path
            movie.overview = doc.data().movie_overview
            movie.docId = doc.ref.id
            wl.push(movie)
          })
          commit('setWatchlistedMovies', wl)
        })
    },
    addToFavs ({ commit }, movieInfo) {
      // Add a new document with a generated id.
      firebase.firestore()
        .collection('FavoriteMovies')
        .add({
          movie_id: movieInfo[0],
          movie_title: movieInfo[1],
          movie_poster_path: movieInfo[2],
          movie_overview: movieInfo[3],
          user_id: firebase.auth().currentUser.uid
        })
    },
    removeFromFavs ({ state, commit }, movieId) {
      // Get docId from state.favoriteMovies
      let docId = null
      for (let i = 0; i < state.favoriteMovies.length; i++) {
        if (state.favoriteMovies[i].id === movieId) {
          docId = state.favoriteMovies[i].docId
          break
        }
      }
      if (docId) {
        firebase.firestore()
          .collection('FavoriteMovies')
          .doc(docId)
          .delete()
      }
    },
    addToWatchlist ({ commit }, movieInfo) {
      firebase.firestore()
        .collection('WatchlistedMovies')
        .add({
          movie_id: movieInfo[0],
          movie_title: movieInfo[1],
          movie_poster_path: movieInfo[2],
          movie_overview: movieInfo[3],
          user_id: firebase.auth().currentUser.uid
        })
    },
    removeFromWatchlist ({ state, commit }, movieId) {
      let docId = null
      for (let i = 0; i < state.watchlistedMovies.length; i++) {
        if (state.watchlistedMovies[i].id === movieId) {
          docId = state.watchlistedMovies[i].docId
          break
        }
      }
      if (docId) {
        firebase.firestore()
          .collection('WatchlistedMovies')
          .doc(docId)
          .delete()
      }
    }
  }
})
