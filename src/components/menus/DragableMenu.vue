<template>
    <VCard ref="resizableCard" width="250px" class="duration-10 overflow-auto"
        :style="{ top: `${state.y}px`, left: `${state.x}px`, height: `${state.height}px`, width: `${state.width}px` }" position="absolute">
      <VCardTitle class="!flex justify-between">
        <VIcon @click="presetPositionMenu()" icon="mdi-pan-left" />
        <VIcon class="cursor-grab" @mousedown="dragStart" @mouseup="dragEnd" icon="mdi-drag" />
        <VIcon @click="presetPositionMenu(1)" icon="mdi-pan-right" />
      </VCardTitle>
  
      <VCardText>
      </VCardText>
  
              <div class="resize-handle cursor-ns-resize w-full h-2 bottom-0 bg-gray-400 absolute select-none" @mousedown="resizeStart" />
    </VCard>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
  
  const resizableCard = ref(null);
  
  const state = reactive({
    x: 0,
    y: 0,
    width: 250,
    height: 200,
    dragging: false,
    resizing: false,
    dragStartX: 0,
    dragStartY: 0,
    resizeStartWidth: 0,
    resizeStartHeight: 0,
  });
  
  const dragStart = (event) => {
    state.dragging = true;
    state.dragStartX = event.clientX - state.x;
    state.dragStartY = event.clientY - state.y;
  };
  
  const drag = (event) => {
    if (!state.dragging) return;
    state.x = event.clientX - state.dragStartX;
    state.y = event.clientY - state.dragStartY;
  };
  
  const dragEnd = () => {
    state.dragging = false;
  };
  
  const resizeStart = (event) => {
    event.stopPropagation();
    state.resizing = true;
    // state.resizeStartWidth = state.width;
    state.resizeStartHeight = state.height;
    state.dragStartX = event.clientX;
    state.dragStartY = event.clientY;
  };
  
  const resize = (event) => {
    if (!state.resizing) return;
    // state.width = state.resizeStartWidth + (event.clientX - state.dragStartX);
    state.height = state.resizeStartHeight + (event.clientY - state.dragStartY);
  };
  
  const resizeEnd = () => {
    state.resizing = false;
  };
  
  onMounted(() => {
    window.addEventListener('mousemove', drag);
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', dragEnd);
    window.addEventListener('mouseup', resizeEnd);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', drag);
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', dragEnd);
    window.removeEventListener('mouseup', resizeEnd);
  });
  </script>