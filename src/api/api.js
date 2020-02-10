import axios from 'axios'

const formattedUrl = (rawUrl) => {
  return 'https://image.tmdb.org/t/p/w500' + rawUrl
}

const processListUrls = (movieList) => {
  return movieList.map(function (movie) {
    movie.poster_path = formattedUrl(movie.poster_path)
    return movie
  })
}

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

instance.interceptors.request.use(config => {
  config.params = {
    page: 1,
    sort_by: 'popularity.desc',
    // set API Key via a .env.local file. For details, see here:
    // https://cli.vuejs.org/guide/mode-and-env.html#environment-variables
    api_key: process.env.VUE_APP_MOVIEDB_API_KEY,
    // spread the request's params
    ...config.params
  }
  return config
})

export default {
  getTrending () {
    return instance
      .get('/trending/movie/week')
      .then(response => {
        return processListUrls(response.data.results)
      })
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
  }
}
