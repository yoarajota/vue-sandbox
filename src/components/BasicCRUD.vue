<script setup>
import Form from './form/Form.vue';
import { onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router'

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

const action = [
    {
        'title': 'Edit',
        'icon': 'mdi-pencil',
        'action': (id) => {
            router.push(`/users/${id}`)
        },
    },
    {
        'title': 'Delete',
        'icon': 'mdi-delete',
        'action': (id) => {
            props.config.on.delete(id)
        },
    },
    {
        'title': 'View',
        'icon': 'mdi-eye',
        'action': 'view',
    }
]

function handleDialog(value) {
    if (!value) {
        router.push('/users')
    }
}

onBeforeMount(() => {
    props.config.query()
})

</script>

<template>
    <VToolbar flat>
        <Form :key="route.params.id" :id="route.params.id" :button="button" :events="config.getEvents()"
            v-bind="config.getBind()" @update:dialog="handleDialog" />
        <VSpacer />
    </VToolbar>

    <VDataTable :headers="config?.getIndexHeader()" :items="config.getItems()"
        :items-per-page="15" class="elevation-1">
        <template v-slot:item.action="{ index, item }">
            <VMenu>
                <template v-slot:activator="{ props }">
                    <VBtn icon="mdi-dots-horizontal" v-bind="props" />
                </template>
                <VList>
                    <VListItem v-for="(button, index) in action" :key="index" class="cursor-pointer hover:opacity-60"
                        @click="button.action(item.id)">
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