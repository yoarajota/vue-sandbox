<template>
    <p contenteditable @input="() => { }">
       Texto mais legível!
    </p>

<Suspense>
    <Render />
</Suspense>	
</template>

<script setup>
import Render from '../components/teste/render.vue';

</script>