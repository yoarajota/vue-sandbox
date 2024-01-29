<template>
    <VAutocomplete no-filter @update:search="autocompleteQuery" append-inner-icon="mdi-magnify"
        @click:append-inner="dialog = true" v-bind="activatorProps" :model-value="modelValue" />

    <VDialog width="1200" v-model="dialog">
        <template v-slot:default="{ isActive }">
            <VCard>
                <VCardText>
                    <VRow no-gutters class="gap-y-2 py-4">
                        <VCol v-for="(field, index) of field.headers" v-bind="field.filter_sizing">
                            <Field :field="{ ...field, 'hide-details': true, 'single-line': true, density: 'compact' }"
                                @update:modelValue="query_filter[field.key] = $event"
                                :modelValue="query_filter[field.key]" />
                        </VCol>
                        <VCol col="12" sm="12">
                            <VBtn color="primary" @click="query">Search</VBtn>
                        </VCol>
                    </VRow>

                    <VDataTable :loading="loading" @update:options="query" :headers="field.headers" v-model="select"
                        item-selectable select-strategy="single" :items="items" :class="elevation - 1" show-select />
                </VCardText>
                <VCardActions>
                    <VSpacer />
                    <VBtn text="Cancel" @click="isActive.value = false" />
                    <VBtn text="Confirm" @click="$emit('update:modelValue', select)" />
                    <VSpacer />
                </VCardActions>
            </VCard>
        </template>
    </VDialog>
</template>
    
<script setup>
import supabase from '../../lib/supabase';
import Field from './Field.vue';
import { ref } from 'vue';

const props = defineProps({
    field: Object,
    modelValue: [String, Number, Array, Boolean],
})

const dialog = ref(false)
const items = ref([])
const autocompleteItems = ref([])
const loading = ref(true)
const query_filter = ref({})
const select = ref()

if (!props.field.foreign_table) {
    throw new Error("Foreign table is required");
}

function autocompleteQuery(value) {
    supabase.from(props.field.foreign_table).select("id, " + props.field.mask_field).ilike(props.field.mask_field, value + "%").then(({ data, error }) => {
        if (error) {
            return;
        }

        items.value = data
        loading.value = false;
    });
}

function query(obj) {
    loading.value = true;

    const { page, itemsPerPage, sortBy } = obj;

    const q = supabase.from(props.field.foreign_table).select();

    if (props.field.logic) {
        props.field.logic(q);
    }

    for (const key in query_filter.value) {
        q.ilike(key, query_filter.value[key] + "%");
    }

    if (obj) {
        if (itemsPerPage !== undefined && page !== undefined) {
            const from = (page - 1) * itemsPerPage;
            const to = from + itemsPerPage;

            q.range(from, to);
        }

        if (sortBy?.[0]) {
            for (const toSort of sortBy) {
                q.order(toSort.key, { ascending: toSort.order === "asc" });
            }
        }
    }

    q.then(({ data, error }) => {
        if (error) {
            return;
        }

        items.value = data
        loading.value = false;
    });
}

</script>