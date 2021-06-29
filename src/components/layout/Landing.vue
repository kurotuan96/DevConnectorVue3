<template>
  <section class="landing">
    <div class="dark-overlay">
      <div class="landing-inner">
        <h1 class="x-large">
          Developer Connector
        </h1>

        <p class="lead">
          Create a developer profile/portfolio, share posts and get help from
          other developers
        </p>

        <div class="buttons">
          <router-link
            to="/register"
            class="btn btn-primary"
          >
            Sign Up
          </router-link>
          <router-link
            to="/login"
            class="btn btn-light"
          >
            Login
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Landing'
}
</script>

<style lang="scss" scoped>
</style>
