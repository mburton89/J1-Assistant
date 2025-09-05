document.getElementById('search-button').addEventListener('click', async () => {
    const query = document.getElementById('search-bar').value;
    const responseDiv = document.getElementById('response');
    
    if (!query) {
        responseDiv.innerHTML = '<p>Please enter a question.</p>';
        return;
    }

    responseDiv.innerHTML = '<p>Loading...</p>';
    responseDiv.classList.add('loading');

    try {
        const response = await fetch('https://j1-api-proxy.matthewwburton.workers.dev', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const { answer } = await response.json();
        responseDiv.innerHTML = `<p>${answer}</p>`;
        responseDiv.classList.remove('loading');
    } catch (error) {
        responseDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        responseDiv.classList.remove('loading');
    }
});