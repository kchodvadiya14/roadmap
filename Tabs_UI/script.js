document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    function switchTab(e) {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Add active class to clicked button
        e.target.classList.add('active');

        // Show corresponding tab pane
        const tabId = e.target.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    }

    // Add click event listener to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', switchTab);
    });
}); 