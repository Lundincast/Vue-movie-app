<template>
  <v-responsive v-if="isSingleImage">
    <v-img
      :src="images[0]"
      contain
      max-height="80vh"
    ></v-img>
  </v-responsive>
  <v-carousel v-else height="900">
    <v-carousel-item
      v-for="(image,i) in images"
      :key="i"
      :src="image"
      contain
      max-height="80vh"
    >
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: 'imageDisplayer',
  props: ['images'],
  computed: {
    isSingleImage () {
      return this.images.length === 1
    }
  }
}
</script>
