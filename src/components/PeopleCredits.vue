<template>
  <v-container class="mx-0">
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
              <v-row
                v-for="(movie, index) in castMovies"
                :key="index"
                @click="singleMovie(movie.id)"
              >
                <v-hover>
                  <template v-slot="{ hover }">
                    <v-card :elevation="hover ? 6 : 1" class="my-2">
                      <v-row>
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
                  </template>
                </v-hover>
              </v-row>
            </v-tab-item>
            <v-tab-item v-if="crewMovies.length > 0">
              <v-card flat>
                <v-row
                  v-for="(movie, index) in crewMovies"
                  :key="index"
                  @click="singleMovie(movie.id)"
                >
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
