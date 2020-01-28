<template>
  <v-container class="mx-auto">
    <v-responsive>
      <v-flex>
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title class="mx-auto"><b>Filmography</b></v-toolbar-title>
          </v-toolbar>
          <v-tabs centered>
            <v-tab v-if="castMovies.length > 0">
              Cast ({{ castMovies.length }})
            </v-tab>
            <v-tab v-if="crewMovies.length > 0">
              Crew ({{ crewMovies.length }})
            </v-tab>
            <v-tab-item v-if="castMovies.length > 0">
              <v-container>
                <template
                  v-for="(movie, index) in castMovies"
                >
                  <v-hover v-slot:default="{ hover }" :key="index">
                    <v-card
                      :elevation="hover ? 10 : 2"
                      class="my-2"
                      @click="singleMovie(movie.id)"
                    >
                      <v-row class="pe-6">
                        <v-col
                          cols="3"
                        >
                          <v-img
                            class="mx-auto"
                            height="225"
                            width="150"
                            :src="movie.poster_path"
                          ></v-img>
                        </v-col>
                        <v-col
                          cols="9"
                        >
                          <v-row>
                            <h3>{{ movie.title }}</h3>
                          </v-row>
                          <v-row>
                            {{ movie.release_date }}
                          </v-row>
                          <v-row>
                            Character: {{ movie.character || 'Unknown'}}
                          </v-row>
                          <v-row>
                            {{ movie.overview }}
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-hover>
                </template>
              </v-container>
            </v-tab-item>
            <v-tab-item v-if="crewMovies.length > 0">
              <v-container>
                <template
                  v-for="(movie, index) in crewMovies"
                >
                  <v-hover v-slot:default="{ hover }" :key="index">
                    <v-card
                      :elevation="hover ? 10 : 2"
                      class="my-2"
                      @click="singleMovie(movie.id)"
                    >
                      <v-row class="pe-6">
                        <v-col
                          cols="3"
                        >
                          <v-img
                            class="mx-auto"
                            height="225"
                            width="150"
                            :src="movie.poster_path"
                          ></v-img>
                        </v-col>
                        <v-col
                          cols="9"
                        >
                          <v-row>
                            <h3>{{ movie.title }}</h3>
                          </v-row>
                          <v-row>
                            {{ movie.release_date }}
                          </v-row>
                          <v-row>
                            Job: {{ movie.job }}
                          </v-row>
                          <v-row>
                            {{ movie.overview }}
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-hover>
                </template>
              </v-container>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-flex>
    </v-responsive>
  </v-container>
</template>

<script>
export default {
  name: 'PeopleCredit',
  props: ['castMovies', 'crewMovies'],
  methods: {
    singleMovie (id) {
      this.$router.push('/movie/' + id)
    }
  }
}
</script>
