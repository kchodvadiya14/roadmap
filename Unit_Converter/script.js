document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');
    const resultSection = document.getElementById('result');

    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            try {
                // Show loading state
                submitButton.disabled = true;
                submitButton.textContent = 'Converting...';
                resultSection.classList.remove('show');
                
                const formData = new FormData(form);
                const data = {
                    type: formData.get('type'),
                    value: formData.get('value'),
                    from: formData.get('from'),
                    to: formData.get('to')
                };

                // Validate input before sending
                if (!data.value || isNaN(parseFloat(data.value))) {
                    throw new Error('Please enter a valid number');
                }

                console.log('Sending request:', data);

                const response = await fetch('/convert', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                console.log('Response status:', response.status);

                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }

                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Server returned non-JSON response');
                }

                const result = await response.json();
                console.log('Response data:', result);

                if (!result || typeof result.result !== 'number') {
                    throw new Error('Invalid response format from server');
                }

                // Get the unit labels
                const fromLabel = form.querySelector(`select[name="from"] option[value="${data.from}"]`).textContent;
                const toLabel = form.querySelector(`select[name="to"] option[value="${data.to}"]`).textContent;
                
                // Display the result
                resultSection.innerHTML = `
                    <p>${data.value} ${fromLabel} = ${result.result} ${toLabel}</p>
                `;
                resultSection.classList.add('show');
            } catch (error) {
                console.error('Error:', error);
                resultSection.innerHTML = `<p class="error">Error: ${error.message}</p>`;
                resultSection.classList.add('show');
            } finally {
                // Reset button state
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    });
}); 