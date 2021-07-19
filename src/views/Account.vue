<template>
  <div class="page-account">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Личный кабинет</h1>
      </div>

      <div class="page-location">
        <div class="columns is-multiline">


          <div>
            <p><strong>Логин: </strong>{{ user.username ? user.username : "-" }}</p>
            <p><strong>Имя: </strong>{{ user.first_name ? user.first_name : "-" }}</p>
            <p><strong>Фамилия: </strong>{{ user.last_name ? user.last_name : "-" }}</p>
            <p><strong>Email: </strong>{{ user.email ? user.email : "-" }}</p>

          </div>
        </div>

        <div class="column is-12">
          <button @click="logout()" class="button is-danger">Выйти</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      user: ''
    }
  },

  name: 'Account',
  components: {},
  mounted() {
    this.getProfileInfo()

    document.title = 'Личный кабинет'
  },
  methods: {
    logout() {
      console.log("LOGGINg OUT")
      axios.defaults.headers.common["Authorization"] = ""

      localStorage.removeItem("token")
      localStorage.removeItem("username")
      localStorage.removeItem("userId")

      this.$store.commit('removeToken')

      this.$router.push('/')
    },

    async getProfileInfo() {
      axios.defaults.headers.common["Authorization"] = `Token ${localStorage.getItem('token')}`


      await axios.get(`/api/v1/users`)
          .then(response => {
            this.user = response.data
          })
          .catch(error => {
            console.log(error)
          })

    },
  },
}
</script>
