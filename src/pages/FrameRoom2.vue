<template>
    {{ state }}
asd
    <input type="text" @change="onChange"/>
    <br />
    <br />
    <input type="text" v-model="text"/>
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

const text = window.parent.text
</script>