
<script setup>
import Field from "./Field.vue";
import { dataObject, resetForm, redefineListObject } from "./index";
import List from "./list/List.vue";
import { onBeforeMount, ref } from "vue";

const isFormValid = ref(false)
const error = ref(false)

const props = defineProps({
  fields: {
    type: Array,
    required: true,
  },
  table: {
    string: String,
  },
  LKey: {
    type: [String, Boolean],
    default: null,
  },
  events: {
    type: Object,
  },
  button: {
    type: Object,
  }
});

const dialog = ref(false)

const emit = defineEmits(["listSave"]);

const setError = (message) => {
  error.value = message;
  setTimeout(() => {
    error.value = false;
  }, 3000);
};

const submit = () => {
  // Test if min is valid
  if (!props.LKey) {
    for (const field of props.fields) {
      if (field.type === "list") {
        if (field.min && (dataObject?.[field.key]?.data_array?.length ?? 0) < field.min) {
          setError(`You need to add at least ${field.min} ${field.min > 1 ? "items" : "item"}`)
          return;
        }
      }
    }
  }

  if (isFormValid.value) {
    if (props.LKey) {
      emit("listSave", dataObject);
      dialog.value = false;
      return;
    }

    props.events.submit(dataObject);
    dialog.value = false;
    resetForm();
  }
};

onBeforeMount(() => {
  if (props.LKey) {
    redefineListObject(props.LKey, props.fields)

    return;
  }

  for (const field of props.fields) {
    if (field.type === "list") {
      continue;
    }

    if (!dataObject[field.table ?? props.table]) {
      dataObject[field.table ?? props.table] = {};
    }

    dataObject[field.table ?? props.table][field.key] = field.default ?? "";
  }
});
</script>

<template>
  <VDialog v-model="dialog" width="1024">
    <template v-slot:activator="{ props }">
      <VBtn v-bind="{ ...props, ...button }" />
    </template>

    <VCard>
      <VCardText>
        <VForm v-model="isFormValid" @submit.prevent="submit">
          <div class="h-12">
            <h4 v-if="error" class="text-center text-red-600">{{ error }}</h4>
          </div>
          <template v-for="field in fields" :key="field.key">
            <Field v-if="field.type !== 'list'" :field="field" v-model="dataObject[field.table ?? LKey ?? table][field.key]" />
            <List v-else :LKey="field.key" :config="field.config" :events="events" />
          </template>
          <VCardActions class="flex">
            <VSpacer />
            <VBtn type="submit" color="primary">Primary</VBtn>
          </VCardActions>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>