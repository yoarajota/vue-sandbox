<script setup>
import Form from '../../form/Form.vue';
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { initializeForm, deleteAll } from '../../form/index'
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

const dialogStatusRef = ref(false)

watch(dialogStatusRef, (value) => {
    if (value === false) {
        initializeForm(props.config.fields, props.config.form_table);

        if (route.params.id) {
            router.push("/users")
        }
    }
})

function updateOptions({ page, itemsPerPage, sortBy }) {
    if (props.config) {
        if (!props.config.queryed_pages?.[0]) {
            props.config.queryed_pages = []
        }

        let query = false;
        if (props.config.page !== page && page > props.config.page && !props.config.queryed_pages.includes(page)) {
            props.config.queryed_pages.push(page);
            query = 'push';
        }
        props.config.page = page

        if (props.config.sortBy !== sortBy) {
            props.config.queryed_pages = []
            props.config.page = 1;
            query = 'set';
        }
        props.config.sortBy = sortBy

        if (props.config.itemsPerPage !== itemsPerPage) {
            props.config.queryed_pages = []
            props.config.page = 1;
            query = 'set';
        }
        props.config.itemsPerPage = itemsPerPage

        if (query) {
            props.config.query(query)
        }
    }
}

const filterModel = ref([])
const select = ref([])

async function toDelete() {
    await deleteAll(props.config, select.value);
    props.config.setItems(props.config.items.filter(item => !select.value.includes(item.id)))
}

</script>

<template>
    <VToolbar flat>
        <Form :key="route.params.id" :id="route.params.id" :button="button" :events="config.getEvents()"
            v-bind="config.getBind()" :dialogStatusRef="dialogStatusRef" @update:dialogStatus="dialogStatusRef = $event" />
        <VSpacer />
        <VBtn icon="mdi-filter" @click="() => filterModel = filterModel?.[0] ? [] : ['filter']" />
        <VBtn icon="mdi-trash-can" @click="toDelete" />
    </VToolbar>

    <BasicCRUDFilter :modelValue="filterModel" :config="config" @update:show="showFilter = $event"
        @update:modelValue="filterModel = $event" />

    <VDataTable :loading="config.querying" @update:options="updateOptions" :headers="config?.getIndexHeader()"
        v-model="select" :items="config.getItems()" :class="elevation - 1" show-select>
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