<template>
  <div class="home">

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Локации для съемок</h2>
      </div>

      <div class="column is-3"
           v-for="location in latestLocations"
           v-bind:key="location.id"
      >
        <div class="box">
          <router-link v-bind:to="location.get_absolute_url">
            <figure class="image mb-4">
              <img :src="location.get_first_photo" width="100" height="100">
            </figure>

            <h3 class="is-size-4">{{ location.Title }}</h3>
          </router-link>
          <b-button class="button is-dark mt-4" @click="redirect(location.Link)" size="lg">Посмотреть на сайте
          </b-button>
        </div>
      </div>
    </div>

    <template v-if="showPrevButton">
      <b-button class="button is-dark mt-4" @click="loadPrev()" size="lg">Предыдущая страница</b-button>
    </template>
    <template v-if="showNextButton">
      <b-button class="button is-dark mt-4" @click="loadNext()" size="lg">Следующая страница</b-button>
    </template>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      latestLocations: [],
      currentPage: 1,
      showPrevButton: false,
      showNextButton: false
    }
  },
  components: {},
  mounted() {
    this.getLatestLocations()

    document.title = 'Локации'
  },
  methods: {
    loadPrev() {
      this.currentPage -= 1
      this.getLatestLocations()
      window.scrollTo(0, 0);
    },
    loadNext() {
      this.currentPage += 1
      this.getLatestLocations()
      window.scrollTo(0, 0);
    },
    async getLatestLocations() {
      this.$store.commit('setIsLoading', true)
      await axios.get(`/api/v1/locations/?page=${this.currentPage}`)
          .then(response => {
            this.latestLocations = response.data.results
            this.showNextButton = false
            this.showPrevButton = false
            if (response.data.next) {
              this.showNextButton = true
            }

            if (response.data.previous) {
              this.showPrevButton = true
            }
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      this.$store.commit('setIsLoading', false)
    },
    redirect(link, target = '_blank') {
      window.open(link, target);
    }
  }
}
</script>

<style scoped>
.image {
  margin-top: -1.13rem;
  margin-right: -1.13rem;
  margin-left: -1.13rem;
}
</style>