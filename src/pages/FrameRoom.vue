<template>
  fora do iframe <input v-model="state.a.text" />
  <iframe ref="frame" src="/#/frame-room-2" width="100%" height="100%" />
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { cloneDeep } from 'lodash'

const frame = ref(null)

const state = reactive({
  a: {
    text: 'Hello World',
    items: [{
      text: 'Hello World'
    }]
  }
})

window.init = () => {
  frame.value.contentWindow.postMessage(cloneDeep(state), '*')
}

const avoidWatch = ref(false)

window.addEventListener('message', (event) => {
  avoidWatch.value = true
  Object.assign(state.a, event.data.a)
})

watch(state, () => {
  if (avoidWatch.value) {
    avoidWatch.value = false
    return
  }

  frame.value.contentWindow.postMessage(cloneDeep(state), '*')
}, { deep: true })
</script>