<script setup>
import Form from './form/Form.vue';
import { onBeforeMount, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { initializeForm } from './form/index'
import BasicCRUDFilter from './BasicCRUDFilter.vue';

const router = useRouter()
const route = useRoute()

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

const dialogStatusRef = ref(false)

watch(dialogStatusRef, (value) => {
    if (value === false) {
        initializeForm(props.config.fields, props.config.form_table);

        if (route.params.id) {
            router.push("/users")
        }
    }
})

const filterModel = ref([])

</script>

<template>
    <VToolbar flat>
        <Form :key="route.params.id" :id="route.params.id" :button="button" :events="config.getEvents()"
            v-bind="config.getBind()" :dialogStatusRef="dialogStatusRef" @update:dialogStatus="dialogStatusRef = $event" />
        <VSpacer />
        <VBtn icon="mdi-filter" @click="() => filterModel = filterModel?.[0] ? [] : ['filter']" />
    </VToolbar>

    <BasicCRUDFilter :modelValue="filterModel" :config="config" @update:show="showFilter = $event"
        @update:modelValue="filterModel = $event" />

    <VDataTable :headers="config?.getIndexHeader()" :items="config.getItems()" :items-per-page="15" class="elevation-1">
        <template v-slot:item.action="{ index, item }">
            <VMenu>
                <template v-slot:activator="{ props }">
                    <VBtn icon="mdi-dots-horizontal" v-bind="props" />
                </template>
                <VList>
                    <VListItem v-for="(button, index) in config.getActions()" :key="index"
                        class="cursor-pointer hover:opacity-60" @click="() => button.action(item.id)">
                        <template v-slot:prepend="{ }">
                            <v-icon :icon="button.icon"></v-icon>
                        </template>
                        <VListItemTitle v-text="button.title" />
                    </VListItem>
                </VList>
            </VMenu>
        </template>
    </VDataTable>
</template>