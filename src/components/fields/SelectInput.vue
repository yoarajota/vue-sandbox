<template>
    <VSelect :name="field.key" v-bind="field" @update:modelValue="$emit('update:modelValue', $event)"
        :modelValue="modelValue" />
</template>
    
<script setup>
import { VSelect } from 'vuetify/lib/components/index.mjs';

const props = defineProps({
    field: Object,
    modelValue: [String, Number, Array, Boolean],
})
</script>