<template>
  <v-container fluid>
    <v-responsive>
      <v-container fluid>
        <v-row>
          <v-col md-6 col-12>
            <ImageDisplayer :images="peopleImages"/>
          </v-col>
          <v-col md-6 col-12>
            <PeopleDetailsPanel :people="people"/>
          </v-col>
        </v-row>
        <v-row>
          <PeopleCredits
            v-bind:castMovies="peopleCastCreditsList"
            v-bind:crewMovies="peopleCrewCreditsList"/>
        </v-row>
      </v-container>
    </v-responsive>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'People',
  components: {
    ImageDisplayer: () => import('@/components/ImageDisplayer'),
    PeopleDetailsPanel: () => import('@/components/PeopleDetailsPanel'),
    PeopleCredits: () => import('@/components/PeopleCredits')
  },
  computed: {
    ...mapState({
      people: state => state.people
    }),
    ...mapGetters([
      'peopleImages',
      'peopleCastCreditsList',
      'peopleCrewCreditsList'
    ])
  },
  created () {
    this.$store.dispatch('getPeopleDetails', this.$route.params.id)
  }
}
</script>
