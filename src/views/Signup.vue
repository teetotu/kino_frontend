<template>
  <div class="page-sign-up">
    <div class="column is-4 is-offset-4">
      <h1 class="title">Регистрация</h1>

      <form @submit.prevent="submitForm">
        <div class="field">
          <label>Логин</label>
          <div class="control">
            <input type="text" class="input" v-model="username">
          </div>
        </div>

        <div class="field">
          <label>Имя</label>
          <div class="control">
            <input type="text" class="input" v-model="first_name">
          </div>
        </div>

        <div class="field">
          <label>Фамилия</label>
          <div class="control">
            <input type="text" class="input" v-model="last_name">
          </div>
        </div>

        <div class="field">
          <label>Почта</label>
          <div class="control">
            <input type="text" class="input" v-model="email">
          </div>
        </div>

        <div class="field">
          <label>Пароль</label>
          <div class="control">
            <input type="password" class="input" v-model="password">
          </div>
        </div>

        <div class="field">
          <label>Повторите пароль</label>
          <div class="control">
            <input type="password" class="input" v-model="password2">
          </div>
        </div>

        <div class="notification is-danger" v-if="errors.length">
          <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
        </div>

        <div class="field">
          <div class="control">
            <button type="button is-dark" class="block">Зарегистрироваться</button>
          </div>
        </div>


        <hr>
        или
        <router-link to="/login">Войти</router-link>
        , если у Вас уже есть аккаунт
      </form>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import {toast} from 'bulma-toast'

export default {
  name: 'SignUp',

  data() {
    return {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      password2: '',
      errors: []
    }
  },
  mounted() {
    document.title = 'Регистрация'
  },
  methods: {
    submitForm() {
      this.errors = []

      if (this.username === '') {
        this.errors.push('Введите логин')
      }
      if (this.password === '') {
        this.errors.push('Введите пароль')
      }
      if (this.first_name === '') {
        this.errors.push('Введите имя')
      }
      if (this.last_name === '') {
        this.errors.push('Введите фамилию')
      }
      if (this.email === '') {
        this.errors.push('Введите почту')
      }
      if (this.password2 === '') {
        this.errors.push('Введите пароль повторно')
      }
      if (this.password2 !== this.password) {
        this.errors.push('Пароли не совпадают')
      }

      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password,
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
        }

        axios.post("/api/v1/users/", formData)
            .then(response => {
              toast({
                message: 'Профиль создан!',
                type: 'is-success',
                dismissible: true,
                duration: 2000,
                position: 'bottom-right'
              })

              this.$router.push('/login')
            })
            .catch(error => {
              if (error.response) {
                for (const property in error.response.data) {
                  this.errors.push(`${property}: ${error.response.data[property]}`)
                }

                console.log(JSON.stringify(error.response.data))
              } else if (error.message) {
                this.errors.push('Что-то пошло не так. Попробуйте снова.')
              }
            })
      }
    }
  }
}
</script>

<style scoped>
button {
  padding-top: 5px;
}
.block {
  display: block;
  width: 100%;
  border: none;
  background-color: #04AA6D;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
}
</style>
