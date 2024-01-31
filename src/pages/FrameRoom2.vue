<template>
  <div>
    <p>{{ state.a.text }}</p>
    <ul>
      <li v-for="item in state.a.items">{{ item.text }}</li>
    </ul>
  </div>

  dentro do iframe <input v-model="state.a.text" />
</template>

<script setup>
import { reactive, watch, ref, onMounted } from 'vue';
import { cloneDeep } from 'lodash'

let state = reactive({
  a: {}
})

const avoidWatch = ref(false)

watch(state, () => {
  if (avoidWatch.value) {
    avoidWatch.value = false
    return
  }

  parent.postMessage(cloneDeep(state), '*')
}, { deep: true })

window.addEventListener('message', (event) => {
  avoidWatch.value = true
  Object.assign(state.a, event.data.a)
})

onMounted(() => {
  parent.init()
})
</script>