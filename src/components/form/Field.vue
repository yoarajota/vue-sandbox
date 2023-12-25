<template>
    <VTextField v-if="field.type !== 'list'" :name="field.key" :label="field.title" :type="field.type"
        :placeholder="field.placeholder" :required="field.required" :rules="field.rules" v-bind="props" />
</template>
    
<script setup>
const props = defineProps({
    field: Object,
})
</script>