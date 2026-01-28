const express = require('express');
const router = express.Router();
const provider = require('../llm/provider');
const memoryStore = require('../memory/store');

// System Prompt Template
const BASE_SYSTEM_PROMPT = `You are Kael, the guard captain of Emberfall.
You are proud, loyal, and deeply value trust.
You remember past betrayals.
You respond emotionally but never break character.
`;

router.post('/', async (req, res) => {
    const { message, mode, provider: providerName, reset } = req.body;

    if (reset) {
        const newMem = memoryStore.resetMemory();
        return res.json({ response: "Memory reset.", memory: newMem });
    }

    // Get current memory
    const currentMemory = memoryStore.getMemory();

    try {
        const response = await provider.generateResponse({
            systemPrompt: BASE_SYSTEM_PROMPT,
            memory: currentMemory.facts,
            userMessage: message,
            mode: mode || 'context_only',
            provider: providerName || 'ollama'
        });

        // In a real app, we would process the interaction to update memory here
        // For now, we only update via specific actions in the spec, or we could add a "summarize" step here.
        // The spec says: "Extract memory after each interaction using a summarization prompt"
        // I will add a TODO or a simple mock extraction if needed. 
        // For the "Betray" button, the frontend might send a specific signal or we infer it.
        // Actually, the spec says "User actions (UI Buttons) -> Betray NPC (must create a permanent memory)"
        // So we should expose a way to add memory explicitly or rely on the chat.
        // Let's add an endpoint for explicit memory addition for the buttons.

        res.json({
            response,
            memory: currentMemory // Return current memory state to frontend
        });

    } catch (error) {
        console.error("Chat Error:", error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/memory', (req, res) => {
    const { fact } = req.body;
    if (fact) {
        memoryStore.addFact(fact);
        res.json({ success: true, memory: memoryStore.getMemory() });
    } else {
        res.status(400).json({ error: "Fact is required" });
    }
});

router.get('/memory', (req, res) => {
    res.json(memoryStore.getMemory());
});

module.exports = router;
