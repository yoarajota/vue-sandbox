<template>
    <VExpansionPanels :modelValue="modelValue" @update:modelValue="$emit('update:modelValue', $event)">
        <VExpansionPanel value="filter" title="Filters">
            <VExpansionPanelText>
                <VRow no-gutters class="gap-y-2 py-4">
                    <template v-for="(field, key) of fields ?? []">
                        <BasicCRUDFilterFields :field="field" v-model="config.query_filter[field.key]" :listeners="{
                            'keydown.enter': fields?.length === (key + 1) ? submit : () => { },
                        }" />
                    </template>

                    <VCol col="12" sm="12">
                        <VBtn color="primary" @click="submit">Search
                        </VBtn>
                    </VCol>
                </VRow>
            </VExpansionPanelText>
        </VExpansionPanel>
    </VExpansionPanels>
</template>

<script setup>
import BasicCRUDFilterFields from './BasicCRUDFilterFields.vue';

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    config: Object,
    modelValue: Array
})

const fields = props.config.fields.filter((field) => field.type !== "list")

function submit() {
    props.config.query();
    emit('update:modelValue', [])
}
</script>