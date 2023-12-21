<template>
    <VForm @submit.prevent="submit">
        <template v-for="field in fields" :key="field.key">
            <Field
                v-if="field.type !== 'list'"
                :field="field"
                @input="input(field.key, trace, $event.target.value)"
                :getValue="getValue(field.key, trace)"
            />
            <List v-else :trace="trace" :LKey="field.key" :config="field.config" />
        </template>
        <VBtn type='submit' color="primary">Primary</VBtn>
    </VForm>
</template>

<script setup>
import Field from './Field.vue';
import { input, dataObject, getValue } from './index'
import List from './list/List.vue';

const props = defineProps({
    fields: {
        type: Array, 
        required: true
    },
    trace: {
        type: [Array, null],
        default: null
    },
    isListForm: {
        type: Boolean,
        default: false
    }
})

const submit = () => {
    emit('submit', dataObject)
}

</script>