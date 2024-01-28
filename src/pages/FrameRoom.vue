<template>
    {{ state.name }}

    <iframe 
        src="/#/frame-room-2" 
    />
</template>

<script setup>
import { ref } from 'vue'

const state = ref({})
window.init = () => {
    return state
}


</script>