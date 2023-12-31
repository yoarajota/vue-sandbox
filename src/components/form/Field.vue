<template>
    <VCol v-bind="field.sizing">
        <VTextField v-if="field.type !== 'list'" :name="field.key" :label="field.title" :type="field.type"
            :placeholder="field.placeholder" :required="field.required" :rules="field.rules" :modelValue="modelValue"
            @update:modelValue="$emit('update:modelValue', $event)" />
    </VCol>
</template>
    
<script setup>
const props = defineProps({
    field: Object,
    modelValue: [String, Number, Array, Boolean],
})
</script>