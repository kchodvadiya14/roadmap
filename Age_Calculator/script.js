document.addEventListener('DOMContentLoaded', function() {
    // Initialize Flatpickr
    const datepicker = flatpickr("#birthdate", {
        dateFormat: "Y-m-d",
        maxDate: "today",
        disableMobile: "true"
    });

    // Get form and result elements
    const form = document.getElementById('ageForm');
    const yearsElement = document.getElementById('years');
    const monthsElement = document.getElementById('months');
    const daysElement = document.getElementById('days');

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const birthdate = datepicker.selectedDates[0];
        
        if (!birthdate) {
            alert('Please select a valid birthdate');
            return;
        }

        // Calculate age using Luxon
        const birth = luxon.DateTime.fromJSDate(birthdate);
        const now = luxon.DateTime.now();
        
        const diff = now.diff(birth, ['years', 'months', 'days']).toObject();
        
        // Update the result display
        yearsElement.textContent = Math.floor(diff.years);
        monthsElement.textContent = Math.floor(diff.months);
        daysElement.textContent = Math.floor(diff.days);
    });
}); 