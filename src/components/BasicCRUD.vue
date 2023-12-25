<script setup>
import supabase from '../lib/supabase';
import Form from './form/Form.vue';
import { onBeforeMount, ref } from 'vue';

const props = defineProps({
    config: {
        type: Object,
        required: true
    },
    button: {
        type: Object,
        required: true
    }
})

onBeforeMount(() => {
    props.config.query()
})

</script>

<template>
    <VToolbar flat>
        <Form :button="button" :events="config.getEvents()" v-bind="config.getBind()" />
        <VSpacer />
    </VToolbar>

    <VDataTable :headers="config?.getIndexHeader()" :items="props.config.items" :items-per-page="15" class="elevation-1" />
</template>