<template>
  <section class="container">
    <h1 class="large text-primary">
      Sign In
    </h1>
    <p class="lead">
      <i class="fas fa-user" /> Sign into Your Account
    </p>
    <form
      class="form"
      @submit.prevent="onSubmit"
    >
      <div class="form-group">
        <input
          v-model="formData.email"
          type="email"
          placeholder="Email Address"
          name="email"
          required
        >
      </div>
      <div class="form-group">
        <input
          v-model="formData.password"
          type="password"
          placeholder="Password"
          name="password"
        >
      </div>
      <input
        type="submit"
        class="btn btn-primary"
        value="Login"
      >
    </form>
    <p class="my-1">
      Don't have an account? <router-link to="/register">
        Sign Up
      </router-link>
    </p>
  </section>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',

  setup () {
    const store = useStore()
    const router = useRouter()

    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

    const formData = ref({
      email: '',
      password: ''
    })

    const onSubmit = async () => {
      try {
        await store.dispatch('auth/login', formData.value)
        await router.push({ name: 'Dashboard' })
      } catch (err) {
        await store.dispatch('showAlert', {
          isShow: true,
          data: err.response.data.errors,
          status: 'danger'
        })
      }
    }

    return {
      formData,
      isAuthenticated,
      onSubmit
    }
  }
}
</script>

<style lang="scss" scoped></style>
