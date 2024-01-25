<template>
    <div>

    </div>
    <div>
        <div draggable="true" @dragstart="dragStart" @dragend="dragEnd"
            :style="{ backgroundColor: isDragging ? 'lightgreen' : 'white' }">
            Drag me
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isDragging = ref(false);

const dragStart = (event) => {
    event.dataTransfer.setData('text/plain', 'This is some data');
    isDragging.value = true;
};

const dragEnd = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    isDragging.value = false;
    console.log(data)
};
</script>