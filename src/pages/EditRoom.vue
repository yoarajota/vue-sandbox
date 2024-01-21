<template>
    <p contenteditable 
    @keydown="italic"
    @input="() => {}">
        as
    </p>
</template>
<script setup>


// Function to if press cntrl I, in a contenteditable element, puts <i> tag arround string selected
function italic(event) {
    var selection = window.getSelection().toString();
    var text = document.querySelector('p').innerHTML;
    var newText = text.replace(selection, '<i>' + selection + '</i>');
    document.querySelector('p').innerHTML = newText;
}


</script>