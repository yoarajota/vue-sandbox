<template>
    <div class="group relative border-2" section>
        asd
        <div class="editable" contenteditable>
            Texto mais legível!
        </div>
        <div class="editable" contenteditable>
            Texto mais legível!
        </div>
        <div class="editable" contenteditable>
            Texto mais legível!
        </div>

        <Teleport to="body">
            <DragableMenu v-show="showMenu" />
            <TextToolbar />

            <VBtn variant="outlined" ref="iconConfigRef" class="!absolute !p-0 !min-w-0" density="compact" height="30px"
                width="30px">
                <VIcon icon="mdi-pencil" size="20" />
            </VBtn>
        </Teleport>

        <div
            class="w-full pointer-events-none group-hover:pointer-events-auto z-70 relative group-hover:opacity-100 opacity-0">
            <button
                class="bg-red-900 sm absolute -bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 !ring-0 !ring-offset-0 font-sans">
                <span>Add section</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import TextToolbar from '@/components/menus/TextToolbar.vue';
import DragableMenu from '@/components/menus/DragableMenu.vue';

import { ref, onMounted } from 'vue';

const text1 = ref("Texto mais legível!");

const showMenu = ref(false);

const iconConfigRef = ref(false);

function mouseEnter(event) {
    // Position the iconConfig abote the right corner of the editable element
    const rect = event.target.getBoundingClientRect();
    iconConfigRef.value.$el.style.left = `${rect.right - iconConfigRef.value.$el.offsetWidth}px`;
    iconConfigRef.value.$el.style.top = `${rect.top - iconConfigRef.value.$el.offsetHeight - 1}px`;
    iconConfigRef.value.$el.style.display = 'block';
}

onMounted(() => {
    document.querySelectorAll('.editable').forEach((element) => {
        element.addEventListener('mouseenter', mouseEnter);
    });
});
</script>

<style scoped>
.editable:hover {
    outline: #cccccca6 dashed 1px;
    cursor: pointer;
}

</style>