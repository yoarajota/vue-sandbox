<template>
    <p contenteditable @keydown="bold" @input="() => { }">
        1laskdçla asçdlkasçld0oo 213sa
    </p>
</template>
<script setup>

function bold(event) {
    if (event.ctrlKey && event.key === 'b') {
        event.preventDefault();
        var selection = window.getSelection();
        var range = selection.getRangeAt(0);
        var parentElement = range.commonAncestorContainer.parentElement;

        if (range.startOffset !== range.endOffset) {
            if (parentElement.tagName === 'B' || parentElement.tagName === 'DIV') {
                // If the selected text is already bold, remove the <b> tags
                var newText = document.createTextNode(parentElement.textContent);
                parentElement.replaceWith(newText);
            } else {
                // If the selected text is not bold, add the <b> tags
                var boldNode = document.createElement('b');
                boldNode.appendChild(document.createTextNode(range.toString()));
                range.deleteContents();
                range.insertNode(boldNode);
            }

            var boldTags = document.querySelectorAll('b');
            boldTags.forEach(tag => {
                if (tag.textContent.trim() === '') {
                    tag.remove();
                }
            });
        }
    }
}

</script>