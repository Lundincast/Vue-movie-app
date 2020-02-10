import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/api'
import firebase from 'firebase'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    movies: [],
    movie: null,
    people: null,
    recommendations: null,
    similar: null,
    favoriteMovies: null,
    watchlistedMovies: null
  },
  getters: {
    peopleImages: state => {
      return state.people.images.profiles
        .slice(0, 10)
        .map(i => 'https://image.tmdb.org/t/p/w500' + i.file_path)
    },
    peopleCastCreditsList: state => {
      state.people.movie_credits.cast.map(function (movie) {
        movie.release_date = new Date(movie.release_date).getFullYear()
        return movie
      })
      return state.people.movie_credits.cast
    },
    peopleCrewCreditsList: state => {
      state.people.movie_credits.crew.map(function (movie) {
        movie.release_date = new Date(movie.release_date).getFullYear()
        return movie
      })
      return state.people.movie_credits.crew
    },
    favMoviesIds: state => {
      let ids = state.favoriteMovies.map(function (movie) {
        return movie.movie_id
      })
      return ids
    },
    watchlistedMoviesIds: state => {
      let ids = state.watchlistedMovies.map(function (movie) {
        return movie.movie_id
      })
      return ids
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    removeUser (state, payload) {
      state.user = null
    },
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
    },
    setSimilar (state, payload) {
      state.similar = payload
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
    async getSingleMovie ({ state, commit }, id) {
      state.loading = true
      try {
        let response = await api.getSingleMovie(id)
        let movie = {}
        movie.title = response.title
        movie.poster_path = response.poster_path
        movie.runtime = response.runtime
        movie.overview = response.overview
        movie.production_countries = response.production_countries
        movie.release_date = new Date(response.release_date)
        movie.cast = response.credits.cast.slice(0, 15)
        movie.director = response.credits.crew.filter(p => p.job === 'Director')// .map(p => p.name).join(', ')
        commit('setSingleMovie', movie)
        commit('setRecommendations', response.recommendations.results)
        commit('setSimilar', response.similar.results)
        state.loading = false
      } catch (error) {
        console.log(error)
      }
    },
    async getPeopleDetails ({ commit }, id) {
      try {
        const response = await api.getPeopleDetails(id)
        // split movies based on if they have release_date defined or not
        // see here for details https://lodash.com/docs/4.17.15#partition (used with
        // the `_.property` iteratee shorthand)
        let splitCastArray = _.partition(response.movie_credits.cast, 'release_date')
        let splitCrewArray = _.partition(response.movie_credits.crew, 'release_date')
        // Process arrays to remove duplicates movies when people have
        // more than one role/job in a single movie
        let mergedCastMovies = []
        for (let i = 0; i < splitCastArray[0].length; i++) {
          if (i === 0) {
            mergedCastMovies.push(splitCastArray[0][i])
            continue
          }
          for (let j = 0; j < mergedCastMovies.length; j++) {
            if (splitCastArray[0][i].id === mergedCastMovies[j].id) {
              mergedCastMovies[j].job = mergedCastMovies[j].job + ', ' + splitCastArray[0][i].job
              break
            }
            if (j === mergedCastMovies.length - 1) {
              mergedCastMovies.push(splitCastArray[0][i])
              break
            }
          }
        }
        let mergedCrewMovies = []
        for (let i = 0; i < splitCrewArray[0].length; i++) {
          if (i === 0) {
            mergedCrewMovies.push(splitCrewArray[0][i])
            continue
          }
          for (let j = 0; j < mergedCrewMovies.length; j++) {
            if (splitCrewArray[0][i].id === mergedCrewMovies[j].id) {
              mergedCrewMovies[j].job = mergedCrewMovies[j].job + ', ' + splitCrewArray[0][i].job
              break
            }
            if (j === mergedCrewMovies.length - 1) {
              mergedCrewMovies.push(splitCrewArray[0][i])
              break
            }
          }
        }
        // sort movies arrays by descending release_date
        mergedCastMovies.sort(function (a, b) {
          return new Date(b.release_date) - new Date(a.release_date)
        })
        mergedCrewMovies.sort(function (a, b) {
          return new Date(b.release_date) - new Date(a.release_date)
        })
        // If there was movies with no release_date, add them to the end of their respective arrays
        if (splitCastArray[1]) {
          mergedCastMovies.push(...splitCastArray[1])
        }
        if (splitCrewArray[1]) {
          mergedCrewMovies.push(...splitCrewArray[1])
        }
        // reassign these processed array to their respective properties in the response object
        response.movie_credits.cast = mergedCastMovies
        response.movie_credits.crew = mergedCrewMovies
        commit('setPeopleDetails', response)
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
            movie.movie_id = doc.data().movie_id
            movie.movie_name = doc.data().movie_name
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
            movie.movie_id = doc.data().movie_id
            movie.movie_name = doc.data().movie_name
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
          movie_name: movieInfo[1],
          user_id: firebase.auth().currentUser.uid
        })
    },
    removeFromFavs ({ state, commit }, movieId) {
      // Get docId from state.favoriteMovies
      let docId = null
      for (let i = 0; i < state.favoriteMovies.length; i++) {
        if (state.favoriteMovies[i].movie_id === movieId) {
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
          movie_name: movieInfo[1],
          user_id: firebase.auth().currentUser.uid
        })
    },
    removeFromWatchlist ({ state, commit }, movieId) {
      let docId = null
      for (let i = 0; i < state.watchlistedMovies.length; i++) {
        if (state.watchlistedMovies[i].movie_id === movieId) {
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
