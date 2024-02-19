<template>
    <VBtn variant="outlined" :text="showMenu ? 'Stop edit' : 'Start edit'" @click="startEdition" />
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
            <DragableMenu v-show="showMenu" :text="draggableMenuText" />
            <TextToolbar />

            <VBtn variant="outlined" ref="iconConfigRef" class="!absolute !p-0 !min-w-0" density="compact" height="30px"
                width="30px">
                <VIcon icon="mdi-pencil" size="20" />
            </VBtn>
        </Teleport>

        <div
            class="w-full pointer-events-none group-hover:pointer-events-auto z-70 relative group-hover:opacity-100 opacity-0">
            <button
                class="transform active:scale-95 transition-transform bg-red-900 sm absolute -bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 !ring-0 !ring-offset-0 font-sans">
                <span>Add section</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import TextToolbar from '@/components/menus/TextToolbar.vue';
import DragableMenu from '@/components/menus/DragableMenu.vue';

import { ref, onMounted } from 'vue';
import { VBtn } from 'vuetify/lib/components/index.mjs';

const showMenu = ref(false);
const draggableMenuText = ref('');

const iconConfigRef = ref(false);

function startEdition() {
    if (!showMenu.value) {
        document.querySelectorAll('.editable').forEach((element) => {
            element.addEventListener('click', (event) => {
                event.stopPropagation();

                // Remove atribute "focused" from all where focused is true
                document.querySelectorAll('.editable[focused="true"]').forEach((element) => {
                    element.removeAttribute('focused');
                });

                // Set element with atribute focused
                event.target.setAttribute('focused', true);

                draggableMenuText.value = event.target.textContent;
            });
        });
    }

    showMenu.value = !showMenu.value;
}

function mouseEnter(event) {
    // Position the iconConfig abote the right corner of the editable element
    const rect = event.target.getBoundingClientRect();
    iconConfigRef.value.$el.style.left = `${rect.right - 30}px`;
    iconConfigRef.value.$el.style.top = `${rect.top - 30}px`;
    iconConfigRef.value.$el.style.display = 'block';

    // Put atribute "focused" in the editable element
    event.target.setAttribute('focused', true);
}

function mouseLeave(event) {
    // If the mouse is over the iconConfig, don't hide it
    if (event.relatedTarget === iconConfigRef.value.$el) {
        return;
    }

    // Hide iconConfig
    iconConfigRef.value.$el.style.display = 'none';

    // Remove atribute "focused" from all where focused is true
    document.querySelectorAll('.editable[focused="true"]').forEach((element) => {
        element.removeAttribute('focused');
    });
}

onMounted(() => {
    // document.querySelectorAll('.editable').forEach((element) => {
    //     element.addEventListener('mouseenter', mouseEnter);
    //     element.addEventListener('mouseleave', mouseLeave);
    // });
});
</script>

<style scoped>
/* If element focused, set outline */
.editable[focused="true"] {
    outline: 1px dashed #0171f0;
}
</style>