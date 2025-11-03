import { useState } from 'react';

export default function FiltroMaquina({ onSearch }) {
  const [tipo, setTipo] = useState('OP');
  const [numero, setNumero] = useState('');
  const [cliente, setCliente] = useState('');
  const [maquina, setMaquina] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    // Formatear el número con ceros a la izquierda (8 dígitos)
    const numeroFormateado = numero.padStart(8, '0');
      console.log({ tipo, numero, numeroFormateado, cliente, maquina });
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
      <label>Componente FILTRO Maquina</label>
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
                  id="ex" 
                  value="EX" 
                  checked={tipo === 'EX'}
                  onChange={(e) => setTipo(e.target.value)}
                />
                <label className="form-check-label" htmlFor="op">Extrusión</label>
              </div>

              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="tipo" 
                  id="im" 
                  value="IM"
                  checked={tipo === 'IM'}
                  onChange={(e) => setTipo(e.target.value)}
                />
                <label className="form-check-label" htmlFor="nv">Impresión</label>
              </div>

              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="tipo" 
                  id="co" 
                  value="CO"
                  checked={tipo === 'CO'}
                  onChange={(e) => setTipo(e.target.value)}
                />
                <label className="form-check-label" htmlFor="nv">Corte</label>
              </div>

                 <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="tipo" 
                  id="se" 
                  value="SE"
                  checked={tipo === 'SE'}
                  onChange={(e) => setTipo(e.target.value)}
                />
                <label className="form-check-label" htmlFor="nv">Sellado</label>
              </div>

                  <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="tipo" 
                  id="la" 
                  value="LA"
                  checked={tipo === 'LA'}
                  onChange={(e) => setTipo(e.target.value)}
                />
                <label className="form-check-label" htmlFor="nv">Laminado</label>
              </div>

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




        {/* Segunda fila de filtros */}

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


        <div className="row g-3 mt-3">
          <div className="col-md-2">
          
          </div>

     
          {/* Botón Buscar */}
          <div className="col-md-7 d-flex gap-2 align-items-end">
            <span className="badge bg-success">Solicitado</span>
            
            <span className="badge bg-danger">Altal</span>
          </div>
          
        </div>
      </form>
    </div>
  );
}
