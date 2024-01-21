<template>
    <p contenteditable @keydown="bold" @input="() => { }">
        1laskdçla asçdlkasçld0oo 213sa
    </p>
</template>
<script setup>

function bold(event) {
    if (event.ctrlKey && event.key === 'b') {
        event.preventDefault();
        const range = window.getSelection().getRangeAt(0);
        const parentElement = range.commonAncestorContainer.parentElement;

        if (range.startOffset !== range.endOffset) {
            if (parentElement.tagName === 'B') {
                // If the selected text is already bold, remove the <b> tags
                const newText = document.createTextNode(parentElement.textContent);
                parentElement.replaceWith(newText);
                newText.parentNode.normalize(); // Merge adjacent text nodes
            } else {
                // If the selected text is not bold, add the <b> tags
                const boldNode = document.createElement('b');
                boldNode.appendChild(document.createTextNode(range.toString()));
                range.deleteContents();
                range.insertNode(boldNode);
            }

            document.querySelectorAll('b').forEach(tag => {
                if (tag.textContent.trim() === '') {
                    tag.remove();
                }
            });
        }
    }
}

</script>