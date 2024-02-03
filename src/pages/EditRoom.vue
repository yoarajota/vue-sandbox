<template>
    <div contenteditable>
        Texto mais legível!
    </div>
    <div contenteditable>
        Texto mais legível!
    </div>
    <div contenteditable>
        Texto mais legível!
    </div>


    <Teleport to="body">
        <DragableMenu />
        <TextToolbar />
    </Teleport>
</template>

<script setup>
import TextToolbar from '@/components/menus/TextToolbar.vue';
import DragableMenu from '@/components/menus/DragableMenu.vue';
</script>