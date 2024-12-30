document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput.trim()) return;

    // Display user message
    displayMessage(userInput, 'user');

    // Clear input field
    document.getElementById('user-input').value = '';

    try {
        const response = await fetch('http://<your-pc-ip>:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: userInput })
        });

        const data = await response.json();
        if (data.error) {
            displayMessage(`Error: ${data.error}`, 'ollama');
        } else {
            displayMessage(data.response, 'ollama');
        }
    } catch (error) {
        console.error('Error communicating with backend:', error);
        displayMessage('Oops! Something went wrong. Please try again later.', 'ollama');
    }
}

function displayMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'ollama-message');
    messageElement.textContent = message;

    document.getElementById('messages').appendChild(messageElement);
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}
