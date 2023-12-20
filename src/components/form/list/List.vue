<script setup>
import { initializeFormFieldVModel } from '..';
import Field from '../Field.vue';

defineProps({
    config: Object
})

</script>

<template>
    <!-- Grid for the list -->
    <div>
        <!-- Toolbar -->
        <VToolbar
            color="white"
            flat
        >
            <VBtn icon="mdi-magnify" />
        </VToolbar>

        <!-- Inputs -->
        <VRow no-gutters>
            <VCol
                v-for="field in config.fields"
                :key="field.name"
                cols="12"
                sm="3"
            >
                <Field :field="field" :v-model="initializeListFieldVModel(field.name)" />
            </VCol>
            <VCol cols="3">
                <VBtn icon="mdi-plus" />
            </VCol>
        </VRow>

        <!-- List -->
        <VDataTable
            :headers="headers"
            :items="desserts"
            :items-per-page="15"
            class="elevation-1"
        ></VDataTable>
    </div>
</template>