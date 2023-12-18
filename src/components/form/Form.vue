<template>

<VForm @submit.prevent>
<template v-for="field in config.fields" :key="field.name">
    <VTextField
        :name="field.name"
        :label="field.label"
        :type="field.type"
        :placeholder="field.placeholder"
        :required="field.required"
        :rules="field.rules"
        :v-model="initializeVModel(field.name)"
    />
</template>
<VBtn type='submit' color="primary">Primary</VBtn>

</VForm>
</template>

<script setup>
import { initializeVModel } from './index'

const props = defineProps({
    config: Object,
})

</script>