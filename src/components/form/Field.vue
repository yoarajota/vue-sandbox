<template>
    <VTextField
        v-if="field.type !== 'list'"
        :name="field.name"
        :label="field.label"
        :type="field.type"
        :placeholder="field.placeholder"
        :required="field.required"
        :rules="field.rules"
        :v-model="VModel"
    />
</template>
    
<script setup>
    const props = defineProps({
        field: Object,
        VModel: Object
    })
</script>