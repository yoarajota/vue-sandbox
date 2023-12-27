<script setup>
import { ref, onBeforeMount } from 'vue'
import FormConfig from '../components/form/FormConfig.js'
import { required } from '../components/form/rules';
import BasicCRUD from '../components/BasicCRUD.vue';
import supabase from '../lib/supabase';
import { defaultFormDataFind } from '../components/form/index'

const P_TABLE = 'users'

let config = {}
onBeforeMount(() => {
  config = ref(new FormConfig(P_TABLE,
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

  config.value.on['submit'] = async (submitData) => {
    const { data, error } = await supabase.from(P_TABLE).insert(submitData[P_TABLE]).select('id').limit(1).single();

    for (const table of ['users_emails']) {
      if (submitData[table]) {
        for (const list of submitData[table].data_array) {
          list.user_id = data.id
          supabase.from(table).insert(list)
        }
      }
    }

    config.value.query()
  }

  config.value.on['LAdd'] = (data) => {
    console.log('LAdd', data)
  }

  config.value.on['LRemove'] = (data) => {
    console.log('LRemove', data)
  }

  config.value.on['find'] = async (dataObject, id) => {
    await defaultFormDataFind(dataObject, P_TABLE, id)
  }
})

</script>

<template>
  <BasicCRUD :button="{ text: 'Insert new user' }" :config="config" />
</template>