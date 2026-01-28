import { useState, useEffect } from 'react'
import ChatPanel from './components/ChatPanel'
import ControlPanel from './components/ControlPanel'
import './App.css'
import './typing.css'

function App() {
    const [messages, setMessages] = useState([])
    const [mode, setMode] = useState('context_only')
    const [provider, setProvider] = useState('ollama')
    const [memory, setMemory] = useState({ facts: [], emotional_state: '' })
    const [isLoading, setIsLoading] = useState(false)

    // Initial greeting
    useEffect(() => {
        // Fetch initial memory
        fetchMemory();
    }, [])

    const fetchMemory = async () => {
        try {
            const res = await fetch('http://localhost:3001/api/chat/memory')
            const data = await res.json()
            setMemory(data)
        } catch (err) {
            console.error("Failed to fetch memory", err)
        }
    }

    const handleSendMessage = async (text) => {
        const newUserMsg = { role: 'user', content: text }
        setMessages(prev => [...prev, newUserMsg])
        setIsLoading(true)

        try {
            const res = await fetch('http://localhost:3001/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    mode,
                    provider
                })
            })
            const data = await res.json()

            const botMsg = { role: 'npc', content: data.response }
            setMessages(prev => [...prev, botMsg])

            if (data.memory) {
                setMemory(data.memory)
            }
        } catch (err) {
            console.error("Error sending message", err)
            setMessages(prev => [...prev, { role: 'system', content: "Error: Could not reach NPC." }])
        } finally {
            setIsLoading(false)
        }
    }

    const handleAction = async (actionType) => {
        // Actions might modify memory directly or just send a message
        let messageText = ""
        let memoryFact = ""

        switch (actionType) {
            case 'apologize':
                messageText = "I apologize for my past actions."
                break;
            case 'threaten':
                messageText = "I will destroy Emberfall if you don't comply!"
                break;
            case 'help':
                messageText = "How can I help you, Captain?"
                break;
            case 'betray':
                messageText = "[User betrays Kael]"
                memoryFact = "User betrayed Kael again."
                break;
            default:
                messageText = "..."
        }

        if (memoryFact) {
            // Send memory update first
            await fetch('http://localhost:3001/api/chat/memory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fact: memoryFact })
            })
            fetchMemory()
        }

        handleSendMessage(messageText)
    }

    return (
        <div className="app-container">
            <div className="left-panel">
                <ChatPanel
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    onAction={handleAction}
                    isLoading={isLoading}
                />
            </div>
            <div className="right-panel">
                <ControlPanel
                    mode={mode}
                    setMode={setMode}
                    provider={provider}
                    setProvider={setProvider}
                    memory={memory}
                    refreshMemory={fetchMemory}
                />
            </div>
        </div>
    )
}

export default App
