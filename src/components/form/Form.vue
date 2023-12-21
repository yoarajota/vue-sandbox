<template>
    <VForm @submit.prevent>
        <template v-for="field in config.fields" :key="field.key">
            <Field
                v-if="field.type !== 'list'"
                :field="field"
                @input="input(field.key, trace, $event.target.value)"
                :modelValue="modelValue(field.key, trace)"
            />
            <List v-else :trace="trace" :LKey="field.key" :config="field.config" />
        </template>
        <VBtn type='submit' color="primary" @click="console.log(dataObject)">Primary</VBtn>
    </VForm>
</template>

<script setup>
console.log("Re rendered!")

import Field from './Field.vue';
import { input, dataObject, modelValue } from './index'
import List from './list/List.vue';

const props = defineProps({
    config: Object,
    trace: {
        type: [Array, null],
        default: null
    }
})

</script>