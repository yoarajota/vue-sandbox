<script setup>
const randomColors = ['#646cff', '#42b883', '#ff6e6e', '#ffcb6b']
const currentColor = ref(randomColors[0])

import { ref } from 'vue'

defineProps({
  msg: String,
})

const element = ref(null)

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="() => {
      count++; currentColor = randomColors[Math.floor(Math.random() * (5 - 0 + 1) + 0)]
      }">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>

  <p :ref="element" :style="{
    '--var': currentColor,
  }" class=" text-var">Click on the Vite and Vue logos to learn more</p>
</template>