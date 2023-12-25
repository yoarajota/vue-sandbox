<script setup>
import Form from '../Form.vue';
import { listPush, dataObject, redefineListObject } from '../index'

const props = defineProps({
  config: {
    type: Object,
    required: true
  },
  LKey: {
    type: String,
    required: true
  },
  events: {
    type: Object,
    required: true
  }
})


const save = () => {
  listPush(props.LKey)
  redefineListObject(props.LKey, props.config.fields)
}

</script>

<template>
    <!-- Toolbar -->
    <VToolbar flat>
      <VSpacer />
      <Form :button="{icon: 'mdi-plus'}" :LKey="LKey" @listSave="save" v-bind="config.getBind()" />
    </VToolbar>

    <!-- List -->
    <VDataTable :headers="config?.fields" :items="dataObject[LKey]?.data_array" :items-per-page="15" class="elevation-1" />
</template>