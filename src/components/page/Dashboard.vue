<template>
  <section class="container">
    <h1 class="large text-primary">
      Dashboard
    </h1>
    <template v-if="Object.keys(profile).length">
      <p class="lead">
        <i class="fas fa-user" /> Welcome {{ profile.user.name }}
      </p>
      <div class="dash-buttons">
        <router-link
          to="/profile/edit"
          class="btn btn-light"
        >
          <i class="fas fa-user-circle text-primary" /> Edit
          Profile
        </router-link>
        <router-link
          to="/profile/experience"
          class="btn btn-light"
        >
          <i class="fab fa-black-tie text-primary" /> Add
          Experience
        </router-link>
        <router-link
          to="/profile/education"
          class="btn btn-light"
        >
          <i class="fas fa-graduation-cap text-primary" /> Add
          Education
        </router-link>
      </div>

      <h2 class="my-2">
        Experience Credentials
      </h2>
      <table
        v-if="profile.experience.length"
        class="table"
      >
        <thead>
          <tr>
            <th>Company</th>
            <th class="hide-sm">
              Title
            </th>
            <th class="hide-sm">
              Years
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="exp in profile.experience"
            :key="exp._id"
          >
            <td>{{ exp.company }}</td>
            <td>{{ exp.title }}</td>
            <td>{{ moment(exp.from).format("DD/MM/YYYY") }} - {{ exp.current ? "now" : moment(exp.to).format("DD/MM/YYYY") }}</td>
            <td>
              <button
                class="btn btn-danger"
                @click="deleteItem('exp', exp._id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else>
        No Experience
      </p>

      <h2 class="my-2">
        Education Credentials
      </h2>
      <table
        v-if="profile.education.length"
        class="table"
      >
        <thead>
          <tr>
            <th>School</th>
            <th class="hide-sm">
              Degree
            </th>
            <th class="hide-sm">
              Years
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="edu in profile.education"
            :key="edu._id"
          >
            <td>{{ edu.school }}</td>
            <td>{{ edu.degree }}</td>
            <td>{{ moment(edu.from).format('DD/MM/YYYY') }} - {{ edu.current ? "now" : moment(edu.to).format('DD/MM/YYYY') }}</td>
            <td>
              <button
                class="btn btn-danger"
                @click="deleteItem('edu', edu._id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else>
        No Education
      </p>

      <div class="my-2">
        <button
          class="btn btn-danger"
          @click="deleteMyAccount"
        >
          <i class="fas fa-user-minus" />

          Delete My Account
        </button>
      </div>
    </template>
    <template v-else>
      <div class="dash-buttons">
        <router-link
          to="/profile/create"
          class="btn btn-light"
        >
          <i class="fas fa-user-circle text-primary" /> Create Profile
        </router-link>
      </div>
    </template>
  </section>
</template>

<script>
import { store } from '../../store'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Dashboard',

  setup () {
    const router = useRouter()

    const profile = computed(() => store.getters['profile/profile'])

    const deleteItem = async (type, id) => {
      try {
        if (type === 'exp') {
          await store.dispatch('profile/deleteExp', id)
        } else {
          await store.dispatch('profile/deleteEdu', id)
        }
        await store.dispatch('profile/getCurrentProfile')
      } catch (e) {
        await store.dispatch('showAlert', {
          status: 'danger',
          data: e.response.data.error,
          isShow: true
        })
      }
    }

    const deleteMyAccount = async () => {
      try {
        const res = await store.dispatch('deleteAccount')
        await store.dispatch('showAlert', {
          status: 'success',
          data: [res],
          isShow: true
        })
        await router.push({ name: 'Login' })
      } catch (e) {
        await store.dispatch('showAlert', {
          status: 'danger',
          data: [{ msg: `${e.response.status}. Server Error! ` }],
          isShow: true
        })
      }
    }

    return {
      profile,
      deleteItem,
      deleteMyAccount
    }
  },

  async beforeRouteEnter (to, from, next) {
    try {
      await store.dispatch('auth/getUserInfo')
      await store.dispatch('profile/getCurrentProfile')
    } catch (err) {
      await store.dispatch('showAlert', {
        isShow: true,
        data: [err.response.data],
        status: 'danger'
      })
    }
    next()
  }
}
</script>

<style lang="scss" scoped></style>
