<template>
    <div contenteditable @mouseup="handleMouseUp">
        Texto mais legível!
    </div>

    <Teleport to="body">
        <div class="absolute" :style="textMenuStyle">
            <VBtnGroup divided variant="outlined" color="background" density="compact">
                <VBtn v-for="command in commands" :key="command.name" :icon="command.icon" @click="command.action" />
            </VBtnGroup>
        </div>
    </Teleport>
</template>

<script setup>
import { ref } from 'vue';
import { VBtnGroup } from 'vuetify/lib/components/index.mjs';

const textMenuStyle = ref({
    top: '0px',
    left: '0px',
})

function handleMouseUp(event) {
    const selection = window.getSelection()
    const selectedText = selection.toString();

    if (selectedText) {
        // Get the range at the 0th index of the selection
        const range = selection.getRangeAt(0);

        // Get the bounding rectangle of the selected text
        const rect = range.getBoundingClientRect();

        // Put the menu above the selected text
        textMenuStyle.value.top = `${rect.top - 60}px`
        textMenuStyle.value.left = `${rect.left}px`
    }
};

// Copilot, create all document.execCommand functions
function justifyLeft() {
    document.execCommand('justifyLeft', false, null);
}

function justifyCenter() {
    document.execCommand('justifyCenter', false, null);
}

function justifyRight() {
    document.execCommand('justifyRight', false, null);
}

function justifyFull() {
    document.execCommand('justifyFull', false, null);
}

function bold() {
    document.execCommand('bold', false, null);
}

function italic() {
    document.execCommand('italic', false, null);
}

function underline() {
    document.execCommand('underline', false, null);
}

function strikeThrough() {
    document.execCommand('strikeThrough', false, null);
}

function subscript() {
    document.execCommand('subscript', false, null);
}

function superscript() {
    document.execCommand('superscript', false, null);
}

// put all in array and mdi-icons to use in the menu

const commands = [
    { name: 'justifyLeft', icon: 'mdi-format-align-left', action: justifyLeft },
    { name: 'justifyCenter', icon: 'mdi-format-align-center', action: justifyCenter },
    { name: 'justifyRight', icon: 'mdi-format-align-right', action: justifyRight },
    { name: 'justifyFull', icon: 'mdi-format-align-justify', action: justifyFull },
    { name: 'bold', icon: 'mdi-format-bold', action: bold },
    { name: 'italic', icon: 'mdi-format-italic', action: italic },
    { name: 'underline', icon: 'mdi-format-underline', action: underline },
    { name: 'strikeThrough', icon: 'mdi-format-strikethrough-variant', action: strikeThrough },
    { name: 'subscript', icon: 'mdi-format-subscript', action: subscript },
    { name: 'superscript', icon: 'mdi-format-superscript', action: superscript },
]
</script>