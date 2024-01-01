<script setup>
import { ref, onBeforeMount } from 'vue'
import FormConfig from '../components/form/FormConfig.js'
import ListConfig from '../components/form/list/ListConfig.js'
import { required } from '../components/form/rules';
import BasicCRUD from '../components/cruds/basic/BasicCRUD.vue';
import { defaultFormDataFind, defaultFormDataListFind, defaultSubmit } from '../components/form/index'
import supabase from '../lib/supabase';

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
      rules: [required],
      sizing: {
        cols: 12,
        sm: 6
      },
      filter_sizing: {
        cols: 12,
        sm: 12
      },
    },
    {
      key: 'users_emails',
      label: 'Email',
      type: 'list',
      min: 1,
      config: new ListConfig('users_emails', [
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

  config.value.itemsPerPage = 10;

  config.value.setListInfo({
    tables: ['users_emails'],
    foreign_key: 'user_id'
  })

  config.value.on['submit'] = async (submitData) => {
    await defaultSubmit(submitData, config.value);

    config.value.query('set');
  }

  config.value.on['delete'] = async (id) => {
    await supabase.from(P_TABLE).delete().match({ id });
    config.value.query('set');
  }

  config.value.on['find'] = async (dataObject, id) => {
    await Promise.all([
      defaultFormDataFind(P_TABLE, id),
      defaultFormDataListFind(config.value.getListInfo(), id)
    ])
  }
})

</script>

<template>
  <BasicCRUD :button="{ text: 'Insert new user' }" :config="config" />
</template>