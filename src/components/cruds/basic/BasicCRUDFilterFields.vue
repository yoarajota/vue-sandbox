<template>
    <VCol v-bind="field.filter_sizing ?? field.sizing">
        <Field :field="{ ...field, 'hide-details': true, 'single-line': true }"
            @update:modelValue="$emit('update:modelValue', $event)" :modelValue="modelValue" v-on="listeners"
            @keydown.enter="enterFunc" />
    </VCol>
</template>
<script setup>
import Field from '../../fields/Field.vue';

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