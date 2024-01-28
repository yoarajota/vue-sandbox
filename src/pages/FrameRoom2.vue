<template>
    {{ state }}
asd
    <input type="text" @change="onChange"/>
</template>

<script setup>
import { onMounted } from 'vue';

let state;
function onChange(event) {
    state.value.name = event.target.value
}

onMounted(() => {
    state = window.parent.init()
})
</script>