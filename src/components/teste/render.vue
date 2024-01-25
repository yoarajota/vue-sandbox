<template>
  <Component :is="curr" />

  <input v-model="SEAR" />
  <button @click="click">a</button>
</template>

<script setup>
import {ref} from 'vue'

const curr = ref(null)
const SEAR = ref('')

await import('./a.vue').then((a) => {
  curr.value = a.default
})

const click = () => {
  import('./' + SEAR.value +  '.vue').then((b) => {
    curr.value = b.default
  })
}

</script>