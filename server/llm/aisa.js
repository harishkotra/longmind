const axios = require('axios');

const AISA_URL = 'https://api.aisa.one/v1/chat/completions';
const API_KEY = process.env.AISA_API_KEY;

async function chatComplete(messages) {
    if (!API_KEY) {
        console.error("AISA_API_KEY is missing.");
        return "ERROR: AISA_API_KEY not configured in backend .env file.";
    }

    try {
        const payload = {
            model: 'gpt-4o', // Using a standard high-quality model via AIsa router
            messages: messages,
            stream: false
        };

        console.log(`[AIsa] Sending request to ${AISA_URL} with model ${payload.model}`);

        const response = await axios.post(AISA_URL, payload, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.choices && response.data.choices.length > 0) {
            return response.data.choices[0].message.content;
        }

        console.error('[AIsa] Unexpected response structure:', response.data);
        return "ERROR: Invalid response structure from AIsa.";

    } catch (error) {
        const errMsg = error.response ? JSON.stringify(error.response.data) : error.message;
        console.error(`[AIsa] API Error: ${errMsg}`);
        return `ERROR: AIsa API Failed. check console for details.`;
    }
}

module.exports = { chatComplete };
