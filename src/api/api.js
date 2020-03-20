import axios from 'axios'

const formattedUrl = (rawUrl) => {
  if (rawUrl) {
    return 'https://image.tmdb.org/t/p/w500' + rawUrl
  } else {
    return null
  }
}

const processListUrls = (itemList) => {
  return itemList.map(function (item) {
    if (item.poster_path) {
      item.poster_path = formattedUrl(item.poster_path)
    }
    if (item.profile_path) {
      item.profile_path = formattedUrl(item.profile_path)
    }
    return item
  })
}

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

instance.interceptors.request.use(config => {
  config.params = {
    page: 1,
    // set API Key via a .env.local file. For details, see here:
    // https://cli.vuejs.org/guide/mode-and-env.html#environment-variables
    api_key: process.env.VUE_APP_MOVIEDB_API_KEY,
    // spread the request's params
    ...config.params
  }
  return config
})

export default {
  async getGenreList () {
    const response = await instance
      .get('/genre/movie/list')
    return response.data.genres
  },
  getTrending () {
    return instance
      .get('/trending/movie/week')
      .then(response => {
        return processListUrls(response.data.results)
      })
  },
  async getMoviesByGenre (genre, page) {
    const response = await instance
      .get('/discover/movie', {
        params: {
          with_genres: genre,
          page: page
        }
      })
    return processListUrls(response.data.results)
  },
  async getSimilarMovies (movieId, page) {
    const response = await instance
      .get('/movie/' + movieId + '/similar', {
        params: {
          sort_by: 'popularity.desc',
          page: page
        }
      })
    return processListUrls(response.data.results)
  },
  async getRecommendedMovies (movieId, page) {
    const response = await instance
      .get('/movie/' + movieId + '/recommendations', {
        params: {
          sort_by: 'popularity.desc',
          page: page
        }
      })
    return processListUrls(response.data.results)
  },
  getSingleMovie (id) {
    let url = '/movie/' + id
    return instance
      .get(url, {
        params: {
          append_to_response: 'credits,recommendations,similar'
        }
      })
      .then(response => {
        let data = response.data
        data.poster_path = formattedUrl(response.data.poster_path)
        data.recommendations.results = processListUrls(data.recommendations.results)
        data.similar.results = processListUrls(data.similar.results)
        return data
      })
  },
  getPeopleDetails (id) {
    let url = '/person/' + id
    return instance
      .get(url, {
        params: {
          append_to_response: 'images,movie_credits'
        }
      })
      .then(response => {
        response.data.movie_credits.cast = processListUrls(response.data.movie_credits.cast)
        response.data.movie_credits.crew = processListUrls(response.data.movie_credits.crew)
        return response.data
      })
  },
  async makeSearch (searchString) {
    const response = await instance
      .get('/search/multi', {
        params: {
          query: searchString,
          page: 1
        }
      })
    response.data.results.forEach(entry => {
      if (entry.known_for) {
        entry.known_for.forEach(movie => {
          movie.poster_path = formattedUrl(movie.poster_path)
        })
      }
    })
    return processListUrls(response.data.results)
  }
}
