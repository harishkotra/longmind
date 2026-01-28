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

#### Output Examples

<img width="3036" height="2442" alt="screencapture-localhost-5174-2026-01-28-11_14_47" src="https://github.com/user-attachments/assets/70c9b876-5ce1-432d-80ba-a8461d0bb957" />
<img width="3036" height="2442" alt="screencapture-localhost-5174-2026-01-28-11_15_29" src="https://github.com/user-attachments/assets/a4554017-3a5c-4e80-ac1a-6e9c84ada4b1" />
<img width="3036" height="2442" alt="screencapture-localhost-5174-2026-01-28-11_16_02" src="https://github.com/user-attachments/assets/a29edc5e-efdf-4c11-b193-d2902e3812d7" />
<img width="3036" height="2442" alt="screencapture-localhost-5174-2026-01-28-11_16_17" src="https://github.com/user-attachments/assets/02e55ad5-3b39-436e-aa12-56b5b7f6241b" />
<img width="3036" height="3013" alt="screencapture-localhost-5174-2026-01-28-11_16_57" src="https://github.com/user-attachments/assets/d6b65f7f-0ab2-4d19-a482-fe9dbd1b5d21" />
