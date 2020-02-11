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
import { mapGetters } from 'vuex'

export default {
  name: 'People',
  components: {
    ImageDisplayer: () => import('@/components/ImageDisplayer'),
    PeopleDetailsPanel: () => import('@/components/PeopleDetailsPanel'),
    PeopleCredits: () => import('@/components/PeopleCredits')
  },
  computed: {
    ...mapGetters([
      'people',
      'peopleImages',
      'peopleCastCreditsList',
      'peopleCrewCreditsList'
    ])
  },
  async mounted () {
    await this.$store.dispatch('getPeopleDetails', this.$route.params.id)
  }
}
</script>
