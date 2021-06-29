<template>
  <div id="app">
    <Navbar />
    <router-view />
    <transition name="fade">
      <Alert v-if="alertState.isShow" />
    </transition>
    <vue-progress-bar />
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'App',

  components: {
    Navbar,
    Alert
  },

  setup () {
    const store = useStore()
    const alertState = computed(() => store.getters['alertState'])
    return {
      alertState
    }
  }
}
</script>

<style>
  @import "./App.css";
</style>
