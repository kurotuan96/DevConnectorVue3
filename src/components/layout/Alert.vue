<template>
  <div class="alert-wrap">
    <div
      v-for="(err, index) in alertState.data"
      :key="index"
      class="alert"
      :class="`alert-${alertState.status}`"
      v-text="err.msg"
    />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'Alert',

  setup () {
    const store = useStore()

    const alertState = computed(() => store.getters['alertState'])

    return {
      alertState
    }
  }
}
</script>

<style lang="scss" scoped>
.alert-wrap {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 100px;
}
</style>
