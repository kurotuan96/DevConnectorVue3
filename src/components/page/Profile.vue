<template>
  <section class="container">
    <router-link
      to="/profiles"
      class="btn btn-light"
    >
      Back To Profiles
    </router-link>

    <div class="profile-grid my-1">
      <!-- Top -->
      <div class="profile-top bg-primary p-2">
        <img
          class="round-img my-1"
          :src="profile.user.avatar"
          alt="avatar"
        >
        <h1
          class="large"
          v-text="profile.user.name"
        />
        <p
          class="lead"
          v-text="profile.status + ' at ' + profile.company"
        />
        <p v-text="profile.location" />
        <div class="icons my-1">
          <a
            :href="profile.website"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fas fa-globe fa-2x" />
          </a>
          <a
            v-for="(social, key) in profile.social"
            :key="key"
            :href="social"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i
              class="fab fa-2x"
              :class="`fa-${key}`"
            />
          </a>
        </div>
      </div>

      <!-- About -->
      <div class="profile-about bg-light p-2">
        <h2
          class="text-primary"
          v-text="`${profile.user.name}'s Bio`"
        />
        <p v-text="profile.bio ? profile.bio : 'No Bio'" />
        <div class="line" />
        <h2 class="text-primary">
          Skill Set
        </h2>
        <div class="skills">
          <div
            v-for="(skill, index) in profile.skills"
            :key="index"
            class="p-1"
          >
            <i class="fa fa-check" /> {{ skill }}
          </div>
        </div>
      </div>

      <!-- Experience -->
      <div class="profile-exp bg-white p-2">
        <h2 class="text-primary">
          Experience
        </h2>
        <div
          v-for="exp in profile.experience"
          :key="exp._id"
        >
          <h3
            class="text-dark"
            v-text="exp.company"
          />
          <p v-text="`${moment(exp.from).format('MMM YYYY')} - ${exp.current ? 'Current' : moment(exp.to).format('MMM YYYY')}`" />
          <p><strong>Position: </strong>{{ exp.title }}</p>
          <p v-if="exp.description">
            <strong>Description: </strong> {{ exp.description }}
          </p>
        </div>
      </div>

      <!-- Education -->
      <div class="profile-edu bg-white p-2">
        <h2 class="text-primary">
          Education
        </h2>
        <div
          v-for="edu in profile.education"
          :key="edu._id"
        >
          <h3 v-text="edu.school" />
          <p v-text="`${moment(edu.from).format('MMM YYYY')} - ${edu.current ? 'Current' : moment(edu.to).format('MMM YYYY')}`" />
          <p><strong>Degree: </strong>{{ edu.degree }}</p>
          <p v-if="edu.fieldOfStudy">
            <strong>Field Of Study: </strong>{{ edu.fieldOfStudy }}
          </p>
          <p v-if="edu.description">
            <strong>Description: </strong>{{ edu.description }}
          </p>
        </div>
      </div>

      <!-- Github -->
      <div class="profile-github">
        <h2 class="text-primary my-1">
          <i class="fab fa-github" /> Github Repos
        </h2>
        <template v-if="githubRepos.length">
          <div
            v-for="repo in githubRepos"
            :key="repo.id"
            class="repo bg-white p-1 my-1"
          >
            <div>
              <h4>
                <a
                  :href="repo.html_url"
                  target="_blank"
                  rel="noopener noreferrer"
                >{{ repo.name }}</a>
              </h4>
              <p v-text="repo.description" />
            </div>
            <div>
              <ul>
                <li class="badge badge-primary">
                  Stars: {{ repo.stargazers_count }}
                </li>
                <li class="badge badge-dark">
                  Watchers: {{ repo.watchers }}
                </li>
                <li class="badge badge-light">
                  Forks: {{ repo.forks }}
                </li>
              </ul>
            </div>
          </div>
        </template>
        <template v-else>
          <p>No Github Repos</p>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import { store } from '../../store'
import { computed } from 'vue'

export default {
  name: 'Profile',

  inject: ['moment'],

  async beforeRouteEnter (to, from, next) {
    try {
      const userId = to.params.userId
      await store.dispatch('profile/getProfile', userId)
    } catch (e) {
      await store.dispatch('showAlert', {
        isShow: true,
        status: 'danger',
        data: e.response.data.errors
      })
    }

    try {
      store.commit('profile/setGithubRepos', [])
      const userName = store.getters['profile/profile'].githubUsername
      await store.dispatch('profile/getGithubRepos', userName)
    } catch (e) {
      await store.dispatch('showAlert', {
        isShow: true,
        status: 'danger',
        data: [e.response.data]
      })
    }
    next()
  },

  setup () {
    const profile = computed(() => store.getters['profile/profile'])
    const githubRepos = computed(() => store.getters['profile/githubRepos'])

    return {
      profile,
      githubRepos
    }
  },

  beforeDestroy () {
    store.commit('profile/setProfile', {})
  }
}
</script>

<style lang="scss" scoped></style>
