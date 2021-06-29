<template>
  <section class="container">
    <h1 class="large text-primary">
      {{ route.name === 'ProfileCreate' ? 'Create Your Profile' : 'Edit Your Profile' }}
    </h1>
    <p class="lead">
      <i class="fas fa-user" /> Let's get some information to make your
      profile stand out
    </p>
    <small>* = required field</small>
    <form
      class="form"
      @submit.prevent="onSubmit"
    >
      <div class="form-group">
        <select
          v-model="formData.status"
          name="status"
          required
        >
          <option value="">
            * Select Professional Status
          </option>
          <option value="Developer">
            Developer
          </option>
          <option value="Junior Developer">
            Junior Developer
          </option>
          <option value="Senior Developer">
            Senior Developer
          </option>
          <option value="Manager">
            Manager
          </option>
          <option value="Student or Learning">
            Student or Learning
          </option>
          <option value="Instructor">
            Instructor or Teacher
          </option>
          <option value="Intern">
            Intern
          </option>
          <option value="Other">
            Other
          </option>
        </select>
        <small
          class="form-text"
        >Give us an idea of where you are at in your career</small>
      </div>
      <div class="form-group">
        <input
          v-model="formData.company"
          type="text"
          placeholder="Company"
          name="company"
        >
        <small
          class="form-text"
        >Could be your own company or one you work for</small>
      </div>
      <div class="form-group">
        <input
          v-model="formData.website"
          type="text"
          placeholder="Website"
          name="website"
        >
        <small class="form-text">Could be your own or a company website</small>
      </div>
      <div class="form-group">
        <input
          v-model="formData.location"
          type="text"
          placeholder="Location"
          name="location"
        >
        <small class="form-text">City & state suggested (eg. Boston, MA)</small>
      </div>
      <div class="form-group">
        <input
          v-model="formData.skills"
          type="text"
          placeholder="* Skills"
          name="skills"
          required
        >
        <small
          class="form-text"
        >Please use comma separated values (eg.
          HTML,CSS,JavaScript,PHP)</small>
      </div>
      <div class="form-group">
        <input
          v-model="formData.githubUsername"
          type="text"
          placeholder="Github Username"
          name="githubusername"
        >
        <small
          class="form-text"
        >If you want your latest repos and a Github link, include your
          username</small>
      </div>
      <div class="form-group">
        <textarea
          v-model="formData.bio"
          placeholder="A short bio of yourself"
          name="bio"
        />
        <small class="form-text">Tell us a little about yourself</small>
      </div>

      <div class="my-2">
        <button
          type="button"
          class="btn btn-light"
          @click="onAddSocial"
        >
          Add Social Network Links
        </button>
        <span>Optional</span>
      </div>

      <div v-show="showSocial">
        <div class="form-group social-input">
          <i class="fab fa-twitter fa-2x" />
          <input
            v-model="formData.twitter"
            type="text"
            placeholder="Twitter URL"
            name="twitter"
          >
        </div>

        <div class="form-group social-input">
          <i class="fab fa-facebook fa-2x" />
          <input
            v-model="formData.facebook"
            type="text"
            placeholder="Facebook URL"
            name="facebook"
          >
        </div>

        <div class="form-group social-input">
          <i class="fab fa-youtube fa-2x" />
          <input
            v-model="formData.youtube"
            type="text"
            placeholder="YouTube URL"
            name="youtube"
          >
        </div>

        <div class="form-group social-input">
          <i class="fab fa-linkedin fa-2x" />
          <input
            v-model="formData.linkedin"
            type="text"
            placeholder="Linkedin URL"
            name="linkedin"
          >
        </div>

        <div class="form-group social-input">
          <i class="fab fa-instagram fa-2x" />
          <input
            v-model="formData.instagram"
            type="text"
            placeholder="Instagram URL"
            name="instagram"
          >
        </div>
      </div>

      <input
        type="submit"
        class="btn btn-primary my-1"
      >
      <router-link
        class="btn btn-light my-1"
        to="/dashboard"
      >
        Go Back
      </router-link>
    </form>
  </section>
</template>

<script>
import { store } from '../../store'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'

export default {
  name: 'ProfileForm',

  async beforeRouteEnter (to, from, next) {
    try {
      if (to.name === 'ProfileEdit') {
        await store.dispatch('profile/getCurrentProfile')
      }
    } catch (e) {
      await store.dispatch('showAlert', {
        isShow: true,
        status: 'danger',
        data: e.response.data.error
      })
    }
    next()
  },

  setup () {
    const route = useRoute()

    let formData = ref({
      status: '',
      company: '',
      website: '',
      location: '',
      skills: '',
      githubUsername: '',
      bio: '',
      twitter: '',
      facebook: '',
      youtube: '',
      linkedin: '',
      instagram: ''
    })
    const showSocial = ref(false)

    const profile = computed(() => store.getters['profile/profile'])

    if (route.name === 'ProfileEdit') {
      // formData.value.status = profile.value.status ? profile.value.status : ''
      // formData.value.company = profile.value.company ? profile.value.company : ''
      // formData.value.website = profile.value.website ? profile.value.website : ''
      // formData.value.location = profile.value.location ? profile.value.location : ''
      // formData.value.skills = profile.value.skills ? profile.value.skills.join() : ''
      // formData.value.githubUsername = profile.value.githubUsername ? profile.value.githubUsername : ''
      // formData.value.bio = profile.value.bio ? profile.value.bio : ''

      if (profile.value.social) {
        showSocial.value = true
        formData.value.twitter = profile.value.social.twitter ? profile.value.social.twitter : ''
        formData.value.facebook = profile.value.social.facebook ? profile.value.social.facebook : ''
        formData.value.youtube = profile.value.social.youtube ? profile.value.social.youtube : ''
        formData.value.linkedin = profile.value.social.linkedin ? profile.value.social.linkedin : ''
        formData.value.instagram = profile.value.social.instagram ? profile.value.social.instagram : ''
      }

      formData.value = {
        ...formData.value,
        ...profile.value
      }

      console.log(formData.value)
    }

    const onAddSocial = () => {
      showSocial.value = !showSocial.value
    }

    const onSubmit = async () => {
      try {
        await store.dispatch('profile/addProfile', formData.value)
        await store.dispatch('showAlert', {
          status: 'success',
          data: [{msg: route.name === 'ProfileCreate' ? 'Successfully create profile' : 'Successfully update profile'}],
          isShow: true
        })
      } catch (err) {
        await store.dispatch('showAlert', {
          status: 'danger',
          data: err.response.data.error || [{ msg: err.response.statusText }],
          isShow: true
        })
      }
    }

    return {
      route,
      formData,
      showSocial,
      onAddSocial,
      onSubmit
    }
  }
}
</script>

<style lang="scss" scoped></style>
