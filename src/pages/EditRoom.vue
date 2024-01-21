<template>
    <p contenteditable @keydown="bold" @input="() => { }">
       Texto mais legível!
    </p>
</template>
<script setup>

function bold(event) {
    if (event.ctrlKey && event.key === 'b') {
        event.preventDefault();
        const range = window.getSelection().getRangeAt(0);
        const parentElement = range.commonAncestorContainer.parentElement;
        
        if (range.startOffset !== range.endOffset) {
            const string = range.toString();

            if (parentElement.tagName === 'B') {
                if (parentElement.textContent !== string) {
                    // If the selected text is only a part of the bold text, close the <b> tag before and start a new one after.
                    const startText = parentElement.textContent.substring(0, range.startOffset);
                    const selectedText = range.toString();
                    const endText = parentElement.textContent.substring(range.endOffset);
                    const newHTML = '<b>' + startText + '</b>' + selectedText + '<b>' + endText + '</b>';
                    parentElement.outerHTML = newHTML;
                } else {
                    // If the selected text is already bold, remove the <b> tags
                    const newText = document.createTextNode(parentElement.textContent);
                    parentElement.replaceWith(newText);
                    newText.parentNode.normalize(); // Merge adjacent text nodes
                }
            } else {
                // If the selected text is not bold, add the <b> tags
                const boldNode = document.createElement('b');
                boldNode.appendChild(document.createTextNode(string));
                range.deleteContents();
                range.insertNode(boldNode);
            }

            parentElement.querySelectorAll('b').forEach(tag => {
                if (tag.textContent.trim() === '') {
                    tag.remove();
                }
            });
        }
    }
}

</script>