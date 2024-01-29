<template>
    <SelectInput v-if="field.type === 'select'" :field="field" :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)" />
    <ForeignKeyInput v-else-if="field.type === 'foreign'" :field="field" :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)" />
    <VTextField v-else :name="field.key" v-bind="field" :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)" />
</template>
    
<script setup>
import ForeignKeyInput from './ForeignKeyInput.vue';
import SelectInput from './SelectInput.vue';

const props = defineProps({
    field: Object,
    modelValue: [String, Number, Array, Boolean],
})
</script>