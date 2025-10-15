// apps/web/components/debug/PersonaDebugger.tsx
"use client";

import { usePersona } from '@/components/context/PersonaProvider';

export function PersonaDebugger() {
  const { persona, personas, setPersona } = usePersona();

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999
    }}>
      <div>Persona: {persona?.name || 'Aucun'}</div>
      <div>Total: {personas.length} personas</div>
      <button
        onClick={() => setPersona(personas[1]?.id || personas[0]?.id)}
        style={{ marginTop: '5px', padding: '2px 8px', fontSize: '10px' }}
      >
        Changer
      </button>
    </div>
  );
}
