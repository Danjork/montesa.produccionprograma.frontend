import React from 'react';

export default function FiltroMaquina({
  query,
  onQueryChange,
  selectedMachine,
  maquinas,
  onSelectMachine,
  onlyLate,
  onOnlyLateChange,
  onClear,
  onRefresh,
  selectedArea,
  setSelectedArea,
  areasUnicas
}) 


{
  return (
    <div className="row g-3 align-items-end mb-4">
      <div className="col-md-4">
       <select
  value={selectedArea}
  onChange={e => setSelectedArea(e.target.value)}
>
  <option value="Todas">Todas las áreas</option>
  {areasUnicas.map((a, i) => (
    <option key={i} value={a}>{a}</option>
  ))}
</select>
      </div>

      <div className="col-md-4">
        <select
          className="form-select"
          value={selectedMachine}
          onChange={e => onSelectMachine(e.target.value)}
        >
          <option value="Todas">Todas las máquinas</option>
          {maquinas.map((m, i) => (
            <option value={m} key={i}>{m}</option>
          ))}
        </select>
      </div>
      <div className="col-auto">
        <input
          type="checkbox"
          checked={onlyLate}
          onChange={e => onOnlyLateChange(e.target.checked)}
          className="form-check-input me-2"
          id="onlyLate"
        />
        <label className="form-check-label" htmlFor="onlyLate">Solo vencidas</label>
      </div>
      <div className="col-auto">
        <button className="btn btn-outline-secondary me-2" onClick={onClear}>Limpiar</button>
        <button className="btn btn-outline-primary" onClick={onRefresh}>Actualizar</button>
      </div>
    </div>
  );
}
