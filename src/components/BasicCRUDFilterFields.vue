<template>
    <VCol v-bind="field.filter_sizing ?? field.sizing">
        <VTextField :name="field.key" :label="field.title" :type="field.type" :modelValue="modelValue"
            @update:modelValue="$emit('update:modelValue', $event)" v-on="listeners" hide-details single-line
            @keydown.enter="enterFunc" />
    </VCol>
</template>
<script setup>
const props = defineProps({
    field: Object,
    modelValue: [String, Number, Array, Boolean],
    listeners: {
        type: Object,
        default: {}
    },
})

const enterFunc = props.listeners?.['keydown.enter'] ? props.listeners['keydown.enter'] : () => { };
</script>