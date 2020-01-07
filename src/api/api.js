import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

instance.interceptors.request.use(config => {
  config.params = {
    // add your default ones
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
        return response.data
      })
  },
  getSingleMovie (id) {
    let url = '/movie/' + id
    return instance
      .get(url, {
        params: {
          append_to_response: 'credits,recommendations'
        }
      })
      .then(response => {
        return response.data
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
        return response.data
      })
  }
}
