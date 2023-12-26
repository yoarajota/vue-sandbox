<script setup>
import { ref, onBeforeMount } from 'vue'
import FormConfig from './form/FormConfig.js'
import { required } from './form/rules';
import supabase from '../lib/supabase';
import BasicCRUD from './BasicCRUD.vue';

let config = {}
onBeforeMount(() => {
  config = ref(new FormConfig('users',
    [{
      key: 'name',
      title: 'Name',
      type: 'text',
      placeholder: 'Enter your name',
      required: true,
      rules: [required]
    },
    {
      key: 'users_emails',
      label: 'Email',
      type: 'list',
      min: 1,
      config: new FormConfig('users_emails', [
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
    supabase.from('users').insert(data.users).select().then(({ data, error }) => {
      if (error) {
        console.log(error)
      }
    })

    config.value.query()
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
  <BasicCRUD :button="{ text: 'Insert new user' }" :config="config" />
</template>