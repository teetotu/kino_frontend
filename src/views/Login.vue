<template>
  <div class="page-sign-up">
    <div class="column is-4 is-offset-4">
      <h1 class="title">Вход</h1>

      <form @submit.prevent="submitForm">
        <div class="field">
          <label>Логин</label>
          <div class="control">
            <input type="text" class="input" v-model="username">
          </div>
        </div>
        <div class="field">
          <label>Пароль</label>
          <div class="control">
            <input type="password" class="input" v-model="password">
          </div>
        </div>

        <div class="notification is-danger" v-if="errors.length">
          <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-dark">Войти</button>
          </div>
        </div>

        <hr>
        или
        <router-link to="/signup">Зарегистрироваться</router-link>
        , если у Вас еще нет аккаунта
      </form>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Login',

  data() {
    return {
      username: '',
      password: '',
      errors: []
    }
  },
  mounted() {
    document.title = 'Вход'
  },
  methods: {
    async submitForm() {
      axios.defaults.headers.common['Authorization'] = ""

      localStorage.removeItem("token")

      const formData = {
        username: this.username,
        password: this.password
      }

      await axios.post("/api/v1/auth", formData)
          .then(response => {
            const token = response.data.token

            this.$store.commit('setToken', token)

            axios.defaults.headers.common['Authorization'] = "Token " + token


            localStorage.setItem("token", token)

            const toPath = this.$route.query.to || '/account'
            this.$router.push(toPath)
          })
          .catch(error => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(`${error.response.data[property]}`)
              }
            } else {
              this.errors.push('Что-то пошло не так. Попробуйте снова.')
              console.log(JSON.stringify(error))
            }
          })
    }
  }
}
</script>
