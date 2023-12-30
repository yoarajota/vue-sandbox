<script setup>
import Form from '../Form.vue';
import { listPush, dataObject, redefineListObject } from '../index'
import { ref, onBeforeMount } from 'vue'

const activatorRef = ref()

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

onBeforeMount(() => {
  props.config.setActions([
    {
      title: 'Edit',
      icon: 'mdi-pencil',
      action: (item) => {
        console.log(activatorRef)
        activatorRef.value.click()
      }
    }
  ])
})

const dialogStatusRef = ref(false)

</script>

<template>
  <!-- Toolbar -->
  <VToolbar flat>
    <VSpacer />
    <Form :activatorRef="activatorRef" :button="{ icon: 'mdi-plus' }" :LKey="LKey" @listSave="save"
      v-bind="config.getBind()" :dialogStatusRef="dialogStatusRef" @update:dialogStatus="dialogStatusRef = $event" />
  </VToolbar>

  <!-- List -->
  <VDataTable :headers="config?.getIndexHeader()" :items="dataObject[LKey]?.data_array" :items-per-page="15"
    class="elevation-1">
    <template v-slot:item.action="{ index, item }">
      <VMenu>
        <template v-slot:activator="{ props }">
          <VBtn icon="mdi-dots-horizontal" v-bind="props" />
        </template>
        <VList>
          <VListItem v-for="(button, index) in config.getActions()" :key="index" class="cursor-pointer hover:opacity-60"
            @click="button.action(item)">
            <template v-slot:prepend="{ }">
              <v-icon :icon="button.icon"></v-icon>
            </template>
            <VListItemTitle v-text="button.title" />
          </VListItem>
        </VList>
      </VMenu>
    </template>
  </VDataTable>
</template>