<template>
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

<script>
export default {
  name: 'expandedMovieCard',
  props: ['movie']
}
</script>
