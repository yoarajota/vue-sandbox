<template>
  <VForm @submit.prevent="submit">
    <template v-for="field in fields" :key="field.key">]
      <Field v-if="field.type !== 'list'" :field="field" v-model="dataObject[field.table ?? LKey][field.key]" />
      <List v-else :LKey="field.key" :config="field.config" :events="events" />
    </template>
    <VBtn type="submit" color="primary">Primary</VBtn>
  </VForm>
</template>

<script setup>
import Field from "./Field.vue";
import { dataObject, resetForm } from "./index";
import List from "./list/List.vue";
import { onBeforeMount, watch } from "vue";

const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },
  LKey: {
    type: [String, Boolean],
    default: false,
  },
  events: {
    type: Object,
  },
});

const emit = defineEmits(["listSave"]);

const submit = () => {
  if (props.LKey) {
    emit("listSave", dataObject);
    return;
  }

  props.events.submit(dataObject);
};

onBeforeMount(() => {
  if (props.LKey) {
    if (!dataObject[props.LKey]) {
      dataObject[props.LKey] = {
        data_array: [],
      };

      for (const field of props.fields) {
        dataObject[props.LKey][field.key] = field.default ?? "";
      }
    }

    return;
  }

  for (const field of props.fields) {
    if (field.type === "list") {
      continue;
    }

    if (!dataObject[field.table]) {
      dataObject[field.table] = {};
    }

    dataObject[field.table][field.key] = field.default ?? "";
  }
});
</script>
