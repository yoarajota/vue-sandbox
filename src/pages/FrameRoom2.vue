<template>
    <div>
        <p >{{ state.a.text }}</p>
        <ul>
            <li v-for="item in state.a.items">{{ item.text }}</li>
        </ul>
    </div>

    <button @click="handleToggle">{{ toggle }}</button>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';

const state = reactive({
    a: {}
})

const toggle = ref(false)

window.setState = (obj) => {
    for (const key in obj.a) {
        state.a[key] = obj.a[key]
    }
}

window.setToggle = (value) => {
    toggle.value = value
}

function handleToggle() {
    toggle.value = !toggle.value
    parent.setToggle(toggle.value)
}

onMounted(() => {
    const obj = parent.init()
    
    for (const key in obj.state) {
        state[key] = obj.state[key]
    }

    console.log(state)

    toggle.value = obj.toggle
})

</script>