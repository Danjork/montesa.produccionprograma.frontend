// FiltroMaquina.jsx
import React from 'react';

export default function FiltroMaquina({
  procesos, selectedProceso, setSelectedProceso,
  maquinas, selectedMachine, setSelectedMachine,
  query, setQuery
}) {
  return (

    <div className="card mb-4 p-4">
    <div className="row g-3 align-items-end mb-4">
        
      <div className="col-md-4">
        <select
          className="form-select"
          value={selectedProceso}
          onChange={e => setSelectedProceso(e.target.value)}
        >
          <option value="Todos">Todos los procesos</option>
          {procesos.map((p, i) => (
            <option key={i} value={p}>{p}</option>
          ))}
        </select>
      </div>
      <div className="col-md-4">
        <select
          className="form-select"
          value={selectedMachine}
          onChange={e => setSelectedMachine(e.target.value)}
        >
          <option value="Todas">Todas las máquinas</option>
          {maquinas.map((m, i) => (
            <option key={i} value={m}>{m}</option>
          ))}
        </select>

      </div>
       
    </div>
    </div>
  );
}
