// src/components/SelectMaquina.jsx
export default function SelectMaquina({ maquinas, selected, onChange }) {
  return (
    <select className="form-select" value={selected} onChange={onChange}>
      <option value="">Todas las máquinas</option>
      {maquinas.map(m => (
        <option value={m} key={m}>{m}</option>
      ))}
    </select>
  );
}
