<script setup>
import { ref, onBeforeMount } from 'vue'
import Form from './form/Form.vue'
import FormConfig from './form/FormConfig.js'
import { required } from './form/rules';

let config = {}
onBeforeMount(() => {
  config = ref(new FormConfig(
    [{
      key: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter your name',
      table: 'user',
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
          default: 'uai',
          rules: [required]
        },
      ])
    }]
  ));

  config.value.on['submit'] = (data) => {
    console.log('submit', data)
  }

  config.value.on['LAdd'] = (data) => {
    console.log('LAdd', data)
  }

  config.value.on['LRemove'] = (data) => {
    console.log('LRemove', data)
  }
})

</script>

<template>
  <Form :events="config.getEvents()" v-bind="config.getBind()" />
</template>