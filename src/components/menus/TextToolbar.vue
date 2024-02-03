<template>
    <VFadeTransition>
        <VSheet position="absolute" :style="textMenuStyle" v-show="textMenuShow">
            <VBtnToggle v-model="commandSelected" multiple divided variant="outlined" density="compact">
                <VBtn v-for="command in commands" :key="command.name" :icon="command.icon"
                    @click="execCommand(command.name)" :value="command.name" />
            </VBtnToggle>
        </VSheet>
    </VFadeTransition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const textMenuStyle = ref({
    top: '0px',
    left: '0px',
})
const textMenuShow = ref(false);

function handleKeyUp(event) {
    if (event.ctrlKey && event.key === 'a') {
        handleSelection()

        return
    }

    if (event.key === 'Escape') {
        textMenuShow.value = false;
    }
}

function handleSelection() {
    const selection = window.getSelection()
    const selectedText = selection.toString();

    if (selectedText) {
        // Get the range at the 0th index of the selection
        const range = selection.getRangeAt(0);

        // Get the bounding rectangle of the selected text
        const rect = range.getBoundingClientRect();

        // Put the menu above the selected text, but before, test if some part off the menu will be out of the screen (right or left)
        if (rect.left + 250 > window.innerWidth) {
            console.log('asd');
            textMenuStyle.value.left = `${window.innerWidth - 250}px`;
        } else {
            console.log(rect.left);
            textMenuStyle.value.left = `${rect.left}px`;
        }

        textMenuStyle.value.top = `${rect.top - 40}px`
        textMenuShow.value = true;

        commandSelected.value = [];

        // Update the selected state of each command
        commands.forEach(command => {
            const commandState = document.queryCommandState(command.name);

            if (commandState) {
                commandSelected.value.push(command.name);
            }
        });
    }
};

const allJustifyCommands = ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'];

function execCommand(command) {
    document.execCommand(command, false, null);

    if (allJustifyCommands.includes(command)) {
        allJustifyCommands.forEach(cmd => {
            if (cmd !== command) {
                document.queryCommandState(cmd) && document.execCommand(cmd, false, null);
                commandSelected.value = commandSelected.value.filter(c => c !== cmd);
            }
        });
    }
}

const commandSelected = ref([]);

// Put all in array and mdi-icons to use in the menu
const commands = [
    { name: 'justifyLeft', icon: 'mdi-format-align-left' },
    { name: 'justifyCenter', icon: 'mdi-format-align-center' },
    { name: 'justifyRight', icon: 'mdi-format-align-right' },
    { name: 'justifyFull', icon: 'mdi-format-align-justify' },
    { name: 'bold', icon: 'mdi-format-bold' },
    { name: 'italic', icon: 'mdi-format-italic' },
    { name: 'underline', icon: 'mdi-format-underline' },
    { name: 'strikeThrough', icon: 'mdi-format-strikethrough-variant' },
]

// Apply validations in paste event
function paste(event) {
    // Value of the paste
    const value = event.target.value;

    event.stopPropagation();
    // Prevent the default paste action
    event.preventDefault();

    // Remove all styles when pasting

    // Get the text from the clipboard
    const text = (event.clipboardData || window.clipboardData).getData('text');

    // Insert the text without any formatting
    document.execCommand('insertText', false, text);
}

onMounted(() => {
    // Add event listeners to all elements with contenteditable
    document.querySelectorAll('[contenteditable]').forEach(element => {
        element.addEventListener('keyup', handleKeyUp);
        element.addEventListener('mouseup', handleSelection);
        element.addEventListener('paste', paste);
        element.addEventListener('blur', () => textMenuShow.value = false);
    });
});
</script>