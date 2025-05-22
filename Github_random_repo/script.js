// List of programming languages
const languages = [
    'JavaScript',
    'Python',
    'Java',
    'TypeScript',
    'C++',
    'C#',
    'PHP',
    'Ruby',
    'Go',
    'Rust',
    'Swift',
    'Kotlin',
    'Scala',
    'R',
    'Dart'
];

// DOM Elements
const languageSelect = document.getElementById('language-select');
const fetchButton = document.getElementById('fetch-button');
const refreshButton = document.getElementById('refresh-button');
const resultsArea = document.getElementById('results-area');

// Populate language options
function populateLanguageOptions() {
    languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language;
        option.textContent = language;
        languageSelect.appendChild(option);
    });
}

// Show loading state
function showLoading() {
    resultsArea.innerHTML = '<p>Loading repository information...</p>';
    fetchButton.disabled = true;
}

// Show error state
function showError(message) {
    resultsArea.innerHTML = `<p class="error">${message}</p>`;
    fetchButton.disabled = false;
}

// Display repository information
function displayRepository(repo) {
    const html = `
        <div class="repository-details">
            <h2>${repo.name}</h2>
            <p><strong>Description:</strong> ${repo.description || 'No description available'}</p>
            <p><strong>Stars:</strong> ⭐ ${repo.stargazers_count}</p>
            <p><strong>Forks:</strong> 🔄 ${repo.forks_count}</p>
            <p><strong>Open Issues:</strong> 🐛 ${repo.open_issues_count}</p>
            <p><strong>Language:</strong> ${repo.language}</p>
            <p><a href="${repo.html_url}" target="_blank">View on GitHub</a></p>
        </div>
    `;
    resultsArea.innerHTML = html;
    refreshButton.style.display = 'inline-block';
    fetchButton.disabled = false;
}

// Fetch random repository
async function fetchRandomRepository() {
    const selectedLanguage = languageSelect.value;
    
    if (!selectedLanguage) {
        showError('Please select a programming language');
        return;
    }

    showLoading();

    try {
        // GitHub API endpoint for repository search
        const apiUrl = `https://api.github.com/search/repositories?q=language:${encodeURIComponent(selectedLanguage)}&sort=stars&order=desc`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }

        const data = await response.json();
        
        if (data.items.length === 0) {
            showError('No repositories found for the selected language');
            return;
        }

        // Get a random repository from the results
        const randomIndex = Math.floor(Math.random() * Math.min(data.items.length, 100));
        const randomRepo = data.items[randomIndex];
        
        displayRepository(randomRepo);
    } catch (error) {
        showError('Error: ' + error.message);
    }
}

// Event Listeners
fetchButton.addEventListener('click', fetchRandomRepository);
refreshButton.addEventListener('click', fetchRandomRepository);

// Initialize the application
function init() {
    populateLanguageOptions();
}

// Call init when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 