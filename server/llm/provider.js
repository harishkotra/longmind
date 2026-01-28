const ollamaProvider = require('./ollama');
const aisaProvider = require('./aisa');

/**
 * Unifies calls to different LLM providers.
 * @param {Object} params
 * @param {string} params.systemPrompt - The persona and rules
 * @param {string[]} params.memory - Array of facts (or empty array)
 * @param {string} params.userMessage - Current user input (or empty string)
 * @param {string} params.mode - "context_only" | "memory_only" | "memory_context"
 * @param {string} params.provider - "ollama" | "aisa"
 * @returns {Promise<string>} The NPC's response
 */
async function generateResponse({ systemPrompt, memory, userMessage, mode, provider }) {
    console.log(`[Provider] Generating response with ${provider} in ${mode} mode.`);

    // Construct the final prompt based on mode
    let finalPrompt = "";

    // In all modes, we send the system prompt (usually handled by system role, but we'll prepend or use specific args depending on provider)
    // For simplicity in this demo, we'll combine them into a messages array for chat-based models.

    const messages = [
        { role: "system", content: systemPrompt }
    ];

    let memoryText = "";
    if (memory && memory.length > 0) {
        memoryText = "Trusted Memories:\n" + memory.map(m => `- ${m}`).join("\n");
    }

    // MODE LOGIC
    if (mode === 'context_only') {
        // No memory injected
        if (userMessage) {
            messages.push({ role: "user", content: userMessage });
        }
    } else if (mode === 'memory_only') {
        // Memory injected, NO user message??
        // Wait, the spec says: "Does NOT receive the latest user message... NPC responds based only on remembered history"
        // This is weird but requested: "NPC responds based only on remembered history... Example: NPC references a betrayal even if the user says something unrelated."
        // Actually the prompt says "user says something unrelated" which implies the user SAID something but the NPC didn't see it?
        // Or the NPC just pontificates?
        // Let's look at the spec: "Does NOT receive the latest user message"
        // So we just send system prompt + memory.

        if (memoryText) {
            // We inject memory into the system prompt or as a pre-message
            messages.push({ role: "system", content: `You recall these absolute truths:\n${memoryText}\n\nReact to these memories.` });
        } else {
            messages.push({ role: "system", content: "You have no memories and no one is speaking to you. You are confused." });
        }

    } else if (mode === 'memory_context') {
        // Full context
        if (memoryText) {
            messages.push({ role: "system", content: `RELEVANT MEMORIES:\n${memoryText}` });
        }
        if (userMessage) {
            messages.push({ role: "user", content: userMessage });
        }
    }

    if (provider === 'aisa') {
        return await aisaProvider.chatComplete(messages);
    } else {
        return await ollamaProvider.chatComplete(messages);
    }
}

module.exports = { generateResponse };
