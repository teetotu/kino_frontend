<template>
  <div class="page-location">
    <div class="columns is-multiline">
      <div class="column is-9">
        <h1 class="title">{{ location.Title }}</h1>

        <carousel
            @next="next"
            @prev="prev"
        >
          <carousel-slide v-for="(photo, index) in location.get_photos"
                          :key="photo"
                          :index="index"
                          :visibleSlide="visibleSlide">
            <img :src="photo"/>
          </carousel-slide>
        </carousel>
      </div>

      <div class="column is-3">
        <h2 class="title">Информация</h2>
        <p><strong>Описание: </strong>{{ location.get_descriptions }}</p>
        <b-button class="button is-dark mt-4" @click="redirect(location.Link)" size="lg">Посмотреть на сайте</b-button>
      </div>
    </div>
  </div>
</template>

<script>


import axios from 'axios'
import Carousel from './Carousel.vue'
import CarouselSlide from './CarouselSlide.vue'

export default {
  components: {
    Carousel,
    CarouselSlide
  },

  name: 'Location',
  data() {
    return {
      location: {},
      visibleSlide: 0,
    }
  },
  mounted() {
    return this.getLocation()
  },
  methods: {
    async getLocation() {
      this.$store.commit('setIsLoading', true)
      const location_slug = this.$route.params.location_slug

      await axios.get(`/api/v1/locations/${location_slug}`)
          .then(response => {
            this.location = response.data

            document.title = this.location.Title + ' | Локация'
          })
          .catch(error => {
            console.log(error)
          })
      this.$store.commit('setIsLoading', false)
    },
    next() {
      if (this.visibleSlide >= this.location.get_photos.length - 1) {
        this.visibleSlide = 0;
      } else {
        this.visibleSlide++;
      }
    },
    prev() {
      if (this.visibleSlide <= 0) {
        this.visibleSlide = this.location.get_photos.length - 1;
      } else {
        this.visibleSlide--;
      }
    },
  }
}
</script>
