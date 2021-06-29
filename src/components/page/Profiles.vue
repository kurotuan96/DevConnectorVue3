<template>
  <section class="container">
    <h1 class="large text-primary">
      Developers
    </h1>
    <p class="lead">
      <i class="fab fa-connectdevelop" /> Browse and connect with developers
    </p>
    <div class="profiles">
      <div
        v-for="profile in profiles"
        :key="profile._id"
        class="profile bg-light"
      >
        <img
          class="round-img"
          :src="profile.user.avatar"
          alt=""
        >
        <div>
          <h2 v-text="profile.user.name" />
          <p v-text="profile.status + ' at ' + profile.company" />
          <p v-text="profile.location" />
          <router-link
            :to="`/profiles/${profile.user._id}`"
            class="btn btn-primary"
          >
            View Profile
          </router-link>
        </div>

        <ul>
          <li
            v-for="(skill, index) in profile.skills"
            :key="index"
            class="text-primary"
          >
            <i class="fas fa-check" /> {{ skill }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { store } from '../../store'
import { computed } from 'vue'

export default {
  name: 'Profiles',

  async beforeRouteEnter (to, from, next) {
    try {
      await store.dispatch('profile/getAllProfiles')
    } catch (e) {
      await store.dispatch('showAlert', {
        isShow: true,
        status: 'danger',
        data: e.response.data.errors
      })
    }
    next()
  },

  setup () {
    const profiles = computed(() => store.getters['profile/profiles'])

    return {
      profiles
    }
  }
}
</script>

<style lang="scss" scoped></style>
