<template>
    <iframe ref="frame" src="/#/frame-room-2" width="100%" height="100%" />
    <input v-model="state.a.text" />
    <button @click="toggle = !toggle; frame.contentWindow.setToggle(toggle)">{{ toggle }}</button>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';

const frame = ref(null)

const state = reactive({
    a: {
        text: 'Hello World',
        items: [{
            text: 'Hello World'
        }]
    }
})

const toggle = ref(false)

window.setToggle = (value) => {
    toggle.value = value
}

watch(state, () => {
    frame.value.contentWindow.setState(state)
}, { deep: true })

window.init = () => {
    return { state, toggle }
}
</script>