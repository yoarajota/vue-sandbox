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
    key: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Enter your name',
    required: true,
    rules: [required]
  },
  {
    key: 'emails',
    label: 'Email',
    type: 'list',
    config: new FormConfig([
          { 
            key: 'email', 
            title: 'Email',
            type: 'email',
            placeholder: 'Enter your email',
            required: true,
            rules: [required]
          },
        ])
  }]
));

</script>

<template>
  <h1>{{ msg }}</h1>
    <Form :config="config"/>
</template>