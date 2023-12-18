<script setup>
import { ref } from 'vue'
import Form from './form/Form.vue'
import FormConfig from './form/FormConfig.js'
import { required } from './form/rules';

defineProps({
  msg: String,
})

const config = ref(new FormConfig(
  [{
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter your name',
    required: true,
    rules: [required]
  }]
));

</script>

<template>
  <h1>{{ msg }}</h1>
    <Form :config="config"/>
</template>