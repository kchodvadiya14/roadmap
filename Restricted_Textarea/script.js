document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('restrictedTextarea');
    const charCount = document.getElementById('charCount');
    const maxChars = document.getElementById('maxChars');
    const charCounter = document.querySelector('.char-counter');
    
    const MAX_CHARACTERS = 100;
    maxChars.textContent = MAX_CHARACTERS;

    function updateCharCount() {
        const currentLength = textarea.value.length;
        charCount.textContent = currentLength;

        if (currentLength >= MAX_CHARACTERS) {
            textarea.classList.add('limit-reached');
            charCounter.classList.add('limit-reached');
            // Trim the text if it exceeds the limit
            textarea.value = textarea.value.substring(0, MAX_CHARACTERS);
        } else {
            textarea.classList.remove('limit-reached');
            charCounter.classList.remove('limit-reached');
        }
    }

    // Update count on input
    textarea.addEventListener('input', updateCharCount);

    // Prevent paste if it would exceed the limit
    textarea.addEventListener('paste', (e) => {
        const pasteData = e.clipboardData.getData('text');
        if (textarea.value.length + pasteData.length > MAX_CHARACTERS) {
            e.preventDefault();
        }
    });
}); 