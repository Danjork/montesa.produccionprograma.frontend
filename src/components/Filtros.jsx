import { useState } from 'react';

export default function Filters({ onSearch }) {
  const [tipo, setTipo] = useState('OP');
  const [numero, setNumero] = useState('');
  const [cliente, setCliente] = useState('');
  const [maquina, setMaquina] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    // Formatear el número con ceros a la izquierda (8 dígitos)
    const numeroFormateado = numero.padStart(8, '0');
    
    // Llamar a la función de búsqueda pasada desde el componente padre
    if (onSearch) {
      onSearch({
        tipo,
        ordNo: numeroFormateado,
        cliente,
        maquina
      });
    }
  };

  return (
    <div className="card mb-4 p-4">
      <form onSubmit={handleSearch}>
        <div className="row g-3">
          {/* Tipo: OP o NV */}
          <div className="col-md-2">
            <label className="form-label">Tipo</label>
            <div className="d-flex gap-2">
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="tipo" 
                  id="op" 
                  value="OP" 
                  checked={tipo === 'OP'}
                  onChange={(e) => setTipo(e.target.value)}
                />
                <label className="form-check-label" htmlFor="op">OP</label>
              </div>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="tipo" 
                  id="nv" 
                  value="NV"
                  checked={tipo === 'NV'}
                  onChange={(e) => setTipo(e.target.value)}
                />
                <label className="form-check-label" htmlFor="nv">NV</label>
              </div>
            </div>
          </div>

          {/* Número */}
          <div className="col-md-2">
            <label className="form-label">Número</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Número" 
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>

      
     

          {/* Botón Buscar */}
          <div className="col-md-2 d-flex align-items-end">
            <button type="submit" className="btn btn-primary w-100">
              Buscar OP/NV
            </button>
          </div>

           {/* Botón Buscar */}
          <div className="col-md-2 d-flex align-items-end">
            <button type="submit" className="btn btn-success w-100">
              Planificar
            </button>
          </div>


        </div>

        {/* Segunda fila de filtros */}
        <div className="row g-3 mt-3">
          <div className="col-md-2">
          
          </div>

     
          {/* Botón Buscar 
          <div className="col-md-7 d-flex gap-2 align-items-end">
            <span className="badge bg-success">Solicitado</span>
            <span className="badge bg-warning text-dark">Medido</span>
            <span className="badge bg-danger">Altal</span>
          </div>
          */}
        </div>
      </form>
    </div>
  );
}
