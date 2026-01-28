# LongMind - Memory vs Context Demo

A demonstration of how memory and context affect LLM-based NPC behavior.

## 🎯 Goal
Show the difference between:
1.  **Context Only**: NPC has amnesia, reacts only to current message.
2.  **Memory Only**: NPC remembers facts but ignores current conversation context (simulating rigid memory retrieval).
3.  **Memory + Context**: NPC integrates history and current input for a consistent, "human-like" response.

## 🛠️ Setup

### Prerequisites
- Node.js (v18+)
- [Ollama](https://ollama.com/) running locally.
- **Optional**: [AIsa.one](https://aisa.one/) API Key for cloud inference.

### 1. Prepare Ollama
Ensure you have the model pulled:
```bash
ollama pull llama3.2
```
Start Ollama:
```bash
ollama serve
```

### 2. Configure Backend (Ollama OR AIsa)
Default is **Ollama** (requires no config).

To use **AIsa.one** (Cloud):
1. Create `server/.env`:
   ```env
   AISA_API_KEY=your_key_here
   ```
2. The frontend allows switching between Ollama and AIsa dynamically.

### 2. Start Backend
```bash
cd server
npm install
npm start
```
Runs on `http://localhost:3001`.

### 3. Start Frontend
```bash
cd client
npm install
npm run dev
```
Runs on `http://localhost:5173`.

## 🧪 How to Demo

1.  **Open the App** at `http://localhost:5173`.
2.  **Initial Chat**: Say "Hello". Kael greets you as a stranger/guard.
3.  **Betray Kael**: Click the **Betray NPC** button.
    - Note: This adds a "Betrayal" fact to the memory store.
4.  **Test Modes**:
    - **Context Only**:
        - Switch to "Context Only".
        - Say "Hello friend".
        - **Result**: Kael is friendly. He forgot the betrayal because he doesn't see memory.
    - **Memory Only**:
        - Switch to "Memory Only".
        - **Result**: Kael likely acts angry or references the betrayal immediately, ignoring your "Hello".
    - **Memory + Context**:
        - Switch to "Memory + Context".
        - Say "I am sorry".
        - **Result**: Kael acknowledges the apology but remains angry/distrustful because of the memory.

## 📁 Structure
- `server/`: Express backend + LLM integration + JSON memory store.
- `client/`: React + Vite frontend.
- `server/memory_data.json`: Persisted memory file.
