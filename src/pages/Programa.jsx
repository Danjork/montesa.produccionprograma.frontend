import React, { useEffect, useState } from 'react';
import api from '../services/api';
import FiltroMaquina from '../components/FiltroMaquina';

export default function Programa() {
  const [catalogo, setCatalogo] = useState([]);
  const [data, setData] = useState([]);
  const [selectedProceso, setSelectedProceso] = useState('Todos');
  const [selectedMachine, setSelectedMachine] = useState('Todas');
  const [query, setQuery] = useState('');

  // Catálogo: procesos y máquinas
  useEffect(() => {
    api.get('/Prod_Programa/maquinas').then(res => setCatalogo(res.data));
  }, []);

  // OPs / producción
  useEffect(() => {
    api.get('/Prod_Programa', { params: { top: 200 } }).then(res => setData(res.data));
  }, []);

  // Procesos únicos
const procesos = Array.from(new Set(catalogo.map(m => m.proceso).filter(Boolean))).sort();



  // Máquinas depende del proceso elegido
const maquinasFiltradas = catalogo.filter(m =>
  selectedProceso === 'Todos' || m.proceso === selectedProceso
);

const maquinas = Array.from(new Set(maquinasFiltradas.map(m => m.nombre).filter(Boolean))).sort();


  // Filtra la tabla principal
  const filteredData = data.filter(item =>
    (query === '' ||
      item.cliente?.toLowerCase().includes(query.toLowerCase()) ||
      item.op?.toString().includes(query) ||
      item.codigo?.toLowerCase().includes(query.toLowerCase())) &&
     (selectedProceso === 'Todos' ||
    (catalogo.find(m => m.nombre === item.maquina)?.proceso === selectedProceso)) &&
  (selectedMachine === 'Todas' || item.maquina === selectedMachine)
  );



console.log("selectedMachine:", selectedMachine);
console.log("primeros 3 items.maquina:", data.slice(0, 3).map(d => d.maquina));
console.log("filteredData.length:", filteredData.length);


function getVencimientoCell(item) {
    if (!item.vencimiento) return "";
    const fechaVenc = new Date(item.vencimiento.split('/').reverse().join('-')); // asume DD/MM/YYYY
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    fechaVenc.setHours(0, 0, 0, 0);
    const dias = Math.floor((now - fechaVenc) / 86400000);
    if (dias > 0) {
      return (
        <span>
          <span className="badge bg-light text-danger border border-danger me-2">{item.vencimiento}</span>
          <span className="text-danger small">{dias} días atraso</span>
        </span>
      );
    }
    return (
      <>
        <span className="badge bg-light text-secondary border">{item.vencimiento}</span>
        <span className="text-muted small ms-2">{Math.abs(dias)} días</span>
      </>
    );
  }
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Producción • Maquinas</h1>
     <FiltroMaquina
  procesos={procesos}
  selectedProceso={selectedProceso}
  setSelectedProceso={setSelectedProceso}
  maquinas={maquinas}
  selectedMachine={selectedMachine}
  setSelectedMachine={setSelectedMachine}
  // ...
/>
{/* Tabla principal */}
      <div className="card p-3">

        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="fw-bold">Órdenes en Prioridad ({filteredData.length})</div>
           {/* <select className="form-select w-auto">
             <option>Ordenar por prioridad</option>
            </select>*/}
         </div>
        <div style={{ maxHeight: "400px", overflowY: "auto"  }} >
          <table className="table table-sm table-hover align-middle mb-0 sticky-header">
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
                    <td className="fw-semibold">{item.maquina}</td>
                    <td>{item.op}</td>
                    <td>{item.cliente}</td>
                    <td>{item.codigo}</td>
                    <td style={{ maxWidth: 180 }} className="text-truncate">{item.descripcion}</td>
                    <td className="text-end">{(+item.solicitado || 0).toLocaleString()}</td>
                    <td className="text-end">{(+item.programado || 0).toLocaleString()}</td>
                    <td className="text-end">{(+item.reportado || 0).toLocaleString()}</td>
                    <td className={`text-end fw-bold ${item.faltante > 0 ? 'text-warning' : item.faltante < 0 ? 'text-danger' : ''}`}>
                      {(+item.faltante || 0).toLocaleString()}
                    </td>
                    <td className="text-center fw-bold" style={{ whiteSpace: 'nowrap' }}>
                      {getVencimientoCell(item)}
                    </td>
                    <td className="text-center">
                      <span className={
                        "badge px-2 py-1 " +
                        (item.status === "P"
                          ? "bg-success"
                          : "bg-secondary")
                      }>
                        {item.status}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className={`
                       badge rounded-pill 
                        ${item.prioridad === 1 ? "bg-success" :
                          item.prioridad === 2 ? "bg-warning text-dark" : "bg-danger"} `}>
                        {item.prioridad}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Tu tabla/dashboard aquí 
      <TablaDashboard data={filteredData} />*/}
    </div>
  );
}
