document.addEventListener('DOMContentLoaded', () => {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptButton = document.getElementById('acceptCookies');

    // Check if user has already accepted cookies
    const hasAcceptedCookies = localStorage.getItem('cookieConsent');

    if (!hasAcceptedCookies) {
        // Show the cookie consent banner
        cookieConsent.style.display = 'block';
    }

    // Handle the accept button click
    acceptButton.addEventListener('click', () => {
        // Store the consent in localStorage
        localStorage.setItem('cookieConsent', 'true');
        
        // Hide the cookie consent banner
        cookieConsent.style.display = 'none';
    });
}); 