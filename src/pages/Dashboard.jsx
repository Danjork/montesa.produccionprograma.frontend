// Filtros, KPIs y Tabla en Dashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import SelectMaquina from '../components/SelectMaquina';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [kpi, setKpi] = useState({ solicitado: 0, programado: 0, reportado: 0, faltante: 0 });
  const [query, setQuery] = useState('');
  const [selectedMachine, setSelectedMachine] = useState('Todas');
  const [onlyLate, setOnlyLate] = useState(false);
  const [maquinas, setMaquinas] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // Puedes llenar los KPIs y el filtro desde tu API sin problema
  const fetchData = async () => {
    const response = await api.get('/Prod_Programa', { params: { top: 200 } });
    setData(response.data);

    const maquinasUnicas = Array.from(new Set(response.data.map(item => item.maquina).filter(Boolean))).sort();
    setMaquinas(maquinasUnicas);

    // Calcula los KPIs usando los datos (debes ajustar nombres según tu API)
    let solicitado = 0, programado = 0, reportado = 0, faltante = 0;
    response.data.forEach(item => {
      solicitado += +item.solicitado || 0;
      programado += +item.programado || 0;
      reportado += +item.reportado || 0;
      faltante += +item.faltante || 0;
    });
    setKpi({ solicitado, programado, reportado, faltante });
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const filteredData = data.filter(item =>
    (query === '' || item.cliente?.toLowerCase().includes(query.toLowerCase()) ||
      item.op?.toString().includes(query) ||
      item.codigo?.toLowerCase().includes(query.toLowerCase())) &&
    (selectedMachine === 'Todas' || item.maquina === selectedMachine) &&
    (!onlyLate || (item.faltante > 0 && item.vencimiento && new Date(item.vencimiento) < new Date()))
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Programa de Producción • Dashboard</h1>
      <p className="text-muted mb-4">Vista rápida de OPs por máquina, vencimientos y estado.</p>

      {/* Filtros principales */}
      <div className="row g-3 align-items-end mb-4">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Buscar por Cliente / OP / Código..."
            value={query}
            onChange={handleSearch}
          />
        </div>
        {/*   <div className="col-md-4">
          <select className="form-select" value={selectedMachine} onChange={e => setSelectedMachine(e.target.value)}>
            <option>Todas las máquinas</option>
            <option>Extrusora 1</option>
            <option>Extrusora 12</option>
            <option>Extrusora 11</option>
          </select>
        </div>*/}


        <div className="col-md-4">
          <SelectMaquina
            maquinas={maquinas}
            selected={selectedMachine}
            onChange={e => setSelectedMachine(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <input
            type="checkbox"
            checked={onlyLate}
            onChange={e => setOnlyLate(e.target.checked)}
            className="form-check-input me-2"
            id="onlyLate"
          />
          <label className="form-check-label" htmlFor="onlyLate">Solo vencidas</label>
        </div>
        <div className="col-auto">
          <button className="btn btn-outline-secondary me-2" onClick={() => { setQuery(''); setSelectedMachine('Todas'); setOnlyLate(false); }}>Limpiar</button>
          <button className="btn btn-outline-primary" onClick={fetchData}>Actualizar</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="text-muted mb-1">Solicitado</div>
              <div style={{ fontSize: "2rem" }}>{kpi.solicitado.toLocaleString()}</div>
              <small className="text-muted">suma de OPs filtradas</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="text-muted mb-1">Programado</div>
              <div style={{ fontSize: "2rem" }}>{kpi.programado.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="text-muted mb-1">Reportado</div>
              <div style={{ fontSize: "2rem" }}>{kpi.reportado.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <div className="text-muted mb-1">Faltante</div>
              <div style={{ fontSize: "2rem", color: "#c77d00" }}>{kpi.faltante.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla principal */}
      <div className="card p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="fw-bold">Órdenes ({filteredData.length})</div>
          <select className="form-select w-auto">
            <option>Ordenar por prioridad</option>
          </select>
        </div>
        <div className="table-responsive">
          <table className="table table-sm table-hover align-middle">
            <thead>
              <tr>
                <th>Máquina</th>
                <th>OP</th>
                <th>Cliente</th>
                <th>Código</th>
                <th>Descripción</th>
                <th>Solicitado</th>
                <th>Programado</th>
                <th>Reportado</th>
                <th>Faltante</th>
                <th>Vencimiento</th>
                <th>Status</th>
                <th>Prioridad</th>
              </tr>
            </thead>
            <tbody>
              {filteredData
              //.filter(item => item.Status === "P") // <-- Solo muestra las que tengan status P
              .map((item, idx) => (
                <tr key={idx}>
                  <td className="fw-bold">{item.maquina}</td>
                  <td>{item.op}</td>
                  <td>{item.cliente}</td>
                  <td>{item.codigo}</td>
                  <td>{item.descripcion}</td>
                  <td>{item.solicitado?.toLocaleString()}</td>
                  <td>{item.programado?.toLocaleString()}</td>
                  <td>{item.reportado?.toLocaleString()}</td>
                  <td
                    style={{
                      color: item.faltante > 0 ? '#c77d00' : item.faltante < 0 ? '#e34' : '#222',
                      fontWeight: item.faltante !== 0 ? "bold" : "normal"
                    }}>
                    {item.faltante?.toLocaleString()}
                  </td>
                  <td>
                    {item.vencimiento}
                    {item.diasAtraso &&
                      <span className="text-danger ms-2">{item.diasAtraso} días atraso</span>
                    }
                  </td>
                  <td>
                    <span className={`badge ${item.status === 'En Proceso' ? 'bg-warning text-dark' : item.status === 'No Programado' ? 'bg-secondary' : 'bg-success'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${item.prioridad === 1 ? 'bg-success' : item.prioridad === 2 ? 'bg-warning text-dark' : 'bg-danger'}`}>
                      {item.prioridad}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
