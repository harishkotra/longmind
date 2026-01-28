import React from 'react';

export default function ControlPanel({ mode, setMode, provider, setProvider, memory, refreshMemory }) {
    return (
        <div className="control-panel">

            <div className="app-context">
                <h3>Project: LongMind</h3>
                <p>This demo visualizes how <b>Memory</b> and <b>Context</b> change an AI's behavior. Kael is a guard captain who remembers betrayal.</p>
            </div>

            <div className="section">
                <h3>1. Inference Strategy</h3>
                <div className="radio-group">
                    <label className={mode === 'context_only' ? 'selected' : ''}>
                        <input
                            type="radio"
                            name="mode"
                            value="context_only"
                            checked={mode === 'context_only'}
                            onChange={(e) => setMode(e.target.value)}
                        />
                        <div>
                            <strong>Context Only</strong>
                            <div style={{ fontSize: '0.8em', opacity: 0.7 }}>Amnesia. Reacts only to now.</div>
                        </div>
                    </label>
                    <label className={mode === 'memory_only' ? 'selected' : ''}>
                        <input
                            type="radio"
                            name="mode"
                            value="memory_only"
                            checked={mode === 'memory_only'}
                            onChange={(e) => setMode(e.target.value)}
                        />
                        <div>
                            <strong>Memory Only</strong>
                            <div style={{ fontSize: '0.8em', opacity: 0.7 }}>Rigid past. Ignores current chat.</div>
                        </div>
                    </label>
                    <label className={mode === 'memory_context' ? 'selected' : ''}>
                        <input
                            type="radio"
                            name="mode"
                            value="memory_context"
                            checked={mode === 'memory_context'}
                            onChange={(e) => setMode(e.target.value)}
                        />
                        <div>
                            <strong>Memory + Context</strong>
                            <div style={{ fontSize: '0.8em', opacity: 0.7 }}>Realistic. Integrates both.</div>
                        </div>
                    </label>
                </div>
            </div>

            <div className="section">
                <h3>2. Intelligence Provider</h3>
                <select value={provider} onChange={(e) => setProvider(e.target.value)}>
                    <option value="ollama">Ollama (Local - Llama 3.2)</option>
                    <option value="aisa">AIsa.one (Cloud)</option>
                </select>
            </div>

            <div className="section memory-view">
                <div className="header">
                    <h3>3. Neural State (Memory)</h3>
                    <button onClick={refreshMemory} className="small-btn">Sync</button>
                </div>
                <pre>{JSON.stringify(memory, null, 2)}</pre>
            </div>

            <div className="section instructions">
                <h3>Experiment Guide</h3>
                <p>1. <b>Betray</b> Kael to implant a negative memory.</p>
                <p>2. Switch to <b>Context Only</b> &rarr; He greets you kindly (forgot betrayal).</p>
                <p>3. Switch to <b>Memory Only</b> &rarr; He rants about betrayal (ignores greeting).</p>
                <p>4. Switch to <b>Memory + Context</b> &rarr; He acknowledges you but is hostile.</p>
            </div>
        </div>
    );
}
