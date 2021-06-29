<template>
  <section class="container">
    <h1 class="large text-primary">
      Sign Up
    </h1>
    <p class="lead">
      <i class="fas fa-user" /> Create Your Account
    </p>
    <form
      class="form"
      @submit.prevent="onSubmit"
    >
      <div class="form-group">
        <input
          v-model="formData.name"
          type="text"
          placeholder="Name"
          name="name"
          required
        >
      </div>
      <div class="form-group">
        <input
          v-model="formData.email"
          type="email"
          placeholder="Email Address"
          name="email"
        >
        <small class="form-text">
          This site uses Gravatar so if you want a profile image, use a Gravatar
          email
        </small>
      </div>
      <div class="form-group">
        <input
          v-model="formData.password"
          type="password"
          placeholder="Password"
          name="password"
          minLength="6"
        >
      </div>
      <div class="form-group">
        <input
          v-model="formData.passwordConfirm"
          type="password"
          placeholder="Confirm Password"
          name="passwordConfirm"
          minLength="6"
        >
      </div>
      <input
        type="submit"
        class="btn btn-primary"
        value="Register"
      >
    </form>
    <p class="my-1">
      Already have an account? <router-link to="/login">
        Sign In
      </router-link>
    </p>
  </section>
</template>

<script>
import { AuthService } from '../../api'
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
  name: 'Register',

  setup () {
    const store = useStore()

    const formData = ref({
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    })

    const onSubmit = async () => {
      if (
        formData.value.password &&
          formData.value.password === formData.value.passwordConfirm
      ) {
        try {
          const body = {
            name: formData.value.name,
            email: formData.value.email,
            password: formData.value.password
          }
          await AuthService.registUser(body)

          await store.dispatch('showAlert', {
            isShow: true,
            data: [{msg: 'Your registration has been successfully completed'}],
            status: 'success'
          })
        } catch (err) {
          await store.dispatch('showAlert', {
            isShow: true,
            data: err.response.data.errors,
            status: 'danger'
          })
        }
      } else {
        await store.dispatch('showAlert', {
          isShow: true,
          data: [{msg: 'Password does not match'}],
          status: 'danger'
        })
      }
    }

    return {
      formData,
      onSubmit
    }
  }
}
</script>

<style lang="scss" scoped></style>
