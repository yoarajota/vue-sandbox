<script setup>
const randomColors = ['#646cff', '#42b883', '#ff6e6e', '#ffcb6b']
const currentColor = ref(randomColors[0])

import { ref } from 'vue'
import Form from './form/Form.vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

    <Form />
</template>