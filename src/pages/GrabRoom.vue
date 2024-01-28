<template>
    <div class="flex box-border">
        <div v-for="(item, index) in items" :key="index" draggable="true" @dragstart="dragStart(index)" @dragend="dragEnd"
            @dragover.prevent="dragOver($event, index)" @dragleave="dragLeave" @drop="drop(index)"
            class="box-border p-4 border-x-2 border-transparent" :class="{
                'dragging': draggedIndex === index,
                'dragged-over-left': draggedIndex !== index && draggedOverIndex === index && isMouseOnLeftSide,
                'dragged-over-right': draggedIndex !== index && draggedOverIndex === index && !isMouseOnLeftSide
            }">
            {{ item }}
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

let items = ref(['Item 1', 'Item 2', 'Item 3']); // replace with your actual data
let draggedIndex = ref(null);
let draggedOverIndex = ref(null);
let isMouseOnLeftSide = ref(false);

const dragStart = (index) => {
    draggedIndex.value = index;
};

const dragEnd = () => {
    draggedIndex.value = null;
};

const dragOver = (event, index) => {
    console.log(event, index)

    draggedOverIndex.value = index;
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the element.
    isMouseOnLeftSide.value = x < rect.width / 2;
};

const dragLeave = () => {
    draggedOverIndex.value = null;
};

const drop = (index) => {
    const draggedItem = items.value[draggedIndex.value];
    items.value[draggedIndex.value] = items.value[index];
    items.value[index] = draggedItem;
    draggedOverIndex.value = null;
};
</script>
  
<style scoped>
.dragging {
    /* Tailwind CSS classes for the dragged item */
    @apply bg-blue-500 text-white;
}

.dragged-over-left {
    /* Tailwind CSS classes for the left side of the item being dragged over */
    @apply border-l-2 border-red-900 border-r-transparent;
}

.dragged-over-right {
    /* Tailwind CSS classes for the right side of the item being dragged over */
    @apply border-r-2 border-green-900 border-l-transparent;
}
</style>