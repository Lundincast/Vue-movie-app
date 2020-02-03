<template>
  <v-img v-if="isSingleImage"
    :src="images[0]"
  ></v-img>
  <v-carousel v-else height="900">
    <v-carousel-item
        v-for="(image,i) in images"
        :key="i"
        :src="image">
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
