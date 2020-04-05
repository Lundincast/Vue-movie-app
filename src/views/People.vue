<template>
  <v-container fluid>
    <v-responsive>
      <v-container>
        <v-row>
          <v-col md-6 col-12>
            <ImageDisplayer
              v-if="people"
              :images="peopleImages"/>
          </v-col>
          <v-col md-6 col-12>
            <PeopleDetailsPanel
              v-if="people"
              :people="people"/>
          </v-col>
        </v-row>
        <v-row>
          <PeopleCredits
            v-if="people"
            v-bind:castMovies="peopleCastCreditsList"
            v-bind:crewMovies="peopleCrewCreditsList"/>
        </v-row>
      </v-container>
    </v-responsive>
  </v-container>
</template>

<script>
import api from '../api/api'
import _ from 'lodash'

export default {
  name: 'People',
  components: {
    ImageDisplayer: () => import('@/components/ImageDisplayer'),
    PeopleDetailsPanel: () => import('@/components/PeopleDetailsPanel'),
    PeopleCredits: () => import('@/components/PeopleCredits')
  },
  data () {
    return {
      people: null
    }
  },
  computed: {
    peopleImages: function () {
      if (this.people) {
        return this.people.images.profiles
          .slice(0, 10)
          .map(i => 'https://image.tmdb.org/t/p/w500' + i.file_path)
      } else {
        return []
      }
    },
    peopleCastCreditsList: function () {
      // split movies based on if they have release_date defined or not
      // see here for details https://lodash.com/docs/4.17.15#partition (used with
      // the `_.property` iteratee shorthand)
      let splitCastArray = _.partition(this.people.movie_credits.cast, 'release_date')
      console.log('splitCastArray: ' + splitCastArray[0])
      let mergedArray = this.removeDuplicates(splitCastArray[0])
      // sort movies arrays by descending release_date
      mergedArray.sort(function (a, b) {
        return new Date(b.release_date) - new Date(a.release_date)
      })
      // If there was movies with no release_date, add them to the end of their respective arrays
      if (splitCastArray[1]) {
        mergedArray.push(...splitCastArray[1])
      }
      return mergedArray
    },
    peopleCrewCreditsList: function () {
      let splitCrewArray = _.partition(this.people.movie_credits.crew, 'release_date')
      let mergedArray = this.removeDuplicates(splitCrewArray[0])
      mergedArray.sort(function (a, b) {
        return new Date(b.release_date) - new Date(a.release_date)
      })
      if (splitCrewArray[1]) {
        mergedArray.push(...splitCrewArray[1])
      }
      return mergedArray
    }
  },
  methods: {
    removeDuplicates: function (movies) {
      // Process arrays to remove duplicates movies when people have
      // more than one role/job in a single movie
      let mergedMovies = []
      for (let i = 0; i < movies.length; i++) {
        if (i === 0) {
          mergedMovies.push(movies[i])
          continue
        }
        for (let j = 0; j < mergedMovies.length; j++) {
          if (movies[i].id === mergedMovies[j].id) {
            mergedMovies[j].job = mergedMovies[j].job + ', ' + movies[i].job
            break
          }
          if (j === mergedMovies.length - 1) {
            mergedMovies.push(movies[i])
            break
          }
        }
      }
      return mergedMovies
    }
  },
  async created () {
    try {
      const response = await api.getPeopleDetails(this.$route.params.id)
      this.people = response
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
