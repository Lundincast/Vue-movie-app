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
      </v-container>
    </v-responsive>
  </v-container>
</template>

<script>
// @ is an alias to /src
import ImageDisplayer from '@/components/ImageDisplayer'
import PeopleDetailsPanel from '@/components/PeopleDetailsPanel'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'People',
  components: {
    ImageDisplayer,
    PeopleDetailsPanel
  },
  computed: {
    ...mapState({
      people: state => state.people
    }),
    ...mapGetters([
      'peopleImages'
    ])
  },
  created () {
    this.$store.dispatch('getPeopleDetails', this.$route.params.id)
  }
}
</script>