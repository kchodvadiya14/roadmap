document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.custom-dropdown');
    const dropdownHeader = dropdown.querySelector('.dropdown-header');
    const selectedItemSpan = dropdown.querySelector('.selected-item');
    const dropdownList = dropdown.querySelector('.dropdown-list');
    const listItems = dropdownList.querySelectorAll('li');
    const selectionOutputDiv = document.getElementById('selection-output');

    // Toggle dropdown on header click
    dropdownHeader.addEventListener('click', () => {
        dropdown.classList.toggle('open');
    });

    // Handle item selection
    listItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update selected item text
            selectedItemSpan.textContent = item.textContent;

            // Remove 'selected' class from previously selected item
            listItems.forEach(li => li.classList.remove('selected'));

            // Add 'selected' class to the clicked item
            item.classList.add('selected');

            // Update the selection output div
            const selectedValue = item.getAttribute('data-value');
            selectionOutputDiv.textContent = `You selected: ${item.textContent} (Value: ${selectedValue})`;

            // Close the dropdown
            dropdown.classList.remove('open');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove('open');
        }
    });
}); 