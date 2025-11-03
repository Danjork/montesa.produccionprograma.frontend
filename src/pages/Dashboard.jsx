import { useEffect, useState } from 'react';
import api from '../services/api';
import Filters from '../components/Filtros';
import DataTable from '../components/DataTable';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Carga inicial de datos (opcional)
    //fetchData();
  }, []);

  {/* Aqui se llama a la consulta directo
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/Prod_Programa', { params: { top: 100 } });
      setData(response.data);
    } catch (error) {
      console.error('Error al cargar datos', error);
    } finally {
      setLoading(false);
    }
  };
  */}

  // Función de búsqueda que será llamada desde Filters
  const handleSearch = async (searchParams) => {
    try {
      setLoading(true);
      
      // Llamada POST al endpoint de búsqueda
      const response = await api.post('/Prod_Programa/buscar-sp', {
        ordNo: searchParams.ordNo
      });
      
      setData(response.data);
      console.log('Búsqueda exitosa:', response.data);
    } catch (error) {
      console.error('Error al buscar:', error);
      alert('Error al buscar la orden. Verifique el número e intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="p-4" style={{ width: '100%' }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Consulta y Carga de Órdenes a Programa Producción</h1>
     
      </div>

      {/* Filtros - Pasar función handleSearch */}
      <Filters onSearch={handleSearch} />

      {/* Loading indicator */}
      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      {/* Tabla - AQUI SE LLAMA AL COMPONENTE DATATABLE*/}
      {!loading && <DataTable data={data} />}

      {/* Paginación y botones inferiores */}
      <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
        <span>Mostrando {data.length} resultados</span>
        
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary">Previous</button>
          <span className="mx-2">1 de 4</span>
          <button className="btn btn-outline-secondary">Next</button>
        </div>
      
       
      </div>
    </div>
  );
}
