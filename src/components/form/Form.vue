
<script setup>
import Field from "./Field.vue";
import { dataObject, resetForm, redefineListObject, killDataObject, initializeForm } from "./index";
import List from "./list/List.vue";
import { onBeforeMount, ref, mergeProps, onUnmounted } from "vue";

const isFormValid = ref(false)
const error = ref(false)

const props = defineProps({
  id: {
    type: [String, Number],
    default: null,
  },
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
  },
  dialogStatusRef: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["listSave", "update:dialogStatus"]);

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
      emit("update:dialogStatus", false);
      return;
    }

    props.events.submit(dataObject).then(() => {
      emit("update:dialogStatus", false);
      resetForm();
    });
  }
};

onBeforeMount(async () => {
  if (props.LKey) {
    redefineListObject(props.LKey, props.fields)

    return;
  }

  if (props.id) {
    await props.events.find(dataObject, props.id);
    emit("update:dialogStatus", true);
    return;
  }

  initializeForm(props.fields, props.table);
});

</script> 

<template>
  <VDialog :modelValue="dialogStatusRef" @update:modelValue="val => $emit('update:dialogStatus', val)" width="1024">
    <template v-slot:activator="{ props }">
      <VBtn v-bind="mergeProps(props, button)" />
    </template>

    <VCard>
      <VCardText>
        <VForm v-model="isFormValid" @submit.prevent="submit">
          <div class="h-12">
            <h4 v-if="error" class="text-center text-red-600">{{ error }}</h4>
          </div>
          <template v-for="field in fields" :key="field.key">
            <Field v-if="field.type !== 'list'" :field="field"
              v-model="dataObject[field.table ?? LKey ?? table][field.key]" />
            <List v-else :LKey="field.key" :config="field.config" :events="events" />
          </template>
          <VCardActions class="flex">
            <VSpacer />
            <VBtn type="submit" color="primary">Save</VBtn>
          </VCardActions>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>