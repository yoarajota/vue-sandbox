<template>

<VForm @submit.prevent>
<template v-for="field in config.fields" :key="field.name">
    <Field
        v-if="field.type !== 'list'"
        :field="field"
        :v-model="initializeFormFieldVModel(field.name)"
    />
    <List v-else :config="field.config" />
</template>
<VBtn type='submit' color="primary">Primary</VBtn>

</VForm>
</template>

<script setup>
import Field from './Field.vue';
import { initializeFormFieldVModel } from './index'
import List from './list/List.vue';

const props = defineProps({
    config: Object,
})

</script>