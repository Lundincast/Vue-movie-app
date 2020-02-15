<template>
  <v-card
    class="mx-auto"
  >
    <v-list>
      <v-list-item>
        <v-list-item-avatar v-if="user.photoURL">
          <img :src="user.photoURL">
        </v-list-item-avatar>
        <v-list-item-avatar v-else color="pink" size="40">
          <span class="white--text headline">{{ initialLetter }}</span>
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title v-if="user.displayName">{{ user.displayName }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-heart</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Favorites</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-update</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Watchlist</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="primary" text @click="$emit('close-menu')">Logout</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ProfileMenu',
  props: ['user', 'initialLetter']
}
</script>
