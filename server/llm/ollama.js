const axios = require('axios');

const OLLAMA_URL = 'http://localhost:11434/api/chat';
const MODEL = 'llama3.2'; // Can be configured

async function chatComplete(messages) {
    try {
        const payload = {
            model: MODEL,
            messages: messages,
            stream: false
        };

        console.log('[Ollama] Request:', JSON.stringify(payload, null, 2));

        const response = await axios.post(OLLAMA_URL, payload);

        if (response.data && response.data.message) {
            return response.data.message.content;
        }
        return "ERROR: No response from Ollama.";

    } catch (error) {
        console.error('[Ollama] Error:', error.message);
        if (error.code === 'ECONNREFUSED') {
            return "ERROR: Could not connect to Ollama. Is it running?";
        }
        return `ERROR: ${error.message}`;
    }
}

module.exports = { chatComplete };
