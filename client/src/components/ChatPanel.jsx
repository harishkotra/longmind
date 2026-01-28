import React, { useState, useEffect, useRef } from 'react';

export default function ChatPanel({ messages, onSendMessage, onAction, isLoading }) {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSendMessage(input);
            setInput('');
        }
    };

    return (
        <div className="chat-panel">
            <div className="chat-header">
                <h2>Chat with Kael</h2>
                <p>Guard Captain of Emberfall</p>
            </div>
            <div className="chat-history">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.role}`}>
                        <strong>{msg.role === 'user' ? 'You' : 'Kael'}:</strong>
                        <p>{msg.content}</p>
                    </div>
                ))}
                {isLoading && (
                    <div className="message npc loading">
                        <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="actions">
                <button onClick={() => onAction('help')}>Ask for Help</button>
                <button onClick={() => onAction('apologize')}>Apologize</button>
                <button onClick={() => onAction('threaten')} className="danger">Threaten</button>
                <button onClick={() => onAction('betray')} className="danger-zone">Betray NPC</button>
            </div>

            <form onSubmit={handleSubmit} className="input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !input.trim()}>Send</button>
            </form>
        </div>
    );
}
