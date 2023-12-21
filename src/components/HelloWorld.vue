<script setup>
import { ref, onBeforeMount } from 'vue'
import Form from './form/Form.vue'
import FormConfig from './form/FormConfig.js'
import { required } from './form/rules';

defineProps({
  msg: String,
})

let config = {}
onBeforeMount(() => {
  config = ref(new FormConfig(
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
  <h1>{{ msg }}</h1>
    <Form v-on="config.getEvents()" v-bind="config.getBind()"/>
</template>