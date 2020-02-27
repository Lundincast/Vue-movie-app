<template>
  <v-container fluid>
    <v-row>
      <v-col cols="10" class="mx-auto">
        <h3 class="mx-auto display-3">{{ header }}</h3>
      </v-col>
    </v-row>
    <v-row>
      <TabbedMovieList :context="header"/>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'favorites',
  data () {
    return {
      header: null
    }
  },
  components: {
    TabbedMovieList: () => import('@/components/TabbedMovieList.vue')
  },
  mounted () {
    this.header = this.$router.currentRoute.name === 'favorites' ? 'Favorites' : 'Watchlisted'
  },
  watch: {
    $route (to, from) {
      if (to.name === 'watchlisted') {
        this.header = 'Watchlisted'
      }
      if (to.name === 'favorites') {
        this.header = 'Favorites'
      }
    }
  }
}
</script>
