import React, { useEffect, useState } from 'react';
import api from '../services/api';
import FiltroMaquina from '../components/FiltroMaquina';

import maquinasTest from '../../public/data/maquinasTest.json';


// para probar, carga el mock al state de entrada (sin llamar API)


//import TablaDashboard from '../components/TablaDashboard'; // si usas tabla como componente

export default function Maquinas() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedMachine, setSelectedMachine] = useState('Todas');
  const [onlyLate, setOnlyLate] = useState(false);
  const [maquinas, setMaquinas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('Todas');
 
  useEffect(() => {
  fetch('/data/maquinasTest.json')
    .then(res => res.json())
    .then(data => setData(data));
}, []);



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.get('/Prod_Programa', { params: { top: 200 } });
    setData(response.data);
    const maquinasUnicas = Array.from(new Set(response.data.map(item => item.maquina).filter(Boolean))).sort();
    setMaquinas(maquinasUnicas);


  };

  const onClear = () => { setQuery(''); setSelectedMachine('Todas'); setOnlyLate(false); };
const areasUnicas = Array.from(new Set(data.map(item => item.Area).filter(Boolean))).sort();

  // Filtro de datos igual que en dashboard
  const filteredData = data.filter(item =>
    (query === '' || item.cliente?.toLowerCase().includes(query.toLowerCase()) ||
     item.op?.toString().includes(query) ||
     item.codigo?.toLowerCase().includes(query.toLowerCase())) &&
    (selectedMachine === 'Todas' || item.maquina === selectedMachine) &&
    (selectedArea === 'Todas' || item.Area === selectedArea) &&
    (!onlyLate || (item.faltante > 0 && item.vencimiento && new Date(item.vencimiento) < new Date()))
  );

 


  return (
    <div style={{ padding: '2rem' }}>
      <h1>Maquinas</h1>
       <FiltroMaquina
  query={query}
  onQueryChange={setQuery}
  selectedMachine={selectedMachine}
  maquinas={maquinas}
  onSelectMachine={setSelectedMachine}
  onlyLate={onlyLate}
  onOnlyLateChange={setOnlyLate}
  onClear={onClear}
  onRefresh={() => setData(maquinasTest)}
  // ¡ESTE PÁRRAFO ES CLAVE!
  selectedArea={selectedArea}
  setSelectedArea={setSelectedArea}
  areasUnicas={areasUnicas}
/>
      {/* Reutiliza DataTable o tu tabla según el caso 
      <TablaDashboard data={filteredData} />*/}
    </div>
  );
}
