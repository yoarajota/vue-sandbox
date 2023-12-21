<template>
    <VTextField
        v-if="field.type !== 'list'"
        :name="field.key"
        :label="field.label"
        :type="field.type"
        :placeholder="field.placeholder"
        :required="field.required"
        :rules="field.rules"
        v-bind="props"
    />
</template>
    
<script setup>
    const props = defineProps({
        field: Object,
    })

    console.log(props)
</script>