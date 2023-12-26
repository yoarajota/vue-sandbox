<script setup>
import Form from './form/Form.vue';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()

console.log(router)

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
            router.push(`/${id}`)
        },
    },
    {
        'title': 'Delete',
        'icon': 'mdi-delete',
        'action': 'delete',
    },
    {
        'title': 'View',
        'icon': 'mdi-eye',
        'action': 'view',
    }
]

onBeforeMount(() => {
    props.config.query()
})

</script>

<template>
    <VToolbar flat>
        <Form :button="button" :events="config.getEvents()" v-bind="config.getBind()" />
        <VSpacer />
    </VToolbar>

    <VDataTable :headers="config?.getIndexHeader()" :items="props.config.items" :items-per-page="15" class="elevation-1">
        <template v-slot:item.action="{ index, item }">
            <VMenu>
                <template v-slot:activator="{ props }">
                    <VBtn icon="mdi-dots-horizontal" v-bind="props" />
                </template>
                <VList>
                    <VListItem v-for="(item, index) in action" :key="index" class="cursor-pointer hover:opacity-60"
                        @click="item.action(item.id)">
                        <template v-slot:prepend="{ isActive }">
                            <v-icon :icon="item.icon"></v-icon>
                        </template>
                        <VListItemContent>
                            <VListItemTitle v-text="item.title" />
                        </VListItemContent>
                    </VListItem>
                </VList>
            </VMenu>
        </template>
    </VDataTable>
</template>