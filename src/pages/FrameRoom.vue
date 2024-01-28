<template>
    {{ state.name }}
    {{ text }}

    <div class="w-full h-full">
        <iframe src="/#/frame-room-2" height="50%" />
    </div>
</template>

<script setup>
import { ref } from 'vue'

const state = ref({})
const text = ref("")
window.init = () => {
    return state
}

window.text = text

</script>