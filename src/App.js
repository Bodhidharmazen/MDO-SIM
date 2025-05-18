import React from 'react';
import IsometricWorld from './IsometricWorld';

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw', background: '#e3e6f0' }}>
      <header style={{ padding: '1em', background: 'linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%)', color: 'white' }}>
        <h1>MDO Artificial Cognition Simulation (3D-Look)</h1>
        <p style={{ fontSize: '0.9em', opacity: 0.8 }}>
          50x50 world | Model Dependent Ontology | Four Pillars Framework
        </p>
      </header>
      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '2em 0' }}>
        <IsometricWorld />
      </main>
    </div>
  );
}

export default App;
