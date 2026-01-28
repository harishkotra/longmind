const fs = require('fs');
const path = require('path');

const MEMORY_FILE = path.join(__dirname, 'memory_data.json');

// Default memory state
const DEFAULT_MEMORY = {
    npc: "Kael",
    facts: [
        "User betrayed Kael during the raid on Emberfall",
        "Kael no longer trusts the user",
        "User previously asked for forgiveness" // from the spec
    ],
    emotional_state: "angry but controlled"
};

function loadMemory() {
    if (!fs.existsSync(MEMORY_FILE)) {
        saveMemory(DEFAULT_MEMORY);
        return DEFAULT_MEMORY;
    }
    try {
        const data = fs.readFileSync(MEMORY_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading memory file, returning default:", err);
        return DEFAULT_MEMORY;
    }
}

function saveMemory(data) {
    fs.writeFileSync(MEMORY_FILE, JSON.stringify(data, null, 2));
}

function getMemory() {
    return loadMemory();
}

function addFact(fact) {
    const mem = loadMemory();
    mem.facts.push(fact);
    saveMemory(mem);
}

function resetMemory() {
    saveMemory(DEFAULT_MEMORY);
    return DEFAULT_MEMORY;
}

module.exports = {
    getMemory,
    addFact,
    resetMemory
};
